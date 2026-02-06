(function() {
  const UPLOAD_PDF_ROUTE = '/api/upload-pdf';

  function makeTarget(tabId, frameId) {
    if (tabId == null) return null;
    if (frameId !== undefined && frameId !== null) {
      return { tabId: tabId, frameIds: [frameId] };
    }
    return { tabId: tabId, allFrames: true };
  }

  function deliverStepToTab(tabId, frameId, step, status) {
    var target = makeTarget(tabId, frameId);
    if (!target || typeof chrome.scripting === 'undefined') return;
    chrome.scripting.executeScript({
      target: target,
      world: 'MAIN',
      func: function(stepVal, statusVal) {
        if (typeof window.handlePdfStepUpdate === 'function') window.handlePdfStepUpdate(stepVal, statusVal);
      },
      args: [step, status]
    }, function() {});
  }

  function deliverResultToTab(tabId, frameId, data, error) {
    var target = makeTarget(tabId, frameId);
    if (!target) {
      if (chrome.offscreen && chrome.offscreen.closeDocument) chrome.offscreen.closeDocument().catch(function() {});
      return;
    }
    if (typeof chrome.scripting === 'undefined') {
      if (chrome.offscreen && chrome.offscreen.closeDocument) chrome.offscreen.closeDocument().catch(function() {});
      return;
    }
    chrome.scripting.executeScript({
      target: target,
      world: 'MAIN',
      func: function(resultData, err) {
        if (err) {
          if (typeof window.handlePdfFailed === 'function') window.handlePdfFailed(err);
        } else {
          if (typeof window.handleParsedPdfResult === 'function') window.handleParsedPdfResult(resultData);
        }
      },
      args: [data, error || null]
    }, function() {
      if (chrome.offscreen && chrome.offscreen.closeDocument) chrome.offscreen.closeDocument().catch(function() {});
    });
  }

  chrome.runtime.onMessage.addListener(function(msg, _sender, _sendResponse) {
    if (msg.type !== 'DO_PDF_FETCH' || !msg.apiBase || !msg.payload) return;
    var tabId = msg.tabId;
    var frameId = msg.frameId;
    var payload = msg.payload;
    var apiBase = msg.apiBase.replace(/\/$/, '');
    var url = apiBase + UPLOAD_PDF_ROUTE;
    var body = {
      fileName: payload.fileName,
      fileData: payload.fileData,
      useAI: !!payload.useAI,
      address: payload.address || '',
      registrationNumber: payload.registrationNumber || ''
    };
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function(response) {
      if (!response.ok) {
        return response.text().then(function(text) {
          var result;
          try { result = text ? JSON.parse(text) : {}; } catch (e) { result = {}; }
          var errMsg = result.message || result.error || ('HTTP ' + response.status);
          chrome.runtime.sendMessage({ type: 'UPLOAD_COMPLETE', data: null, error: errMsg });
          deliverResultToTab(tabId, frameId, null, errMsg);
        });
      }
      var respBody = response.body;
      if (!respBody) {
        return response.text().then(function(text) {
          var result;
          try { result = text ? JSON.parse(text) : {}; } catch (e) { result = {}; }
          var data = result.data !== undefined ? result.data : result;
          var err = result.error || null;
          chrome.runtime.sendMessage({ type: 'UPLOAD_COMPLETE', data: data, error: err });
          deliverResultToTab(tabId, frameId, data, err);
        });
      }
      var reader = respBody.getReader();
      var decoder = new TextDecoder();
      var buffer = '';
      function readNext() {
        return reader.read().then(function(_ref) {
          var done = _ref.done;
          var value = _ref.value;
          if (done) {
            if (buffer.trim()) {
              try {
                var obj = JSON.parse(buffer.trim());
                if (obj.keepalive !== true && (obj.done && obj.data !== undefined || obj.data !== undefined || obj.error !== undefined)) {
                  var data = obj.data !== undefined ? obj.data : null;
                  var err = obj.error || null;
                  chrome.runtime.sendMessage({ type: 'UPLOAD_COMPLETE', data: data, error: err });
                  deliverResultToTab(tabId, frameId, data, err);
                }
              } catch (e) {}
            }
            return reader.releaseLock();
          }
          buffer += decoder.decode(value, { stream: true });
          var lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line) continue;
            try {
              var o = JSON.parse(line);
              if (o.keepalive === true) continue;
              if (o.step !== undefined && o.status) {
                var step = Number(o.step);
                var status = o.status;
                chrome.runtime.sendMessage({ type: 'PDF_STEP_UPDATE', step: step, status: status });
                deliverStepToTab(tabId, frameId, step, status);
              } else if (o.done && o.data !== undefined) {
                var data = o.data;
                var err = o.error || null;
                chrome.runtime.sendMessage({ type: 'UPLOAD_COMPLETE', data: data, error: err });
                deliverResultToTab(tabId, frameId, data, err);
                return reader.releaseLock();
              } else if (o.data !== undefined || o.error !== undefined) {
                var data = o.data || null;
                var err = o.error || null;
                chrome.runtime.sendMessage({ type: 'UPLOAD_COMPLETE', data: data, error: err });
                deliverResultToTab(tabId, frameId, data, err);
                return reader.releaseLock();
              }
            } catch (e) {}
          }
          return readNext();
        });
      }
      return readNext();
    }).catch(function(err) {
      var errMsg = (err && err.message) ? err.message : String(err);
      chrome.runtime.sendMessage({ type: 'UPLOAD_COMPLETE', data: null, error: errMsg });
      deliverResultToTab(tabId, frameId, null, errMsg);
    });
  });
})();

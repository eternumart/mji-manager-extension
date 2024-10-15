export const splitBySentences = (text: any) => {
    if (text === "") {
        return [""];
    }
    const regex = /[.!?]\s+/g;
    const sentences = text.trimStart().split(regex);
    const clearedSentences = [];
    for (let i = 0; i < sentences.length; i++) {
        clearedSentences.push(sentences[i].replace(".", ""));
    }
    return clearedSentences;
}
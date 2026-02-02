export const apiConfig = {
	address: {
		protocol: "http://",
		/** Основной сервер: API по IP без домена */
		ip: "200.0.0.100:2010",
		devHost: "localhost",
		devPort: 3000,
		prodPort: 2010,
	},
	routes: {
		pages: {
			home: "/",
			registration: "registration",
			login: "login",
			profile: "profile",
            defectEditor: "defect-editor",
		},
		api: {
			registration: "/auth/registration",
			login: "/auth/login",
			activation: "/auth/activation",
            getApp: "/api/get-app", 
			userData: "/api/userdata",
			allUsersData: "/api/allusersdata",
            saveDefects: "/api/save-defects",
            saveFio: "/api/savefio",
            activeFunctions: "/api/change-functions",
            changeUserPermissions: "/api/change-permissions",
            changeAccount: "/api/change-account",
            deactivateAccount: "/api/deactivate-account",
            getAppData: "/api/get-app-data",
			checkResponseFromServer: "/api/check-response-from-server",
			getScripts: "/api/get-scripts",
			uploadPDF: "/api/upload-pdf",
			rephraseDefectsBlock: "/api/rephrase-defects-block",
		},
	},
};

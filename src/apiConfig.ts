export const apiConfig = {
	address: {
		protocol: "http://",
		ip: "mjimanager.ru",
		devPort: 3000, 
		prodPort: 80,
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
			registration: "auth/registration",
			login: "auth/login",
			activation: "auth/activation",
            getApp: "api/get-app", 
			userData: "api/userdata",
			allUsersData: "api/allusersdata",
            saveDefects: "api/save-defects",
            saveFio: "api/savefio",
            activeFunctions: "api/change-functions",
            changeUserPermissions: "api/change-permissions",
            changeAccount: "api/change-account",
            deactivateAccount: "api/deactivate-account",
            getAppData: "api/get-app-data",
			checResponseFromServer: "api/check-response-from-server",
			getScripts: "api/get-scripts"
		},
	},
};

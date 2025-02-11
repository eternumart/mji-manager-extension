import React, { createContext, useContext, useState } from "react";

type UserData = {
	fio: string;
	login: string;
} | null;

interface ContextType {
	isLogged: boolean;
	setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
	serverState: string;
	setServerState: React.Dispatch<React.SetStateAction<string>>;
	errorText: string;
	setErrors: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [userData, setUserData] = useState<UserData>({ fio: "", login: "" });
	const [serverState, setServerState] = useState<string>("prod"); // По умолчанию прод
	const [errorText, setErrors] = useState<string>("");

	return <Context.Provider value={{ isLogged, setIsLogged, userData, setUserData, serverState, setServerState, errorText, setErrors}}>{children}</Context.Provider>;
};

export const useAppContext = (): ContextType => {
	const context = useContext(Context);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

import React, { createContext, useContext, useState } from "react";

interface UserData {
  fio: string;
  login: string;
}

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  serverState: string;
  setServerState: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({ fio: "", login: "" });
  const [serverState, setServerState] = useState<string>("prod"); // По умолчанию прод

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, userData, setUserData, serverState, setServerState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, { createContext, ReactElement } from "react";
import useAuth from "../hooks/useAuth";
import type { AuthContextType } from "../types/context";

type Props = {
    children: ReactElement
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: Props) => {
    const {userDetails, setUserDetails, login, logout, signup} = useAuth();
    return (
        <AuthContext.Provider value={{userDetails,setUserDetails, login, logout, signup}}>
            {children}
        </AuthContext.Provider>
    )
};
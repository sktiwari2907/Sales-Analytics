import { createContext, ReactElement, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAclByRole } from "../utils/Utils";
import { AuthContext } from "./AuthContext";
import type { GlobalContextType, ACLType } from "../types/context";

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalStateProvider = ({children}: {children: React.ReactNode}) => {
    const {userDetails} = useContext(AuthContext);
    const {data: acl, isLoading: aclLoading} = useQuery({
        queryKey: ["acl"],
        queryFn: getAclByRole,
        enabled: !!userDetails
    });

    const getACLByScreen = (screenName: string): ACLType | undefined => {
        try {
            return acl?.find((d: ACLType) => d.screen === screenName);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GlobalContext.Provider value={{acl, aclLoading, getACLByScreen}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalStateProvider;
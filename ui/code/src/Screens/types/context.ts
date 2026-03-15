import { UserDetails } from "./auth";

export type AuthContextType = {
    userDetails: UserDetails | null,
    setUserDetails: React.Dispatch<React.SetStateAction<any>>,
    login: (username: string, password: string) => Promise<any>,
    logout: () => Promise<any>,
    signup: (username: string, password: string,role_id: string) => Promise<any>
}

type Config = {
    visible: boolean
    readOnly: boolean
}

export type ACLType = {
    role_id: string,
    screen: string,
    config: Config | Record<string, Config>
}

export type GlobalContextType = {
    acl: ACLType[],
    aclLoading: boolean,
    getACLByScreen: (screenName: string) => ACLType | undefined
}
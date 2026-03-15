import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import type { UserDetails } from '../types/auth.ts';

function useAuth() {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const getLoggedInInfo = async() : Promise<void> => {

        const response = await api.get("/api/auth/getLoggedInInfo");

        const result = response.data;

        if (result?.status !== "success") {
            throw new Error(result?.error || "Unknown server error");
        }

        setUserDetails(result.user);
    };

    const login = async(username: string, password: string): Promise<any> => {
        const response = await api.post("/api/auth/login", { username, password });

        const result = response.data;

        return result;
    };

    const logout = async(): Promise<any> => {
        const response = await api.post("/api/auth/logout");

        const result = response.data;

        return result;
    };

    const signup = async(username: string, password: string, role_id: string): Promise<any> => {
        try {
            const response = await api.post("/api/auth/signup", {
                username,
                password,
                role_id
            });

            const result = response.data;

            if (result.status != "success") throw Error(result.error);

            return result;
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getLoggedInInfo();
    }, []);
    return {
        userDetails,
        setUserDetails,
        login,
        logout,
        signup
    }
}

export default useAuth;
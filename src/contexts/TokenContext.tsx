import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import fetchData from "../utils/AxioGet";
import postData from "../utils/AxioPost";
import {useAuthentication} from "./AuthContext.tsx";

interface TokenContextType {
    token: string;
    bearer_token: string;
    setToken: (token: string) => void;
    setBearerToken: (bearer_token: string) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>("");
    const [bearer_token, setBearerToken] = useState<string>("");
    const { setAuthenticated } = useAuthentication();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetchData(`${window.location.protocol}//api.kanban.beytech.co.tz/api/data`);
                const data = response.response;

                if (typeof data === "object" && data !== null && "csrf_token" in data) {
                    setToken((data as { csrf_token: string }).csrf_token);
                }
            } catch (error) {
                console.error("Failed to fetch token from /data:", error);
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await postData(`${window.location.protocol}//api.kanban.beytech.co.tz/api/token/refresh`, {}, '');
                const data = response.response;

                if (typeof data === "object" && data !== null && "access_token" in data) {
                    setBearerToken((data as { access_token: string }).access_token);
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error("Failed to fetch token from /api/token/refresh:", error);
            }
        };

        fetchToken();
    }, [token]);

    return (
        <TokenContext.Provider value={{ token, setToken, bearer_token, setBearerToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = (): TokenContextType => {
    const context = useContext(TokenContext);
    if (context === undefined) {
        throw new Error("useToken must be used within a TokenProvider");
    }
    return context;
};

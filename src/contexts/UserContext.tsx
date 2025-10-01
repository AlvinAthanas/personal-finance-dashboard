import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import fetchData from "../utils/AxioGet.ts";
import type {User} from "../utils/Types.ts";
import {useToken} from "./TokenContext.tsx";


interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
                                                                    children,
                                                                }) => {
    const [user, setUser] = useState<User | null>(null);
    const { bearer_token, setToken, setBearerToken: setBearerToken } = useToken();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetchData(
                    `${window.location.protocol}//http://127.0.0.1:8000//api/user-data`,
                    bearer_token,
                    undefined,
                    setToken,
                    setBearerToken
                );

                const data = response.response;
                if (
                    typeof data === "object" &&
                    data !== null &&
                    "body" in data &&
                    typeof (data).body === "object" &&
                    (data).body !== null &&
                    "username" in (data).body &&
                    "email" in (data).body
                ) {
                    const body = (data).body;

                    setUser({
                        username: body.username,
                        email: body.email,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user from /api/token/refresh:", error);
            }
        };

        if (bearer_token) {
            fetchUser();
        }
    }, [bearer_token]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

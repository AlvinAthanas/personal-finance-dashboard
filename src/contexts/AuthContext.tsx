import React, { createContext, useContext, useState, type ReactNode } from "react";

interface AuthenticationContextType {
    isAuthenticated: boolean;
    setAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthenticationContext = createContext<
    AuthenticationContextType | undefined
>(undefined);

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({
                                                                              children,
                                                                          }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticated, setAuthenticated }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthentication = (): AuthenticationContextType => {
    const context = useContext(AuthenticationContext);
    if (context === undefined) {
        throw new Error(
            "useAuthentication must be used within an AuthenticationProvider"
        );
    }
    return context;
};

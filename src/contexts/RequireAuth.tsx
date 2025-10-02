import {Navigate, useLocation} from "react-router-dom";
import {type JSX} from "react";
import {useAuthentication} from "./AuthContext.tsx";

export interface AuthWrapperProps {
    children: JSX.Element;
    requireAuth?: boolean;
    redirectTo?: string;
}

export const AuthWrapper = ({ children, requireAuth, redirectTo = "/signin" }: AuthWrapperProps) => {
    const { isAuthenticated } = useAuthentication();
    const location = useLocation();



    if (requireAuth === true && !isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (requireAuth === false && isAuthenticated) {
        return <Navigate to="/" replace />;
    }


    return children;
};

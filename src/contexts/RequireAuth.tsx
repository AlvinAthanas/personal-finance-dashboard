import {Navigate, useLocation} from "react-router-dom";
import {type JSX, useEffect} from "react";
import { useSnackbar} from "./SnackbarAlertContext.tsx";
import {useAuthentication} from "./AuthContext.tsx";
import {useUser} from "./UserContext.tsx";

export interface AuthWrapperProps {
    children: JSX.Element;
    requireAuth?: boolean;
    redirectTo?: string;
}

export const AuthWrapper = ({ children, requireAuth, redirectTo = "/signin" }: AuthWrapperProps) => {
    const { isAuthenticated } = useAuthentication();
    const { user } = useUser();
    const { showSnackbar } = useSnackbar();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated && user) {
            showSnackbar("Access denied! Redirected to dashboard.", "error");
        }
    }, [isAuthenticated,user, showSnackbar]);

    if (requireAuth === true && !isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (requireAuth === false && isAuthenticated) {
        return <Navigate to="/" replace />;
    }


    return children;
};

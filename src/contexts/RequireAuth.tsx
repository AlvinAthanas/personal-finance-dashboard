import {Navigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useSnackbar} from "../Reusables/SnackbarAlert.tsx";
import {useAuthentication} from "./AuthContext.tsx";

export const AuthWrapper = ({ children, requireAuth, isStaffView, redirectTo = "/signin" }: AuthWrapperProps) => {
    const { isAuthenticated } = useAuthentication();
    const { user } = useUser();
    const { showSnackbar } = useSnackbar();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated && isStaffView && user && !user.is_staff) {
            showSnackbar("Access denied! Redirected to dashboard.", "error");
        }
    }, [isAuthenticated, isStaffView, user, showSnackbar]);

    if (requireAuth === true && !isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    if (requireAuth === false && isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    if (isAuthenticated && isStaffView && user && !user.is_staff) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

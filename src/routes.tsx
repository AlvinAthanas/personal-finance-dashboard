import {lazy, Suspense} from "react";
import {createRoutesFromElements, Route} from "react-router-dom";
import {AppWrapper} from "./App.tsx";
import ProgressLoader from "./Reusables/ProgressLoader.tsx";
import {AuthWrapper} from "./contexts/RequireAuth.tsx";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));

export const routes = createRoutesFromElements(
    <Route path="/" element={<AppWrapper/>}>
        <Route
            path="/"
            index
            element={
                <AuthWrapper>
                    <Suspense fallback={<ProgressLoader/>}>
                        <Home/>
                    </Suspense>
                </AuthWrapper>
            }
        />
        <Route
            path="/signin"
            element={
                <AuthWrapper requireAuth={false}>
                    <Suspense fallback={<ProgressLoader/>}>
                        <Login/>
                    </Suspense>
                </AuthWrapper>
            }
        />
        <Route
            path="/signup"
            element={
                <AuthWrapper requireAuth={false}>
                    <Suspense fallback={<ProgressLoader/>}>
                        <Register/>
                    </Suspense>
                </AuthWrapper>
            }
        />
    </Route>
)
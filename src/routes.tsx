import { lazy, Suspense } from "react";
import { createRoutesFromElements, Route } from "react-router-dom";
import {AppWrapper} from "./App.tsx";

const Home = lazy(() => import("./pages/Home"));

export const routes = createRoutesFromElements(
    <Route path="/" element={<AppWrapper/>}>
        <Route
        path="/"
        index
        element={
            <Suspense fallback={null}>
                <Home/>
            </Suspense>
        }
        />
    </Route>
)
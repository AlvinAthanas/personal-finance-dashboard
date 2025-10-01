import './index.css'
import 'nprogress/nprogress.css';
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from "./routes.tsx";
import NProgress from 'nprogress';

// Configure NProgress
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
});

const router = createBrowserRouter(routes);

hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
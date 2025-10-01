import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import {
    createStaticHandler,
    createStaticRouter,
    StaticRouterProvider
} from "react-router-dom";

import { routes } from './routes.tsx'

export async function render(url: string) {
    const absoluteUrl = new URL(url, "http://localhost")

    const { query, dataRoutes } = createStaticHandler(routes)

    const context = await query(new Request(absoluteUrl.toString()))

    if (context instanceof Response) {
        throw context
    }

    const router = createStaticRouter(dataRoutes, context)

    const html = renderToString(
        <StrictMode>
            <StaticRouterProvider
                router={router}
                context={context}
            />
        </StrictMode>
    )

    return { html }
}
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { PreventFlashOnWrongTheme, Theme, ThemeProvider, useTheme } from 'remix-themes'
import { themeSessionResolver } from '~/utils/theme-session.server'
import { cn } from '~/utils/cn'
import { title } from '~/config.shared'
import stylesheet from '~/styles/globals.css?url'
import { GlobalLoading } from './components/global-loading'

export const meta: MetaFunction = () => [{ title: title() }]

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return { theme: getTheme() }
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App>
        <div className="relative flex size-full items-center justify-center bg-white bg-grid-medium-black/[0.2] dark:bg-black dark:bg-grid-medium-white/[0.2]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
          <Outlet />
        </div>
      </App>
    </ThemeProvider>
  )
}

export function App({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={cn(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className={cn('min-h-dvh font-sans antialiased')}>
        <GlobalLoading />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

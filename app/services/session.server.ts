import { createCookieSessionStorage } from '@remix-run/node'
import { createThemeSessionResolver } from 'remix-themes'
import invariant from 'tiny-invariant'

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set')

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    // Set domain and secure only if in production
    ...(process.env.NODE_ENV === 'production' ? { domain: process.env.DOMAIN_NAME, secure: true } : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)

import { createThemeAction } from 'remix-themes'
import { themeSessionResolver } from '~/utils/theme-session.server'

export const action = createThemeAction(themeSessionResolver)

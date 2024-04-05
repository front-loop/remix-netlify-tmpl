export const APP_NAME = 'Remix'

export function title(pageTitle?: string) {
  return pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME
}

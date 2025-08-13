import { parse, serialize } from 'cookie'
import { type NextApiRequest } from 'next'
import {
    type CookieAttributes,
    cookieName,
    isSecureCookies
} from 'src/server/common/cookies'

const csrfCookieAttributes = {
    name: cookieName('csrf'),
    options: {
        path: '/',
        sameSite: 'strict',
        secure: isSecureCookies,
        httpOnly: true
    }
} as const satisfies CookieAttributes

const csrfTransportCookieAttributes = {
    name: cookieName('csrft'),
    options: {
        path: '/',
        sameSite: 'strict',
        secure: isSecureCookies
    }
} as const satisfies CookieAttributes

/**
 * Creates a serialized string of values for the CSRF cookie
 */
export const serializeCsrf = (token: string) => {
    return serialize(
        csrfCookieAttributes.name,
        token,
        csrfCookieAttributes.options
    )
}

/**
 * Creates a serialized string of values for the CSRF transport cookie
 */
export const serializeCsrfTransport = (token: string) => {
    return serialize(
        csrfTransportCookieAttributes.name,
        token,
        csrfTransportCookieAttributes.options
    )
}

/**
 * Retrieves the value from the CSRF transport cookie via document
 */
export const getCsrfTransportDocumentCookie = () => {
    if (typeof window !== 'undefined') {
        return parse(document.cookie)?.[csrfTransportCookieAttributes.name]
    }
    return
}

/**
 * Retrieves the value from the CSRF cookie via request
 */
export const csrfCookie = (cookies: NextApiRequest['cookies']) => {
    return cookies?.[csrfCookieAttributes.name] ?? null
}

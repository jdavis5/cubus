import { serialize } from 'cookie'
import { type NextApiRequest } from 'next'
import {
    type CookieAttributes,
    cookieName,
    isSecureCookies
} from 'src/server/common/cookies'

const sessionCookieAttributes = {
    name: cookieName('session'),
    options: {
        path: '/',
        sameSite: 'strict',
        httpOnly: true,
        secure: isSecureCookies,
        maxAge: 60 * 60 * 24 * 7
    }
} as const satisfies CookieAttributes

/**
 * Creates a serialized deleted session cookie
 */
export const serializeDeletedSession = () => {
    return serialize(sessionCookieAttributes.name, '', {
        ...sessionCookieAttributes.options,
        maxAge: 1
    })
}

/**
 * Creates a serialized session cookie using the given value
 */
export const serializeSession = (value: string) => {
    return serialize(
        sessionCookieAttributes.name,
        value,
        sessionCookieAttributes.options
    )
}

/**
 * Retrieves the value of the session cookie from a passed object
 */
export const getSessionFromCookies = (cookies: NextApiRequest['cookies']) => {
    return cookies[sessionCookieAttributes.name] ?? null
}

import { type CookieSerializeOptions } from 'cookie'

export type CookieAttributes = {
    name: string
    options: Pick<
        CookieSerializeOptions,
        'path' | 'sameSite' | 'maxAge' | 'httpOnly' | 'secure'
    >
}

export const isSecureCookies = process.env.NODE_ENV === 'production'

/**
 * Returns a namespaced cookie name, adding a 'Host__' prefix for secure cookies. 
 */
export const cookieName = (name: string) => {
    return `cubus__${isSecureCookies ? 'Host__' : ''}${name}`
}

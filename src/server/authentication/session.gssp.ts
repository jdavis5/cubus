import {
    type GetServerSideProps,
    type GetServerSidePropsContext,
    type GetServerSidePropsResult
} from 'next'
import prisma from 'prisma/main'
import {
    type AuthenticatedSession,
    type Session,
    isAuthenticatedSession
} from 'src/common/authentication/session'
import {
    serializeCsrf,
    serializeCsrfTransport
} from 'src/server/authentication/csrf.cookies'
import {
    generateCsrfToken,
    signCsrfToken
} from 'src/server/authentication/csrf.tokens'
import { getSessionFromCookies } from 'src/server/authentication/session.cookies'

type GSSPSessionOptions = {
    app: Session
    authenticated: AuthenticatedSession
}

type GSSPSessionProps = {
    session: GSSPSessionOptions[keyof GSSPSessionOptions]
}

type GSSPSessionContext<Option extends keyof GSSPSessionOptions> =
    GetServerSidePropsContext & {
        req: GetServerSidePropsContext['req'] & {
            session: GSSPSessionOptions[Option]
        }
    }

type GSSPWithSession<
    Option extends keyof GSSPSessionOptions,
    Props extends { [key: string]: any }
> = (
    context: GSSPSessionContext<Option>
) => Promise<GetServerSidePropsResult<Props>>

/**
 * Refreshes the CSRF token and cookies
 */
const withCsrfRefresh = <Props extends { [K: string]: any }>(
    gsspCb: GetServerSideProps<Props>
) => {
    return async (context: GetServerSidePropsContext) => {
        const csrf = generateCsrfToken()
        context.res.setHeader('Set-Cookie', [
            serializeCsrf(csrf),
            serializeCsrfTransport(signCsrfToken(csrf))
        ])
        return gsspCb(context)
    }
}

/**
 * Attaches a session to the context
 */
const withSessionContext = <Props extends { [K: string]: any }>(
    gsspCb: GSSPWithSession<'app', Props>
) => {
    return withCsrfRefresh(async (context) => {
        const sessionId = getSessionFromCookies(context.req.cookies)
        const user = sessionId
            ? await prisma.token.findValidSession(sessionId)
            : null
        const appSession = {
            user
        } satisfies Session
        const extendedContext: GSSPSessionContext<'app'> = Object.assign(
            {},
            context,
            { req: { ...context.req, session: appSession } }
        )
        return gsspCb(extendedContext)
    })
}

/**
 * A `getServerSideProps` implementation without a callback that attaches
 * a session to the returned props
 */
export const withSession = () => {
    return withSessionContext(async (context) => {
        return {
            props: {
                session: context.req.session
            } satisfies GSSPSessionProps
        }
    })
}

/**
 * A `getServerSideProps` implementation that expects a callback and attaches
 * a session to the returned props
 */
export const withSessionCallback = <Props extends { [K: string]: any }>(
    gsspCb: GSSPWithSession<'app', Props>
) => {
    return withSessionContext(async (context) => {
        const result = await gsspCb(context)
        if ('props' in result) {
            const currentProps = await result.props
            return {
                props: {
                    ...currentProps,
                    session: context.req.session
                } satisfies GSSPSessionProps
            }
        }
        return result
    })
}

/**
 * A type guard that narrows the context if a session can be authenticated
 */
const isAuthenticatedSessionContext = (
    context: GSSPSessionContext<'app'>
): context is GSSPSessionContext<'authenticated'> => {
    return isAuthenticatedSession(context.req.session)
}

/**
 * Attaches an authenticated session to the context
 */
const withAuthSessionContext = <Props extends { [K: string]: any }>(
    gsspCb: GSSPWithSession<'authenticated', Props>
) => {
    return withSessionContext(async (context) => {
        if (!isAuthenticatedSessionContext(context)) {
            return {
                redirect: {
                    destination: '/sign-in',
                    permanent: false
                }
            }
        }
        return gsspCb(context)
    })
}

/**
 * A `getServerSideProps` implementation without a callback and attaches
 * an authenticated session to the returned props
 */
export const withAuthenticatedSession = () => {
    return withAuthSessionContext(async (context) => {
        return {
            props: {
                session: context.req.session
            } satisfies GSSPSessionProps
        }
    })
}

/**
 * A `getServerSideProps` implementation that expects a callback and attaches
 * an authenticated session to the returned props
 */
export const withAuthenticatedSessionCallback = <
    Props extends { [K: string]: any }
>(
    gsspCb: GSSPWithSession<'authenticated', Props>
) => {
    return withAuthSessionContext(async (context) => {
        const result = await gsspCb(context)
        if ('props' in result) {
            const currentProps = await result.props
            return {
                props: {
                    ...currentProps,
                    session: context.req.session
                } satisfies GSSPSessionProps
            }
        }
        return result
    })
}

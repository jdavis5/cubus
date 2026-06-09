import { NextRequest, NextResponse } from 'next/server'
import env from 'env/server'

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.match(/^\/docs\/api$/)) {
        return NextResponse.redirect(
            new URL(
                [req.nextUrl.pathname, `v${env.API_VERSION}`].join('/'),
                req.nextUrl.origin
            )
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/docs/api'
}

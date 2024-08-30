import env from 'env/server'
import { invariant } from 'src/common/invariant'

export const defaultPageSize = 25

type PaginateArgs<T = any> = {
    items: Array<T>
    pathname: string
    page: number
    pageSize: number
    totalCount: number
}

/**
 * Creates a pagination object
 */
export const paginate = <T>(args: PaginateArgs<T>) => {
    invariant(
        Number.isInteger(args.page) && args.page > 0,
        'page must be a valid integer, and at least 1'
    )
    invariant(
        Number.isInteger(args.pageSize) && args.page > 0,
        'pageSize must be a valid integer, and at least 1'
    )
    invariant(
        Number.isInteger(args.totalCount) && args.totalCount >= 0,
        'totalCount must be a valid integer, and at least 0'
    )
    const url = new URL(args.pathname, env.NEXT_PUBLIC_BASE_URL)
    const params = new URLSearchParams()
    const totalPages = Math.ceil(args.totalCount / args.pageSize)

    if (args.pageSize !== defaultPageSize) {
        params.set('pageSize', args.pageSize.toString())
    }

    const previous = Math.max(Math.min(args.page, totalPages + 1) - 1, 1)
    params.set('page', previous.toString())
    const previousPage = `${url.pathname}?${params.toString()}`

    const next = Math.max(Math.min(args.page + 1, totalPages), 1)
    params.set('page', next.toString())
    const nextPage = `${url.pathname}?${params.toString()}`

    params.set('page', '1')
    const firstPage = `${url.pathname}?${params.toString()}`

    params.set('page', Math.max(totalPages, 1).toString())
    const lastPage = `${url.pathname}?${params.toString()}`

    return {
        totalCount: args.totalCount,
        page: args.page,
        firstPage,
        previousPage,
        nextPage,
        lastPage,
        items: args.items
    }
}

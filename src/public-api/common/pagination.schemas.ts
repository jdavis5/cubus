import { z } from 'zod'
import { defaultPageSize } from './pagination'

export const paginationQuerySchema = z.object({
    /**
     * @openapi
     * components:
     *   parameters:
     *     Pagination.page:
     *       name: page
     *       description: The target page of the result set
     *       in: query
     *       required: false
     *       schema:
     *         type: integer
     *         default: 1
     *         example: 1
     */
    page: z.coerce.number().int().positive().catch(1),

    /**
     * @openapi
     * components:
     *   parameters:
     *     Pagination.pageSize:
     *       name: pageSize
     *       description: The size of the result set per page
     *       in: query
     *       required: false
     *       schema:
     *         type: integer
     *         default: 25
     *         example: 25
     */
    pageSize: z.coerce.number().int().positive().catch(defaultPageSize)
})

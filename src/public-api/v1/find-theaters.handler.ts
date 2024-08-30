import { type NextApiRequest, type NextApiResponse } from 'next'
import prisma from 'prisma/mflix'
import { z } from 'zod'
import { paginate } from 'src/public-api/common/pagination'
import { paginationQuerySchema } from 'src/public-api/common/pagination.schemas'
import { requestSchema } from 'src/public-api/common/schemas'

const querySchema = z.object({
    /**
     * @openapi
     * components:
     *   parameters:
     *     Theaters.findTheaters_state:
     *       name: state
     *       description: A two letter U.S. postal code state abbreviation
     *       in: query
     *       required: false
     *       schema:
     *         type: array
     *         items:
     *           type: string
     *         example:
     *           - CA
     *           - TX
     */
    state: z
        .array(
            z
                .string()
                .regex(
                    /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/i,
                    {
                        message: 'Must be a valid two letter state abbreviation'
                    }
                )
        )
        .optional()
        .catch(undefined)
})

/**
 * Finds a list of theaters that matching the provided filters
 *
 * @openapi
 * /theaters:
 *   get:
 *     operationId: findTheaters
 *     tags:
 *       - theaters
 *     summary: Finds a list of theaters
 *     description: Returns a paginated list of theaters that match the provided filters
 *     parameters:
 *       - $ref: '#/components/parameters/Theaters.findTheaters_state'
 *       - $ref: '#/components/parameters/Pagination.page'
 *       - $ref: '#/components/parameters/Pagination.pageSize'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200Theaters'
 *       '401':
 *         $ref: '#/components/responses/401Unauthorized'
 */
export const findTheaters = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { url } = requestSchema.parse(req)
    const filters = querySchema.parse(req.query)
    const pagination = paginationQuerySchema.parse(req.query)
    const results = await prisma.theaters.paginatedFindByFilters(
        filters,
        pagination
    )
    return res.status(200).json(paginate({ pathname: url, ...results }))
}

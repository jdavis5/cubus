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
     *     Movies.findMovies_cast:
     *       name: cast
     *       description: An array of any matching cast members
     *       in: query
     *       required: false
     *       schema:
     *         type: array
     *         items:
     *           type: string
     *         example:
     *           - mark ford
     *           - harrison fisher
     */
    cast: z.array(z.string()).optional(),

    /**
     * @openapi
     * components:
     *   parameters:
     *     Movies.findMovies_directors:
     *       name: directors
     *       description: An array of any matching directors
     *       in: query
     *       required: false
     *       schema:
     *         type: array
     *         items:
     *           type: string
     *         example:
     *           - george cushing
     */
    directors: z.array(z.string()).optional(),

    /**
     * @openapi
     * components:
     *   parameters:
     *     Movies.findMovies_plot:
     *       name: plot
     *       description: A matching string within any plot or fullplot summary
     *       in: query
     *       required: false
     *       schema:
     *         type: string
     *         example: desert planet
     */
    plot: z.string().optional(),

    /**
     * @openapi
     * components:
     *   parameters:
     *     Movies.findMovies_rating:
     *       name: rating
     *       description: A range of IMDb ratings to search
     *       in: query
     *       required: false
     *       schema:
     *         type: string
     *       examples:
     *         between:
     *           summary: Movies between a specific IMDb rating
     *           value: 6.2,8.3
     *           description: Search for movies with IMDb ratings between 6.2 and 8.3
     *         min:
     *           summary: Movies with a minimum IMDb rating
     *           value: 7.2,
     *           description: Search for movies with a minimum IMDb rating of 7.2
     *         max:
     *           summary: Movies with a maximum IMDb rating
     *           value: ,8.0
     *           description: Search for movies with a maximum IMDb rating of 8.0
     */
    rating: z
        .string()
        .transform((input, ctx) => {
            const addIssue = (message: string) => {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message,
                    fatal: true
                })
                return z.NEVER
            }
            const inputs = input.split(',')
            if (inputs.length > 2) {
                return addIssue(
                    'A maximum of 2 numbers can be provided and must be in the format of number,number'
                )
            }
            const min = Number.parseFloat(inputs[0] ?? '') || undefined
            const max = Number.parseFloat(inputs[1] ?? '') || undefined
            return (
                min && max && min > max ? [max, min] : [min, max]
            ) satisfies [number?, number?]
        })
        .optional()
        .catch(undefined),

    /**
     * @openapi
     * components:
     *   parameters:
     *     Movies.findMovies_range:
     *       name: range
     *       description: A range of years to search
     *       in: query
     *       required: false
     *       schema:
     *         type: string
     *       examples:
     *         between:
     *           summary: Movies released between specific years
     *           value: 2020,2022
     *           description: Search for movies released between 2020 and 2022
     *         after:
     *           summary: Movies released after a specific year
     *           value: 1990,
     *           description: Search for movies released after 1990
     *         before:
     *           summary: Movies released before a specific year
     *           value: ,2010
     *           description: Search for movies released before 2010
     */
    range: z
        .string()
        .transform((input, ctx) => {
            const addIssue = (message: string) => {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message,
                    fatal: true
                })
                return z.NEVER
            }
            if (!input.match(/^(\d{4})?,(\d{4})?$/)) {
                return addIssue(
                    'A maximum of 2 years can be provided and must be in the format of YYYY,YYYY'
                )
            }
            const inputs = input.split(',')
            const min = Number.parseInt(inputs[0] ?? '') || undefined
            const max = Number.parseInt(inputs[1] ?? '') || undefined
            return (
                min && max && min > max ? [max, min] : [min, max]
            ) satisfies [number?, number?]
        })
        .optional()
        .catch(undefined),

    /**
     * @openapi
     * components:
     *   parameters:
     *     Movies.findMovies_title:
     *       name: title
     *       description: A matching string within the movie title
     *       in: query
     *       required: false
     *       schema:
     *         type: string
     *         example: space wars
     */
    title: z.string().optional()
})

/**
 * Finds a list of movies that match the provided filters
 *
 * @openapi
 * /movies:
 *   get:
 *     operationId: findMovies
 *     tags:
 *       - movies
 *     summary: Finds a list of movies
 *     description: Returns a paginated list of movies that match the provided filters
 *     parameters:
 *       - $ref: '#/components/parameters/Movies.findMovies_title'
 *       - $ref: '#/components/parameters/Movies.findMovies_plot'
 *       - $ref: '#/components/parameters/Movies.findMovies_rating'
 *       - $ref: '#/components/parameters/Movies.findMovies_range'
 *       - $ref: '#/components/parameters/Movies.findMovies_cast'
 *       - $ref: '#/components/parameters/Movies.findMovies_directors'
 *       - $ref: '#/components/parameters/Pagination.page'
 *       - $ref: '#/components/parameters/Pagination.pageSize'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200Movies'
 *       '401':
 *         $ref: '#/components/responses/401Unauthorized'
 */
export const findMovies = async (req: NextApiRequest, res: NextApiResponse) => {
    const { url } = requestSchema.parse(req)
    const filters = querySchema.parse(req.query)
    const pagination = paginationQuerySchema.parse(req.query)
    const results = await prisma.movies.paginatedFindByFilters(
        filters,
        pagination
    )
    return res.status(200).json(paginate({ pathname: url, ...results }))
}

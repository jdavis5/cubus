import { type NextApiRequest, type NextApiResponse } from 'next'
import prisma from 'prisma/mflix'
import { ApiResourceNotFoundProblem } from 'src/public-api/common/problem-details/api-resource-not-found-problem'
import { moviePathSchema } from 'src/public-api/movies/movies.schemas'

const pathSchema = moviePathSchema.pick({ movieId: true })

/**
 * Finds a movie by ID
 *
 * @openapi
 * /movies/{movieId}:
 *   get:
 *     operationId: findMovieById
 *     tags:
 *       - movies
 *     summary: Finds a movie by its ID
 *     description: Returns the movie data where its ID matches the value provided
 *     parameters:
 *       - $ref: '#/components/parameters/Movies.movieId'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200Movie'
 *       '401':
 *         $ref: '#/components/responses/401Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/404NotFound'
 */
export const findMovieById = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { movieId } = pathSchema.parse(req.query)
    const result = await prisma.movies.findById(movieId)
    if (!result) {
        throw new ApiResourceNotFoundProblem({
            detail: 'No movie with the provided ID was found.'
        })
    }
    return res.status(200).json(result)
}

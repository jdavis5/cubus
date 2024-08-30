import { type NextApiRequest, type NextApiResponse } from 'next'
import prisma from 'prisma/mflix'
import { ApiResourceNotFoundProblem } from 'src/public-api/common/problem-details/api-resource-not-found-problem'
import { theaterPathSchema } from 'src/public-api/theaters/theaters.schemas'

const pathSchema = theaterPathSchema.pick({ theaterId: true })

/**
 * Finds a theater by ID
 *
 * @openapi
 * /theaters/{theaterId}:
 *   get:
 *     operationId: findTheaterById
 *     tags:
 *       - theaters
 *     summary: Finds a theater by its ID
 *     description: Returns the theater data where its ID matches the value provided
 *     parameters:
 *       - $ref: '#/components/parameters/Theaters.theaterId'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/200Theater'
 *       '401':
 *         $ref: '#/components/responses/401Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/404NotFound'
 */
export const findTheaterById = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { theaterId } = pathSchema.parse(req.query)
    const result = await prisma.theaters.findFirst({
        where: {
            theaterId
        }
    })
    if (!result) {
        throw new ApiResourceNotFoundProblem({
            detail: 'No theater with the provided ID was found.'
        })
    }
    return res.status(200).json(result)
}

import { z } from 'zod'

export const moviePathSchema = z.object({
    /**
     * @openapi
     * components:
     *   parameters:
     *     Movies.movieId:
     *       name: movieId
     *       in: path
     *       required: true
     *       schema:
     *         type: string
     *         example: abcd1e23f4abcd1e23f4a5cd
     */
    movieId: z.string().regex(/^[a-f0-9]{24}$/, {
        message: 'Must be a 24 digit hexadecimal string'
    })
})

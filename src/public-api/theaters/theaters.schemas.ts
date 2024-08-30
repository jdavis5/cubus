import { z } from 'zod'

export const theaterPathSchema = z.object({
    /**
     * @openapi
     * components:
     *   parameters:
     *     Theaters.theaterId:
     *       name: theaterId
     *       in: path
     *       required: true
     *       schema:
     *         type: integer
     *         example: 123
     */
    theaterId: z.coerce.number().int().positive()
})

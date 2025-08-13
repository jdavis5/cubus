import prisma from 'prisma/mflix'

/**
 * Finds a movie with the given ID
 */
export const findById = (id: string) => {
    return prisma.movies.findFirst({
        where: {
            type: 'movie',
            id
        }
    })
}

import { Prisma } from 'prisma/mflix/client'
import movies from './movies/movies.prisma'
import theaters from './theaters/theaters.prisma'

export default Prisma.defineExtension((client) => {
    return client.$extends(theaters).$extends(movies)
})

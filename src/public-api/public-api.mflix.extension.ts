import { Prisma } from 'prisma/mflix/client'
import movies from './movies/movies.extension'
import theaters from './theaters/theaters.extension'

export default Prisma.defineExtension((client) => {
    return client.$extends(theaters).$extends(movies)
})

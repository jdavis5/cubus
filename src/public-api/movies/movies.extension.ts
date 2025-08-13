import { Prisma } from 'prisma/mflix/client'
import { findById } from './extensions/movies.find-by-id'
import { paginatedFindByFilters } from './extensions/movies.paginated-find-by-filters'

export default Prisma.defineExtension({
    name: 'public-api.movies.extension',
    model: {
        movies: {
            findById,
            paginatedFindByFilters
        }
    }
})

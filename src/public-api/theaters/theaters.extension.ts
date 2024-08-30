import { Prisma } from 'prisma/mflix/client'
import { paginatedFindByFilters } from './extensions/theaters.paginated-find-by-filters'

export default Prisma.defineExtension({
    name: 'public-api.theaters.extension',
    model: {
        theaters: {
            paginatedFindByFilters
        }
    }
})

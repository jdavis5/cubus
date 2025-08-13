import { publicApiHandler } from 'src/public-api/handler'
import { findMovies } from 'src/public-api/v1/find-movies.handler'

export default publicApiHandler({
    get: findMovies
})

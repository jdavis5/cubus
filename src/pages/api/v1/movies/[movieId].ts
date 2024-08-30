import { publicApiHandler } from 'src/public-api/handler'
import { findMovieById } from 'src/public-api/v1/find-movie-by-id.handler'

export default publicApiHandler({
    get: findMovieById
})

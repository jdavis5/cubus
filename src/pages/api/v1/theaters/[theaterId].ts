import { publicApiHandler } from 'src/public-api/handler'
import { findTheaterById } from 'src/public-api/v1/find-theater-by-id.handler'

export default publicApiHandler({
    get: findTheaterById
})

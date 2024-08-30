import { publicApiHandler } from 'src/public-api/handler'
import { findTheaters } from 'src/public-api/v1/find-theaters.handler'

export default publicApiHandler({
    get: findTheaters
})

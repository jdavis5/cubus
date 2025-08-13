import { type NextApiRequest, type NextApiResponse } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import swaggerJsdoc from 'swagger-jsdoc'
import { requestSchema } from 'src/public-api/common/schemas'
import { parseVersionFromUrl } from 'src/public-api/common/versioning'
import { ApiInternalError } from 'src/server/common/api-errors'

/**
 * Generates a JSON specification for the request URL's API version,
 * and attaches cache-control headers
 */
export const generateSpec = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { url } = requestSchema.parse(req)
    const version = parseVersionFromUrl(url)
    if (!version) {
        throw new ApiInternalError()
    }
    const basePath = path.resolve(process.cwd(), 'src/public-api')
    const fileContents = fs.readFileSync(
        path.resolve(basePath, version, 'openapi.json'),
        'utf8'
    )
    res.setHeader(
        'Cache-Control',
        'max-age=604800, stale-while-revalidate=86400'
    )
    return swaggerJsdoc({
        throwOnErrors: true,
        definition: JSON.parse(fileContents),
        // Files using OpenAPI comment definitions need to be included in next.config.js
        // using `outputFileTracingIncludes` to ensure they are included in the build output
        apis: [
            `${basePath}/${version}/*.handler.ts`,
            `${basePath}/**/*.schemas.ts`
        ]
    })
}

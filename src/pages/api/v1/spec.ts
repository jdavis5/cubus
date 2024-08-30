import { type NextApiRequest, type NextApiResponse } from 'next'
import { generateSpec } from 'src/public-api/spec/api/generate-spec.helper'

export default async function v1SpecHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const spec = await generateSpec(req, res)
    return res.status(200).json(spec)
}

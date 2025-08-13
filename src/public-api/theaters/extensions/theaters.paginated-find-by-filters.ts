import { PrismaCustomPipelineResultError } from 'prisma/errors'
import prisma from 'prisma/mflix'
import { z } from 'zod'

const rawResultsSchema = z.object({
    totalCount: z.number(),
    data: z.array(
        z.object({
            id: z.string()
        })
    )
})

type Filters = {
    state?: Array<string>
}

export const paginatedFindByFilters = async (
    filters: Filters,
    options: {
        page: number
        pageSize: number
    }
) => {
    /**
     * Creates an aggregation filter
     */
    const createFilter = (filters: Filters) => {
        return {
            $and: [
                {
                    ...(filters.state?.length && {
                        $or: filters.state.map((state) => ({
                            'location.address.state': {
                                $regex: state,
                                $options: 'i'
                            }
                        }))
                    })
                }
            ]
        }
    }
    // As Prisma does not support insensitive scalar queries,
    // a raw aggregation query must be used to retrieve a list of IDs
    // that can be passed back into a Prisma query
    const rawResults = await prisma.theaters.aggregateRaw({
        pipeline: [
            {
                $match: createFilter(filters)
            },
            {
                $sort: {
                    theaterId: 1,
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    id: { $toString: '$_id' }
                }
            },
            {
                $facet: {
                    total: [
                        {
                            $count: 'count'
                        }
                    ],
                    data: [
                        {
                            $skip: (options.page - 1) * options.pageSize
                        },
                        {
                            $limit: options.pageSize
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: '$total',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    totalCount: {
                        $ifNull: ['$total.count', 0]
                    },
                    data: '$data'
                }
            }
        ]
    })
    const results = rawResultsSchema.safeParse(rawResults[0])
    if (!results.success) {
        throw new PrismaCustomPipelineResultError()
    }
    const { data, totalCount } = results.data
    const items = await prisma.theaters.findMany({
        where: {
            id: {
                in: data.map((item) => item.id)
            }
        }
    })
    return {
        items,
        totalCount,
        page: options.page,
        pageSize: options.pageSize
    }
}

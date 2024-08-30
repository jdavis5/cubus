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
    title?: string
    range?: [number?, number?]
    plot?: string
    cast?: Array<string>
    directors?: Array<string>
    rating?: [number?, number?]
}

/**
 * Finds paginated records that match the provided filters
 */
export const paginatedFindByFilters = async (
    filters: Filters,
    options: { page: number; pageSize: number }
) => {
    /**
     * Creates an aggregation filter
     */
    const createFilter = (filters: Filters) => {
        return {
            $and: [
                { type: 'movie' },
                {
                    ...(filters.range?.[0] && {
                        year: {
                            $gte: filters.range[0]
                        }
                    })
                },
                {
                    ...(filters.range?.[1] && {
                        year: {
                            $lte: filters.range[1]
                        }
                    })
                },
                {
                    ...(filters.rating?.[0] && {
                        'imdb.rating': {
                            $gte: filters.rating[0]
                        }
                    })
                },
                {
                    ...(filters.rating?.[1] && {
                        'imdb.rating': {
                            $lte: filters.rating[1]
                        }
                    })
                },
                {
                    ...(filters.title && {
                        title: {
                            $regex: filters.title,
                            $options: 'i'
                        }
                    })
                },
                {
                    ...(filters.cast?.length && {
                        $or: filters.cast.map((member) => ({
                            cast: {
                                $elemMatch: {
                                    $regex: member,
                                    $options: 'i'
                                }
                            }
                        }))
                    })
                },
                {
                    ...(filters.directors?.length && {
                        $or: filters.directors.map((member) => ({
                            directors: {
                                $elemMatch: {
                                    $regex: member,
                                    $options: 'i'
                                }
                            }
                        }))
                    })
                },
                {
                    ...(filters.plot && {
                        $or: [
                            {
                                plot: {
                                    $regex: filters.plot,
                                    $options: 'i'
                                },
                                fullplot: {
                                    $regex: filters.plot,
                                    $options: 'i'
                                }
                            }
                        ]
                    })
                }
            ]
        }
    }
    // As Prisma does not support insensitive scalar queries,
    // a raw aggregation query must be used to retrieve a list of IDs
    // that can be passed back into a Prisma query
    const rawResults = await prisma.movies.aggregateRaw({
        pipeline: [
            {
                $match: createFilter(filters)
            },
            {
                $project: {
                    _id: 1,
                    year: 1,
                    imdbRating: {
                        $cond: {
                            if: {
                                $eq: ['$imdb.rating', '']
                            },
                            then: 1,
                            else: '$imdb.rating'
                        }
                    },
                    title: 1
                }
            },
            {
                $sort: {
                    imdbRating: -1,
                    year: -1,
                    title: 1,
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    id: {
                        $toString: '$_id'
                    }
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
        ],
        options: {
            allowDiskUse: true
        }
    })
    const results = rawResultsSchema.safeParse(rawResults[0])
    if (!results.success) {
        throw new PrismaCustomPipelineResultError()
    }
    const { data, totalCount } = results.data
    const items = await prisma.movies.findMany({
        where: {
            id: {
                in: data.map((item) => item.id)
            }
        },
        orderBy: [
            {
                imdb: {
                    rating: 'desc'
                }
            },
            {
                year: 'desc'
            },
            {
                title: 'asc'
            }
        ]
    })
    return {
        items,
        totalCount,
        page: options.page,
        pageSize: options.pageSize
    }
}

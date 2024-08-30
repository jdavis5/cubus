import { csrfMiddleware } from './authentication/api/csrf.middleware.trpc'
import { attachSessionCtxMiddleware } from './authentication/api/session.middleware.trpc'
import { ApiError, ApiInternalError } from 'src/server/common/api-errors'
import { t } from 'src/server/trpc.init'

export const appPublicProcedure = t.procedure

export const appProtectedProcedure = t.procedure
    .use(csrfMiddleware)
    .use(attachSessionCtxMiddleware)

type Result<Data, Error> =
    | {
          status: 'success'
          data: Data
      }
    | {
          status: 'error'
          error: Error
      }

type ProcedureResult<Data> = Result<
    Data,
    {
        message: string
        code?: string
    }
>

export const procedureResult = async <T>(
    fn: () => Promise<T>
): Promise<ProcedureResult<T>> => {
    try {
        const result = await fn()
        return {
            status: 'success',
            data: result
        }
    } catch (error: unknown) {
        if (error instanceof ApiError) {
            if (error instanceof ApiInternalError) {
                throw error
            }
            return {
                status: 'error',
                error: {
                    message: error.message,
                    code: error.code
                }
            }
        }
        throw error
    }
}

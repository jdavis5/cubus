import styles from './api-error-list.module.scss'
import { Code } from 'src/common/components/code'
import { ApiErrorItem } from 'src/features/docs/api-error-item'

export const ApiErrorList = () => {
    return (
        <div className={styles['error-list']}>
            <ApiErrorItem id="internal" status={500}>
                <p>
                    The operation could not be completed due to an internal
                    error.
                    <br />
                    Try the request again later.
                </p>
            </ApiErrorItem>
            <ApiErrorItem id="invalid-input" status={400}>
                <>
                    <p>
                        The input provided to the request is not in the correct
                        format.
                    </p>
                    <p>
                        Resolve the issues listed under <Code>errors</Code> in
                        the response object and try again.
                    </p>
                </>
            </ApiErrorItem>
            <ApiErrorItem id="invalid-key" status={401}>
                <>
                    <p>A valid API key is required to access this resource.</p>
                    <p>
                        Your API key should be included as a request header in
                        the format of{' '}
                        <Code>Authorization: Bearer {'<key>'}</Code>
                    </p>
                </>
            </ApiErrorItem>
            <ApiErrorItem id="method-not-allowed" status={405}>
                <>
                    <p>
                        The selected HTTP method is not supported for this
                        operation.
                    </p>
                    <p>
                        Acceptable HTTP methods for the operation are provided
                        in the <Code>Allow</Code> response header.
                    </p>
                </>
            </ApiErrorItem>
            <ApiErrorItem id="resource-not-found" status={404}>
                <p>
                    The targeted resource for this operation could not be found.
                </p>
            </ApiErrorItem>
        </div>
    )
}

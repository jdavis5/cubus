import styles from './style.module.scss'
import { Code } from 'src/common/components/code'
import { ErrorItem } from 'src/features/docs/error-item'

export const ErrorList = () => {
    return (
        <div className={styles['error-list']}>
            <ErrorItem id="internal" status={500}>
                <p>
                    The operation could not be completed due to an internal
                    error.
                    <br />
                    Try the request again later.
                </p>
            </ErrorItem>
            <ErrorItem id="invalid-input" status={400}>
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
            </ErrorItem>
            <ErrorItem id="invalid-key" status={401}>
                <>
                    <p>A valid API key is required to access this resource.</p>
                    <p>
                        Your API key should be included as a request header in
                        the format of{' '}
                        <Code>Authorization: Bearer &lt;key&gt;</Code>
                    </p>
                </>
            </ErrorItem>
            <ErrorItem id="method-not-allowed" status={405}>
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
            </ErrorItem>
            <ErrorItem id="resource-not-found" status={404}>
                <p>
                    The targeted resource for this operation could not be found.
                </p>
            </ErrorItem>
        </div>
    )
}

import styles from './style.module.scss'
import { useRouter } from 'next/router'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { Subheading } from 'src/common/components/subheading'
import { ErrorLayout } from 'src/layouts/error-layout'

type ErrorBoundaryProps = React.PropsWithChildren

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
    const router = useRouter()
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            {...props}
            resetKeys={[router.pathname]}
        />
    )
}

type ErrorFallbackProps = {
    error: Error
    resetErrorBoundary: () => void
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
    return (
        <ErrorLayout>
            <Section>
                <Heading as="h1">Oops</Heading>
                <Subheading>Something went wrong</Subheading>
                <div className={styles['boundary__message']}>
                    {error.message}
                </div>
            </Section>
        </ErrorLayout>
    )
}

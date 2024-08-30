import styles from './style.module.scss'
import clsx from 'clsx'
import { Container } from 'src/common/components/container'

type ActionContainerProps = {
    content: React.ReactNode
    actions: React.ReactNode
    isError?: boolean
}

export const ActionContainer = ({
    content,
    actions,
    isError = false
}: ActionContainerProps) => {
    return (
        <Container constrict>
            <div
                className={clsx(
                    styles['container'],
                    isError && styles['container--error']
                )}
            >
                <div className={styles['container__content']}>{content}</div>
                <div className={styles['container__actions']}>{actions}</div>
            </div>
        </Container>
    )
}

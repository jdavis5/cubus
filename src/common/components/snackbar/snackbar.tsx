import styles from './style.module.scss'
import { FaTimes } from 'react-icons/fa'
import { Portal } from 'src/common/components/portal'

type SnackbarProps = {
    message?: string
    onClose: () => void
}

export const Snackbar = ({ message, onClose }: SnackbarProps) => {
    return (
        <Portal elementId="outside-content">
            <div className={styles['snackbar-outer-container']}>
                <article className={styles['snackbar-container']}>
                    <section className={styles['snackbar']}>
                        <div className={styles['snackbar-content']}>
                            <div
                                className={styles['snackbar-content__message']}
                            >
                                {message ?? 'An unexpected error has occurred'}
                            </div>
                        </div>
                        <div className={styles['snackbar__interaction']}>
                            <button type="button" onClick={onClose}>
                                <FaTimes />
                            </button>
                        </div>
                    </section>
                    <div className={styles['edge']}></div>
                </article>
            </div>
        </Portal>
    )
}

import styles from './style.module.scss'
import clsx from 'clsx'
import { FaSpinner } from 'react-icons/fa'

type SpinnerProps = {
    align?: 'left' | 'right'
}

export const Spinner = ({ align }: SpinnerProps) => {
    return (
        <div className={clsx(styles['spinner'], styles[`spinner--${align}`])}>
            <div className={styles['spinner__icon']}>
                <FaSpinner />
            </div>
        </div>
    )
}

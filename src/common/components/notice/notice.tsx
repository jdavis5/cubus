import styles from './notice.module.scss'
import React from 'react'
import clsx from 'clsx'
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaInfoCircle
} from 'react-icons/fa'

const iconOptions = {
    info: <FaInfoCircle />,
    error: <FaExclamationCircle />,
    success: <FaCheckCircle />,
    warn: <FaExclamationCircle />
}

type NoticeProps = React.PropsWithChildren<{
    variant: 'info' | 'error' | 'success' | 'warn'
}>

export const Notice = ({ variant, children }: NoticeProps) => {
    return (
        <div className={clsx(styles['notice'], styles[`notice--${variant}`])}>
            <div className={styles['notice__icon']}>{iconOptions[variant]}</div>
            <div className={styles['notice__content']}>{children}</div>
        </div>
    )
}

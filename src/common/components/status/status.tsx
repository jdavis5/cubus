import styles from './style.module.scss'
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

type StatusProps = React.PropsWithChildren<{
    variant: 'info' | 'error' | 'success' | 'warn'
}>

export const Status = ({ variant, children }: StatusProps) => {
    return (
        <div className={clsx(styles['status'], styles[`status--${variant}`])}>
            <div className={styles['status__icon']}>{iconOptions[variant]}</div>
            <div className={styles['status__content']}>{children}</div>
        </div>
    )
}

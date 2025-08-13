import styles from './style.module.scss'
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

type FormStatusProps = {
    message?: string
}

export const FormStatus = ({ message }: FormStatusProps) => {
    if (!message) {
        return null
    }

    return (
        <div className={styles['form-status']}>
            <div className={styles['status']}>
                <span className={styles['status__icon']}>
                    <FaExclamationTriangle />
                </span>
                <span className={styles['status__message']}>{message}</span>
            </div>
        </div>
    )
}

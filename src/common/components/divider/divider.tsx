import styles from './style.module.scss'
import React from 'react'

type DividerProps = {
    value: string
}

export const Divider = ({ value }: DividerProps) => {
    return (
        <div className={styles['divider-wrapper']}>
            <div className={styles['divider']}>
                <span className={styles['divider__left']}></span>
                <span className={styles['divider__content']}>{value}</span>
                <span className={styles['divider__right']}></span>
            </div>
        </div>
    )
}

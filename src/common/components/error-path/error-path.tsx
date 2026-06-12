import styles from './error-path.module.scss'
import React from 'react'

type ErrorPathProps = {
    pathname: string
}

export const ErrorPath = ({ pathname }: ErrorPathProps) => {
    return <div className={styles['path']}>{pathname}</div>
}

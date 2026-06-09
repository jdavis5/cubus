import styles from './style.module.scss'
import React from 'react'
import { usePageUrl } from 'src/common/hooks/page-url'

export const NotFoundPath = () => {
    const { pathname } = usePageUrl()

    return <div className={styles['path']}>{pathname}</div>
}

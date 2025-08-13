import styles from './style.module.scss'
import React from 'react'

type AccountContentProps = React.PropsWithChildren

export const AccountContent = ({ children }: AccountContentProps) => {
    return (
        <div className={styles['content']}>
            <main>{children}</main>
        </div>
    )
}

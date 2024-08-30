import styles from './style.module.scss'
import React from 'react'
import { BaseMobileMenu } from 'src/layouts/base-layout/base-mobile-menu'

type BaseContentProps = React.PropsWithChildren

export const BaseContent = ({ children }: BaseContentProps) => {
    return (
        <div className={styles['content']}>
            <BaseMobileMenu />
            <main>{children}</main>
        </div>
    )
}

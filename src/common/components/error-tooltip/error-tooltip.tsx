import styles from './style.module.scss'
import React from 'react'

type ErrorTooltipProps = React.PropsWithChildren

export const ErrorTooltip = ({ children }: ErrorTooltipProps) => {
    return <div className={styles['warn']}>{children}</div>
}

import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'

type IconItemProps = React.PropsWithChildren<{
    icon: JSX.Element
    variant?: 'left' | 'right'
}>

export const IconItem = ({
    icon,
    children,
    variant = 'left'
}: IconItemProps) => {
    return (
        <span
            className={clsx(
                styles['item'],
                variant === 'right' && styles['item--reverse']
            )}
        >
            <span className={styles['item__icon']}>{icon}</span>
            <span className={styles['item__content']}>{children}</span>
        </span>
    )
}

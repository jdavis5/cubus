import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'

type ContainerProps = React.PropsWithChildren<{
    align?: 'left' | 'middle' | 'right'
    constrict?: boolean
}>

export const Container = ({
    children,
    align = 'left',
    constrict = false
}: ContainerProps) => {
    return (
        <div
            className={clsx(
                styles['container'],
                align === 'middle' && styles['container--middle'],
                align === 'right' && styles['container--right']
            )}
        >
            <div
                className={clsx(
                    styles['container__content'],
                    constrict && styles['container__content--constrict']
                )}
            >
                {children}
            </div>
        </div>
    )
}

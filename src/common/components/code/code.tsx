import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'

type CodeProps = React.PropsWithChildren<{
    variant?: 'inline'
}>

export const Code = ({ children, variant = 'inline' }: CodeProps) => {
    return (
        <code
            className={clsx(
                styles['code'],
                variant == 'inline' && styles['code--inline']
            )}
        >
            {children}
        </code>
    )
}

import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'

type InputContainerProps = React.PropsWithChildren<{
    isError?: boolean
}>

export const InputContainer = ({
    isError = false,
    children
}: InputContainerProps) => {
    return (
        <div
            className={clsx(
                styles['input-container'],
                isError && styles['input-container--error']
            )}
        >
            {children}
        </div>
    )
}

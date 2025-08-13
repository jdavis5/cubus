import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'
import { Portal } from 'src/common/components/portal'
import { Spinner } from 'src/common/components/spinner'

type OverlayProps = React.PropsWithChildren<{
    variant: 'page' | 'page-loading' | 'content'
}>

export const Overlay = ({ variant = 'page', children }: OverlayProps) => {
    if (variant === 'content') {
        return (
            <div
                className={clsx(
                    styles['overlay-container'],
                    styles[`overlay-container--${variant}`]
                )}
                data-overlay="active"
            >
                <div className={styles['overlay']}></div>
                <div className={styles['overlay-content']}>{children}</div>
            </div>
        )
    }

    return (
        <Portal elementId="outside-content">
            <div className={styles['overlay-container']} data-overlay="active">
                <div className={styles['overlay']}></div>
                <div className={styles['overlay-content']}>{children}</div>
                {variant === 'page-loading' && (
                    <div className={styles['loading']}>
                        <Spinner />
                    </div>
                )}
            </div>
        </Portal>
    )
}

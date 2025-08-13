import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'
import { Divider } from 'src/common/components/divider'

type AssistanceProps = React.PropsWithChildren<{
    divider: string
    align?: 'left' | 'middle' | 'right'
}>

export const Assistance = ({
    divider,
    align = 'middle',
    children
}: AssistanceProps) => {
    return (
        <div className={styles['assistance']}>
            <div className={styles['assistance__divider']}>
                <Divider value={divider} />
            </div>
            <div
                className={clsx(
                    styles['assistance__content'],
                    align === 'middle' && styles['assistance__content--middle'],
                    align === 'right' && styles['assistance__content--right']
                )}
            >
                {children}
            </div>
        </div>
    )
}

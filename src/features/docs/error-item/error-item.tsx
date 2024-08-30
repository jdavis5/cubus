import styles from './style.module.scss'
import React from 'react'
import { AnchorHeading } from 'src/common/components/anchor-heading'

type ErrorItemProps = React.PropsWithChildren<{
    id: string
    status: number
}>

export const ErrorItem = ({ id, status, children }: ErrorItemProps) => {
    return (
        <div className={styles['error-item']}>
            <AnchorHeading as="h2" id={id} title={id} />
            <div>{children}</div>
            <dl>
                <dt>Status code</dt>
                <dd>{status}</dd>
            </dl>
        </div>
    )
}

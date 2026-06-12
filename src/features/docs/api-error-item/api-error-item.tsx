import styles from './api-error-item.module.scss'
import React from 'react'
import { AnchorHeading } from 'src/common/components/anchor-heading'

type ApiErrorItemProps = React.PropsWithChildren<{
    id: string
    status: number
}>

export const ApiErrorItem = ({ id, status, children }: ApiErrorItemProps) => {
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

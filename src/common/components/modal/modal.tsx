import styles from './modal.module.scss'
import React from 'react'
import { Overlay } from 'src/common/components/overlay'

type ModalProps = React.PropsWithChildren

export const Modal = ({ children }: ModalProps) => {
    return (
        <Overlay variant="page">
            <div className={styles['modal-overlay']}>
                <div className={styles['modal']}>{children}</div>
            </div>
        </Overlay>
    )
}

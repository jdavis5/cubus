import styles from './style.module.scss'
import React from 'react'
import { createPortal } from 'react-dom'
import { Overlay } from 'src/common/components/overlay'

type ModalProps = React.PropsWithChildren

export const Modal = ({ children }: ModalProps) => {
    const root = document.body

    if (!root) {
        return null
    }

    // Attach as a portal to avoid styles being inherited
    return createPortal(<ModalContainer>{children}</ModalContainer>, root)
}

type ModalContainerProps = React.PropsWithChildren

const ModalContainer = ({ children }: ModalContainerProps) => {
    return (
        <Overlay variant="page">
            <div className={styles['modal-overlay']}>
                <div className={styles['modal']}>{children}</div>
            </div>
        </Overlay>
    )
}

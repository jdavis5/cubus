import React from 'react'
import { Button } from 'src/common/components/button'
import { Modal } from 'src/common/components/modal'
import { CloseAccountModalForm } from 'src/features/account-closure/close-account-modal-form'

export const CloseAccountModalButton = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            {isOpen && (
                <Modal>
                    <CloseAccountModalForm onClose={handleCloseModal} />
                </Modal>
            )}
            <Button onClick={handleOpenModal}>Close account</Button>
        </>
    )
}

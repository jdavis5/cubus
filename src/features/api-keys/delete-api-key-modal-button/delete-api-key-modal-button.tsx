import React from 'react'
import { Button } from 'src/common/components/button'
import { Modal } from 'src/common/components/modal'
import { DeleteApiKeyModalForm } from 'src/features/api-keys/delete-api-key-modal-form'

type DeleteApiKeyModalButtonProps = {
    keyId: string
    name: string
}

export const DeleteApiKeyModalButton = ({
    keyId,
    name
}: DeleteApiKeyModalButtonProps) => {
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
                    <DeleteApiKeyModalForm
                        keyId={keyId}
                        name={name}
                        onClose={handleCloseModal}
                        onSuccess={handleCloseModal}
                    />
                </Modal>
            )}
            <Button onClick={handleOpenModal}>Delete</Button>
        </>
    )
}

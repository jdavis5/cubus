import React from 'react'
import { Button } from 'src/common/components/button'
import { Modal } from 'src/common/components/modal'
import { GenerateApiKeyModalForm } from 'src/features/api-keys/generate-api-key-modal-form'

export const GenerateApiKeyModalButton = () => {
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
                    <GenerateApiKeyModalForm onClose={handleCloseModal} />
                </Modal>
            )}
            <Button onClick={handleOpenModal}>Generate a new key</Button>
        </>
    )
}

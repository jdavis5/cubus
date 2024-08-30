import React from 'react'
import { Modal } from 'src/common/components/modal'
import { Switch } from 'src/common/components/switch'
import { ToggleApiKeyModalForm } from 'src/features/api-keys/toggle-api-key-modal-form'

type ToggleApiKeyModalSwitchProps = {
    keyId: string
    name: string
    checked: boolean
    disabled?: boolean
}

export const ToggleApiKeyModalSwitch = ({
    keyId,
    name,
    checked,
    disabled = false
}: ToggleApiKeyModalSwitchProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    const handleOpenModal = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            {isOpen && (
                <Modal>
                    <ToggleApiKeyModalForm
                        keyId={keyId}
                        name={name}
                        isEnabled={checked}
                        onClose={handleCloseModal}
                        onSuccess={handleCloseModal}
                    />
                </Modal>
            )}
            <Switch
                checked={checked}
                onChange={handleOpenModal}
                disabled={disabled}
            />
        </>
    )
}

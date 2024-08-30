import React from 'react'
import { Button } from 'src/common/components/button'
import { Mutation } from 'src/common/components/mutation'
import { trpc } from 'src/common/trpc.client'

type AccountActivationConfirmationButtonProps = {
    userId: string
    token: string
    onSuccess?: () => void
    onExpired?: () => void
}

export const AccountActivationConfirmationButton = ({
    userId,
    token,
    onSuccess,
    onExpired
}: AccountActivationConfirmationButtonProps) => {
    const mutation = trpc.account.submitActivation.useMutation()

    const handleClick = async () => {
        return mutation.mutate(
            {
                userId,
                token
            },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        return onSuccess?.()
                    }
                    if (data.status === 'error') {
                        if (data.error.code === 'token_expired') {
                            return onExpired?.()
                        }
                    }
                }
            }
        )
    }

    return (
        <Mutation {...mutation}>
            <Button
                onClick={handleClick}
                isActive={mutation.isPending}
                disabled={mutation.isSuccess || mutation.isError}
            >
                Complete activation
            </Button>
        </Mutation>
    )
}

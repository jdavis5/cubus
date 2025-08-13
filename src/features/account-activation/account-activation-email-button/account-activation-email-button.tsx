import styles from './style.module.scss'
import React from 'react'
import { Button } from 'src/common/components/button'
import { Mutation } from 'src/common/components/mutation'
import { Status } from 'src/common/components/status'
import { trpc } from 'src/common/trpc.client'

type AccountActivationEmailButtonProps = {
    email: string
    message?: string
}

export const AccountActivationEmailButton = ({
    email,
    message = 'Send email'
}: AccountActivationEmailButtonProps) => {
    const mutation = trpc.account.requestActivation.useMutation()

    const handleClick = async () => {
        return mutation.mutate()
    }

    return (
        <Mutation {...mutation}>
            <span className={styles['activation']}>
                <Button
                    onClick={handleClick}
                    isActive={mutation.isPending}
                    disabled={mutation.isSuccess || mutation.isError}
                >
                    {message}
                </Button>
                {mutation.isSuccess && (
                    <Status variant="success">
                        <span>
                            An activation link has been sent to <b>{email}</b>
                        </span>
                    </Status>
                )}
            </span>
        </Mutation>
    )
}

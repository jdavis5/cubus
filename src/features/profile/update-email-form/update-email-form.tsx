import styles from './style.module.scss'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/common/components/button'
import { Form } from 'src/common/components/form'
import { FormStatus } from 'src/common/components/form-status'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { Status } from 'src/common/components/status'
import { formUserSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const createUpdateEmailFormSchema = (email: string) => {
    return z
        .object({
            newEmail: formUserSchema.shape.email
        })
        .refine((obj) => obj.newEmail !== email, {
            message: 'Enter a new email address',
            path: ['newEmail']
        })
}

type UpdateEmailFormInputs = z.infer<
    ReturnType<typeof createUpdateEmailFormSchema>
>

type UpdateEmailFormProps = {
    currentEmail: string
    onSuccess?: () => void
}

export const UpdateEmailForm = ({
    currentEmail,
    onSuccess
}: UpdateEmailFormProps) => {
    const formSchema = React.useMemo(() => {
        return createUpdateEmailFormSchema(currentEmail)
    }, [currentEmail])

    const mutation = trpc.account.requestEmailUpdate.useMutation()

    const form = useForm<UpdateEmailFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const [unconfirmedEmail, setUnconfirmedEmail] = React.useState<string>()

    const onSubmitHandler: SubmitHandler<UpdateEmailFormInputs> = async ({
        newEmail
    }) => {
        return mutation.mutate(
            {
                newEmail
            },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        setUnconfirmedEmail(newEmail)
                        return onSuccess?.()
                    }
                }
            }
        )
    }

    return (
        <Mutation {...mutation}>
            <div className={styles['update-email']}>
                {!unconfirmedEmail && (
                    <Status variant="info">
                        A confirmation link will be sent to the new email
                        address
                    </Status>
                )}
                <div className={styles['current-data']}>
                    <div>
                        <b>Current email</b>
                    </div>
                    <div>{currentEmail}</div>
                </div>
                {unconfirmedEmail ? (
                    <Status variant="success">
                        <span>
                            A confirmation link has been sent to{' '}
                            <b>{unconfirmedEmail}</b>
                        </span>
                    </Status>
                ) : (
                    <FormProvider {...form}>
                        <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
                            {mutation.data?.status === 'error' && (
                                <FormStatus
                                    message={mutation.data.error.message}
                                />
                            )}
                            <Form.Row>
                                <Form.Col>
                                    <InputField
                                        variant="email"
                                        name="newEmail"
                                        label="New email"
                                    />
                                </Form.Col>
                            </Form.Row>
                            <Form.Row>
                                <Form.Interaction>
                                    <Button
                                        type="submit"
                                        isActive={mutation.isPending}
                                    >
                                        Send confirmation link
                                    </Button>
                                </Form.Interaction>
                            </Form.Row>
                        </Form>
                    </FormProvider>
                )}
            </div>
        </Mutation>
    )
}

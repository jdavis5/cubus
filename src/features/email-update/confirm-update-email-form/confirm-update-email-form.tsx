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
import { formTextSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z.object({
    password: formTextSchema
})

type ConfirmUpdateEmailFormInputs = z.infer<typeof formSchema>

type ConfirmUpdateEmailFormProps = {
    userId: string
    newEmail: string
    token: string
    onSuccess?: () => void
    onExpired?: () => void
}

export const ConfirmUpdateEmailForm = ({
    userId,
    newEmail,
    token,
    onSuccess,
    onExpired
}: ConfirmUpdateEmailFormProps) => {
    const mutation = trpc.account.submitEmailUpdate.useMutation()

    const form = useForm<ConfirmUpdateEmailFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<
        ConfirmUpdateEmailFormInputs
    > = async ({ password }) => {
        return mutation.mutate(
            {
                userId,
                token,
                password
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
            <div className={styles['update']}>
                <div className={styles['update__intro']}>
                    <p>
                        Please complete this step to make the change to your
                        account.
                    </p>
                    <p>
                        Your email will be updated to:
                        <br />
                        <b>{newEmail}</b>
                    </p>
                </div>
                <FormProvider {...form}>
                    <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
                        {mutation.data?.status === 'error' && (
                            <FormStatus message={mutation.data.error.message} />
                        )}
                        <Form.Row>
                            <Form.Col>
                                <InputField
                                    variant="password"
                                    name="password"
                                    label="Password"
                                />
                            </Form.Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Interaction>
                                <Button
                                    type="submit"
                                    isActive={mutation.isPending}
                                >
                                    Update
                                </Button>
                            </Form.Interaction>
                        </Form.Row>
                    </Form>
                </FormProvider>
            </div>
        </Mutation>
    )
}

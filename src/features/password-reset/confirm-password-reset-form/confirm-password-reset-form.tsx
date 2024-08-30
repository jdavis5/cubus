import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/common/components/button'
import { Form } from 'src/common/components/form'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { formTextSchema, formUserSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z
    .object({
        password: formUserSchema.shape.password,
        confirmPassword: formTextSchema
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })

type ConfirmPasswordResetFormInputs = z.infer<typeof formSchema>

type ConfirmPasswordResetFormProps = {
    userId: string
    token: string
    dict: Array<string>
    onSuccess?: () => void
    onExpired?: () => void
}

export const ConfirmPasswordResetForm = ({
    userId,
    token,
    dict,
    onSuccess,
    onExpired
}: ConfirmPasswordResetFormProps) => {
    const mutation = trpc.account.submitPasswordReset.useMutation()

    const form = useForm<ConfirmPasswordResetFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<
        ConfirmPasswordResetFormInputs
    > = async ({ password }) => {
        return mutation.mutate(
            {
                userId,
                token,
                newPassword: password
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
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <Form.Row>
                        <Form.Col>
                            <InputField
                                variant="password"
                                name="password"
                                label="New password"
                                showStrength
                                dict={dict}
                            />
                        </Form.Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Col>
                            <InputField
                                variant="password"
                                name="confirmPassword"
                                label="Confirm password"
                            />
                        </Form.Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Interaction>
                            <Button type="submit" isActive={mutation.isPending}>
                                Submit
                            </Button>
                        </Form.Interaction>
                    </Form.Row>
                </Form>
            </FormProvider>
        </Mutation>
    )
}

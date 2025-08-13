import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/common/components/button'
import { Form } from 'src/common/components/form'
import { FormStatus } from 'src/common/components/form-status'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { formUserSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z.object({
    email: formUserSchema.shape.email
})

type PasswordResetFormInputs = z.infer<typeof formSchema>

type PasswordResetFormProps = {
    onSuccess?: () => void
}

export const PasswordResetForm = ({ onSuccess }: PasswordResetFormProps) => {
    const mutation = trpc.account.requestPasswordReset.useMutation()

    const form = useForm<PasswordResetFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<PasswordResetFormInputs> = async ({
        email
    }) => {
        return mutation.mutate(
            { email },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        return onSuccess?.()
                    }
                }
            }
        )
    }

    return (
        <Mutation {...mutation}>
            <p>
                Enter the email associated with your Cubus account and
                we&apos;ll send you a reset link.
            </p>
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    {mutation.data?.status === 'error' && (
                        <FormStatus message={mutation.data.error.message} />
                    )}
                    <Form.Row>
                        <Form.Col>
                            <InputField
                                variant="email"
                                name="email"
                                label="Email"
                            />
                        </Form.Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Interaction>
                            <Button type="submit" isActive={mutation.isPending}>
                                Send reset link
                            </Button>
                        </Form.Interaction>
                    </Form.Row>
                </Form>
            </FormProvider>
        </Mutation>
    )
}

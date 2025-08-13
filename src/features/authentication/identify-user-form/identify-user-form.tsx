import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { type AuthOptions } from 'src/common/authentication/auth-options'
import { Button } from 'src/common/components/button'
import { Container } from 'src/common/components/container'
import { Form } from 'src/common/components/form'
import { FormStatus } from 'src/common/components/form-status'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { formUserSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z.object({
    email: formUserSchema.shape.email
})

type IdentifyUserFormInputs = z.infer<typeof formSchema>

type IdentifyUserFormProps = {
    onSuccess?: (data: { authMethod: AuthOptions; email: string }) => void
}

export const IdentifyUserForm = ({ onSuccess }: IdentifyUserFormProps) => {
    const mutation = trpc.authentication.identifyUser.useMutation()

    const form = useForm<IdentifyUserFormInputs>({
        mode: 'onSubmit',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<IdentifyUserFormInputs> = ({
        email
    }) => {
        return mutation.mutate(
            { identifier: email },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        return onSuccess?.({
                            authMethod: data.data.method,
                            email
                        })
                    }
                }
            }
        )
    }

    return (
        <Mutation {...mutation}>
            <Container>
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
                                    autoFocus
                                />
                            </Form.Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Interaction>
                                <Button
                                    type="submit"
                                    isActive={mutation.isPending}
                                >
                                    Continue
                                </Button>
                            </Form.Interaction>
                        </Form.Row>
                    </Form>
                </FormProvider>
            </Container>
        </Mutation>
    )
}

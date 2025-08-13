import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/common/components/button'
import { ExternalLink } from 'src/common/components/external-link'
import { Form } from 'src/common/components/form'
import { FormStatus } from 'src/common/components/form-status'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { formUserSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z.object({
    email: formUserSchema.shape.email,
    password: formUserSchema.shape.password,
    firstName: formUserSchema.shape.firstName,
    surname: formUserSchema.shape.surname
})

type RegisterAccountFormInputs = z.infer<typeof formSchema>

type RegisterAccountFormProps = {
    onSuccess?: () => void
}

export const RegisterAccountForm = ({
    onSuccess
}: RegisterAccountFormProps) => {
    const mutation = trpc.registration.registerByEmail.useMutation()

    const form = useForm<RegisterAccountFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<RegisterAccountFormInputs> = async ({
        email,
        password,
        firstName,
        surname
    }) => {
        return mutation.mutate(
            {
                email,
                password,
                firstName,
                surname
            },
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
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    {mutation.data?.status === 'error' && (
                        <FormStatus message={mutation.data.error.message} />
                    )}
                    <Form.Row>
                        <Form.Col>
                            <InputField
                                variant="text"
                                name="firstName"
                                label="First name"
                            />
                        </Form.Col>
                        <Form.Col>
                            <InputField
                                variant="text"
                                name="surname"
                                label="Surname"
                            />
                        </Form.Col>
                    </Form.Row>
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
                        <Form.Col>
                            <InputField
                                variant="password"
                                name="password"
                                label="Password"
                                showStrength
                                dict={[
                                    form.getValues('email'),
                                    form.getValues('firstName'),
                                    form.getValues('surname')
                                ]}
                            />
                        </Form.Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Col>
                            <p>
                                By registering a new account you agree that you
                                have read our{' '}
                                <ExternalLink
                                    href={{
                                        pathname: '/privacy-policy'
                                    }}
                                >
                                    Privacy Policy
                                </ExternalLink>{' '}
                                and accept our{' '}
                                <ExternalLink
                                    href={{
                                        pathname: '/terms'
                                    }}
                                >
                                    Terms of Service
                                </ExternalLink>
                                .
                            </p>
                        </Form.Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Interaction>
                            <Button type="submit" isActive={mutation.isPending}>
                                Register
                            </Button>
                        </Form.Interaction>
                    </Form.Row>
                </Form>
            </FormProvider>
        </Mutation>
    )
}

import styles from './style.module.scss'
import React from 'react'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/common/components/button'
import { Form } from 'src/common/components/form'
import { FormStatus } from 'src/common/components/form-status'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { Section } from 'src/common/components/section'
import { formTextSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z.object({
    password: formTextSchema
})

type SignInFormInputs = z.infer<typeof formSchema>

type SignInFormProps = {
    email: string
    onReset: () => void
}

export const SignInForm = ({ email, onReset }: SignInFormProps) => {
    const router = useRouter()
    const mutation = trpc.authentication.loginUser.useMutation()

    const form = useForm<SignInFormInputs>({
        mode: 'onSubmit',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<SignInFormInputs> = ({ password }) => {
        return mutation.mutate(
            {
                email,
                password
            },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        router.push({
                            pathname: '/account'
                        })
                    }
                }
            }
        )
    }

    return (
        <Mutation {...mutation}>
            <Section>
                <div className={styles['login-intro']}>
                    <div>
                        <b>{email}</b>
                    </div>
                    <div className={styles['login-switch']}>
                        <span>Not you?</span>
                        <Button variant="link" onClick={onReset}>
                            Switch account
                        </Button>
                    </div>
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
                                    Sign in
                                </Button>
                            </Form.Interaction>
                        </Form.Row>
                    </Form>
                </FormProvider>
            </Section>
        </Mutation>
    )
}

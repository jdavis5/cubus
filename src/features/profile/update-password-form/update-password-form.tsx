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
import { Status } from 'src/common/components/status'
import { formTextSchema, formUserSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z
    .object({
        password: formTextSchema,
        newPassword: formUserSchema.shape.password
    })
    .refine((obj) => obj.password !== obj.newPassword, {
        message: 'Please choose a new password',
        path: ['newPassword']
    })

type UpdatePasswordFormInputs = z.infer<typeof formSchema>

type UpdatePasswordFormProps = {
    dict: Array<string>
}

export const UpdatePasswordForm = ({ dict }: UpdatePasswordFormProps) => {
    const router = useRouter()
    const mutation = trpc.account.updatePassword.useMutation()

    const form = useForm<UpdatePasswordFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<UpdatePasswordFormInputs> = ({
        password,
        newPassword
    }) => {
        return mutation.mutate(
            {
                password,
                newPassword
            },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        router.reload()
                    }
                }
            }
        )
    }

    return (
        <Mutation {...mutation}>
            <div className={styles['update-password']}>
                <Status variant="info">
                    You will need to log in again after updating your password
                </Status>
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
                                    label="Current Password"
                                />
                            </Form.Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Col>
                                <InputField
                                    variant="password"
                                    name="newPassword"
                                    label="New Password"
                                    showStrength
                                    dict={dict}
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

import React from 'react'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/common/components/button'
import { Form } from 'src/common/components/form'
import { FormStatus } from 'src/common/components/form-status'
import { Heading } from 'src/common/components/heading'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { Notice } from 'src/common/components/notice'
import { Section } from 'src/common/components/section'
import { formTextSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z.object({
    password: formTextSchema
})

type CloseAccountModalFormInputs = z.infer<typeof formSchema>

type CloseAccountModalFormProps = {
    onClose: () => void
}

export const CloseAccountModalForm = ({
    onClose
}: CloseAccountModalFormProps) => {
    const mutation = trpc.account.confirmRemoval.useMutation()

    const router = useRouter()

    const form = useForm<CloseAccountModalFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<CloseAccountModalFormInputs> = async ({
        password
    }) => {
        return mutation.mutate(
            {
                password
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

    const handleCloseModal = () => {
        onClose()
    }

    return (
        <Mutation {...mutation}>
            <Section>
                <Heading as="h2">Confirm account closure</Heading>
                <Notice variant="info">
                    This will permanently delete your account
                </Notice>
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
                        <Form.InteractionRow align="right">
                            <Button
                                variant="link"
                                onClick={handleCloseModal}
                                disabled={mutation.isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" isActive={mutation.isPending}>
                                Confirm
                            </Button>
                        </Form.InteractionRow>
                    </Form>
                </FormProvider>
            </Section>
        </Mutation>
    )
}

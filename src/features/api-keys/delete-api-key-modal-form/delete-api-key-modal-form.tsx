import styles from './style.module.scss'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/common/components/button'
import { Form } from 'src/common/components/form'
import { Heading } from 'src/common/components/heading'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { Section } from 'src/common/components/section'
import { usePageUrl } from 'src/common/hooks/page-url'
import { formTextSchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'

const formSchema = z.object({
    confirm: formTextSchema
})

type DeleteApiKeyModalFormInputs = z.infer<typeof formSchema>

type DeleteApiKeyModalFormProps = {
    keyId: string
    name: string
    onClose: () => void
    onSuccess?: () => void
}

export const DeleteApiKeyModalForm = ({
    keyId,
    name,
    onClose,
    onSuccess
}: DeleteApiKeyModalFormProps) => {
    const mutation = trpc.apiKeys.deleteKey.useMutation()

    const { replaceUrl } = usePageUrl()

    const form = useForm<DeleteApiKeyModalFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const isFormEnabled = form.watch('confirm') === name

    const onSubmitHandler: SubmitHandler<DeleteApiKeyModalFormInputs> = () => {
        return mutation.mutate(
            {
                id: keyId
            },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        replaceUrl()
                        return onSuccess?.()
                    }
                }
            }
        )
    }

    const handleCancel = () => {
        return onClose()
    }

    return (
        <Mutation {...mutation}>
            <Section>
                <Heading as="h2">Delete key confirmation</Heading>
                <p>
                    To delete this key, enter{' '}
                    <b className={styles['confirm-value']}>{name}</b> below.
                </p>
                <FormProvider {...form}>
                    <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
                        <Form.Row>
                            <Form.Col>
                                <InputField
                                    variant="text"
                                    name="confirm"
                                    placeholder="Enter the key name to continue"
                                />
                            </Form.Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Interaction align="right">
                                <Button
                                    variant="link"
                                    onClick={handleCancel}
                                    disabled={mutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    isActive={mutation.isPending}
                                    disabled={!isFormEnabled}
                                >
                                    Confirm
                                </Button>
                            </Form.Interaction>
                        </Form.Row>
                    </Form>
                </FormProvider>
            </Section>
        </Mutation>
    )
}

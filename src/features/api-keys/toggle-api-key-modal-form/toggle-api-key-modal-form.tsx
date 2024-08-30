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

type ToggleApiKeyModalFormInputs = z.infer<typeof formSchema>

type ToggleApiKeyModalFormProps = {
    keyId: string
    name: string
    isEnabled: boolean
    onClose: () => void
    onSuccess?: () => void
}

export const ToggleApiKeyModalForm = ({
    keyId,
    name,
    isEnabled,
    onClose,
    onSuccess
}: ToggleApiKeyModalFormProps) => {
    const mutation = trpc.apiKeys.toggleKey.useMutation()
    const { replaceUrl } = usePageUrl()

    const form = useForm<ToggleApiKeyModalFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const isFormEnabled = form.watch('confirm') === name

    const onSubmitHandler: SubmitHandler<ToggleApiKeyModalFormInputs> = () => {
        return mutation.mutate(
            {
                id: keyId,
                isEnabled: !isEnabled
            },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        replaceUrl()
                        onSuccess?.()
                    }
                }
            }
        )
    }

    const handleCancel = () => {
        onClose()
    }

    return (
        <Mutation {...mutation}>
            <Section>
                <Heading as="h2">
                    {isEnabled ? 'Disable' : 'Enable'} key confirmation
                </Heading>
                <p>
                    To {isEnabled ? 'disable' : 'enable'} this key, enter{' '}
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

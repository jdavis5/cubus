import styles from './style.module.scss'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { FaRegCopy } from 'react-icons/fa'
import { z } from 'zod'
import { Button } from 'src/common/components/button'
import { Form } from 'src/common/components/form'
import { FormStatus } from 'src/common/components/form-status'
import { Heading } from 'src/common/components/heading'
import { InputField } from 'src/common/components/input-field'
import { Mutation } from 'src/common/components/mutation'
import { Section } from 'src/common/components/section'
import { Status } from 'src/common/components/status'
import { usePageUrl } from 'src/common/hooks/page-url'
import { formApiKeySchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'
import { ApiKeyValue } from 'src/features/api-keys/api-key-value'

const formSchema = z.object({
    name: formApiKeySchema.shape.name
})

type GenerateApiKeyModalFormInputs = z.infer<typeof formSchema>

type GenerateApiKeyModalFormProps = {
    onClose: () => void
}

export const GenerateApiKeyModalForm = ({
    onClose
}: GenerateApiKeyModalFormProps) => {
    const mutation = trpc.apiKeys.generateKey.useMutation()
    const [clipboard, setClipboard] = React.useState<string>()
    const { replaceUrl } = usePageUrl()

    const form = useForm<GenerateApiKeyModalFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema)
    })

    const onSubmitHandler: SubmitHandler<
        GenerateApiKeyModalFormInputs
    > = async (values) => {
        return mutation.mutate({
            name: values.name
        })
    }

    const handleCloseModal = () => {
        onClose()
        replaceUrl()
    }

    const handleCopyText = (value: string) => async () => {
        await navigator.clipboard.writeText(value)
        setClipboard(value)
    }

    if (mutation.status === 'success' && mutation.data?.status === 'success') {
        return (
            <Section>
                <Heading as="h2">Your new key</Heading>
                <Status variant="info">
                    You cannot access this value after the window is closed
                </Status>
                <div className={styles['result']}>
                    <p>
                        <b>{mutation.variables.name}</b>
                    </p>
                    <ApiKeyValue value={mutation.data.data.key} />
                </div>
                <div className={styles['interaction']}>
                    {clipboard && (
                        <Status variant="success">Copied to clipboard</Status>
                    )}
                    <Button
                        icon={<FaRegCopy />}
                        onClick={handleCopyText(mutation.data.data.key)}
                    >
                        Copy
                    </Button>
                    <Button onClick={handleCloseModal}>Close</Button>
                </div>
            </Section>
        )
    }

    return (
        <Mutation {...mutation}>
            <Section>
                <Heading as="h2">Generate a new key</Heading>
                <FormProvider {...form}>
                    <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
                        {mutation.data?.status === 'error' && (
                            <FormStatus message={mutation.data.error.message} />
                        )}
                        <Form.Row>
                            <Form.Col>
                                <InputField
                                    variant="text"
                                    name="name"
                                    label="Name"
                                    hint="Give your key a name to help you identify it"
                                />
                            </Form.Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Interaction align="right">
                                <Button
                                    variant="link"
                                    onClick={handleCloseModal}
                                    disabled={mutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    isActive={mutation.isPending}
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

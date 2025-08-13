import React from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ApiKey, type Plan } from 'prisma/main/schemas'
import {
    FormProvider,
    type SubmitHandler,
    useFieldArray,
    useForm
} from 'react-hook-form'
import { z } from 'zod'
import { ActionContainer } from 'src/common/components/action-container'
import { Button } from 'src/common/components/button'
import { Form } from 'src/common/components/form'
import { FormError } from 'src/common/components/form-error'
import { Heading } from 'src/common/components/heading'
import { Mutation } from 'src/common/components/mutation'
import { Section } from 'src/common/components/section'
import { Status } from 'src/common/components/status'
import { Switch } from 'src/common/components/switch'
import { formApiKeySchema } from 'src/common/schemas'
import { trpc } from 'src/common/trpc.client'
import { ApiKeyDetails } from 'src/features/api-keys/api-key-details'

const createUpdatePlanFormSchema = (limit: number) => {
    return z
        .object({
            keys: z.array(
                z.object({
                    id: formApiKeySchema.shape.id,
                    isEnabled: formApiKeySchema.shape.isEnabled
                })
            )
        })
        .refine(
            (obj) => obj.keys.filter((key) => key.isEnabled).length <= limit,
            {
                message: `Select a maximum of ${limit} keys`,
                path: ['keys']
            }
        )
}

type UpdatePlanFormInputs = z.infer<
    ReturnType<typeof createUpdatePlanFormSchema>
>

type UpdatePlanFormProps = {
    keys: Array<ApiKey>
    plan: Plan
    onSuccess?: (data: { plan: Plan; keys: Array<ApiKey> }) => void
}

export const UpdatePlanForm = ({
    keys,
    plan,
    onSuccess
}: UpdatePlanFormProps) => {
    const formSchema = React.useMemo(() => {
        return createUpdatePlanFormSchema(plan.limit)
    }, [plan.limit])

    const mutation = trpc.plan.modify.useMutation()

    const form = useForm<UpdatePlanFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema),
        defaultValues: {
            keys
        }
    })

    const keyFields = useFieldArray({
        control: form.control,
        name: 'keys',
        keyName: 'fieldId'
    })

    const keysError = form.formState.errors.keys

    const onSubmitHandler: SubmitHandler<UpdatePlanFormInputs> = async ({
        keys
    }) => {
        return mutation.mutate(
            {
                planOption: plan.option,
                keys
            },
            {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        onSuccess?.({
                            plan: data.data.plan,
                            keys: data.data.apiKeys
                        })
                    }
                }
            }
        )
    }

    return (
        <Mutation {...mutation}>
            <Section>
                <Heading as="h2">Review your keys</Heading>
                {!keys.length ? (
                    <Status variant="info">
                        Nothing to review! Submit to continue.
                    </Status>
                ) : (
                    <Status variant="info">
                        A maximum of {plan.limit} keys can be enabled with this
                        plan.
                    </Status>
                )}
                <FormProvider {...form}>
                    <Form onSubmit={form.handleSubmit(onSubmitHandler)}>
                        <>
                            {keyFields.fields.map((field, index) => {
                                const keyItem = keys.find(
                                    (keyItem) => keyItem.id === field.id
                                )
                                if (!keyItem) {
                                    return null
                                }
                                return (
                                    <ActionContainer
                                        key={field.fieldId}
                                        content={<ApiKeyDetails {...keyItem} />}
                                        actions={
                                            <Switch
                                                defaultChecked={
                                                    keyItem.isEnabled
                                                }
                                                {...form.register(
                                                    `keys.${index}.isEnabled`
                                                )}
                                            />
                                        }
                                        isError={Boolean(keysError)}
                                    />
                                )
                            })}
                            <FormError name="keys" mode="onValid" />
                        </>
                        <Form.Interaction>
                            <Button type="submit" isActive={mutation.isPending}>
                                Submit
                            </Button>
                            {!mutation.isPending && (
                                <Link
                                    shallow
                                    replace
                                    href={{
                                        pathname: '/account/plan'
                                    }}
                                >
                                    Cancel
                                </Link>
                            )}
                        </Form.Interaction>
                    </Form>
                </FormProvider>
            </Section>
        </Mutation>
    )
}

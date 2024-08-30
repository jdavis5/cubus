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
import { Profile } from 'src/features/profile/profile.type'

const formSchema = z.object({
    firstName: formUserSchema.shape.firstName,
    surname: formUserSchema.shape.surname
})

type UpdateProfileFormInputs = z.infer<typeof formSchema>

type UpdateProfileFormProps = Pick<Profile, 'firstName' | 'surname'> & {
    onSuccess?: () => void
}

export const UpdateProfileForm = ({
    firstName,
    surname,
    onSuccess
}: UpdateProfileFormProps) => {
    const mutation = trpc.account.updateProfile.useMutation()

    const form = useForm<UpdateProfileFormInputs>({
        mode: 'onTouched',
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName,
            surname
        }
    })

    const onSubmitHandler: SubmitHandler<UpdateProfileFormInputs> = ({
        firstName,
        surname
    }) => {
        return mutation.mutate(
            {
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
                    </Form.Row>
                    <Form.Row>
                        <Form.Col>
                            <InputField
                                variant="text"
                                name="surname"
                                label="Surname"
                            />
                        </Form.Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Interaction>
                            <Button type="submit" isActive={mutation.isPending}>
                                Update
                            </Button>
                        </Form.Interaction>
                    </Form.Row>
                </Form>
            </FormProvider>
        </Mutation>
    )
}

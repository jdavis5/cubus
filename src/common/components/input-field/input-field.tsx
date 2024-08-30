import styles from './style.module.scss'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
    BasicInput,
    type BasicInputProps
} from 'src/common/components/basic-input'
import { ErrorTooltip } from 'src/common/components/error-tooltip'
import {
    PasswordInput,
    type PasswordInputProps
} from 'src/common/components/password-input'

const options = {
    email: {
        Component: BasicInput,
        bind: (props: BasicInputProps) => ({ ...props, type: 'email' })
    },
    text: {
        Component: BasicInput,
        bind: (props: BasicInputProps) => ({ ...props, type: 'text' })
    },
    password: {
        Component: PasswordInput,
        bind: (props: PasswordInputProps) => ({ ...props })
    }
} as const

type InputFieldVariants =
    | ({ variant: 'text' } & BasicInputProps)
    | ({ variant: 'email' } & BasicInputProps)
    | ({ variant: 'password' } & PasswordInputProps)

type InputFieldProps = {
    name: string
    label?: string
    hint?: string
} & InputFieldVariants

export const InputField = ({
    variant,
    name,
    label,
    hint,
    ...props
}: InputFieldProps) => {
    const { register, getFieldState, formState } = useFormContext()
    const { error } = getFieldState(name, formState)
    const { Component, bind } = options[variant]

    return (
        <div className={styles['field']}>
            <label>
                {label && (
                    <div className={styles['field__header']}>{label}</div>
                )}
                {hint && <div className={styles['field__hint']}>{hint}</div>}
                <Component
                    {...bind({ ...props })}
                    {...register(name)}
                    isError={Boolean(error)}
                />
            </label>
            {error?.message && <ErrorTooltip>{error.message}</ErrorTooltip>}
        </div>
    )
}

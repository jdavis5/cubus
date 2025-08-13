import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'
import { useFormContext, useWatch } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Input } from 'src/common/components/input'
import { InputContainer } from 'src/common/components/input-container'
import { PasswordStrength } from 'src/common/components/password-strength'

export type PasswordInputProps = React.ComponentPropsWithRef<'input'> & {
    dict?: Array<string> | undefined
    showStrength?: boolean
    isError?: boolean
}

export const PasswordInput = React.forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(
    (
        {
            dict,
            showStrength = false,
            isError = false,
            name = 'password',
            disabled = false,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = React.useState<boolean>(false)

        const { control } = useFormContext()
        const currentValue: string =
            useWatch({
                control,
                name,
                defaultValue: ''
            }) ?? ''

        const handleToggleVisibility = () => {
            setIsVisible((prev) => (disabled ? prev : !prev))
        }

        return (
            <>
                <InputContainer isError={isError}>
                    <div
                        className={clsx(
                            styles['input'],
                            disabled && styles['input--disabled']
                        )}
                    >
                        <Input
                            {...props}
                            disabled={disabled}
                            name={name}
                            type={isVisible ? 'text' : 'password'}
                            ref={ref}
                        />
                        <div className={styles['extras']}>
                            <div
                                className={styles['extras__icon']}
                                onClick={handleToggleVisibility}
                                title={
                                    isVisible
                                        ? 'Hide password'
                                        : 'Show password'
                                }
                            >
                                {isVisible ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                    </div>
                </InputContainer>
                {showStrength && (
                    <PasswordStrength password={currentValue} dict={dict} />
                )}
            </>
        )
    }
)

// Updates the displayName after using forwardRef
PasswordInput.displayName = 'PasswordInput'

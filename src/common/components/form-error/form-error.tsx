import styles from './style.module.scss'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FaExclamationTriangle } from 'react-icons/fa'

type FormErrorProps = {
    name: string
    mode?: 'onChange' | 'onValid'
    enabled?: boolean
    scrollOnError?: boolean
}

export const FormError = ({
    name,
    mode = 'onChange',
    enabled = true,
    scrollOnError = true
}: FormErrorProps) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const form = useFormContext()
    const { error } = form.getFieldState(name, form.formState)

    React.useEffect(() => {
        if (enabled) {
            if (
                scrollOnError &&
                error &&
                ref.current &&
                !form.formState.isDirty
            ) {
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                })
            }
        }
    }, [form, enabled, error, ref, scrollOnError])

    React.useEffect(() => {
        const subscription = form.watch(() => {
            if (enabled) {
                if (mode === 'onValid' && error) {
                    return form.trigger(name)
                }
                return form.clearErrors(name)
            }
        })
        return () => subscription.unsubscribe()
    }, [error, form, enabled, name, mode])

    if (!error) {
        return null
    }

    return (
        <div className={styles['form-error']} ref={ref}>
            <div className={styles['error']}>
                <span className={styles['error__icon']}>
                    <FaExclamationTriangle />
                </span>
                <span className={styles['error__message']}>
                    {error.message}
                </span>
            </div>
        </div>
    )
}

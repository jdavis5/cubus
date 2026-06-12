import styles from './form.module.scss'
import React from 'react'
import { FormCol } from './form-col'
import { FormInteractionRow } from './form-interaction-row'
import { FormRow } from './form-row'

type FormProps = React.ComponentPropsWithRef<'form'>

const FormBase = React.forwardRef<HTMLFormElement, FormProps>(
    ({ children, ...props }, ref) => {
        return (
            <form {...props} className={styles['form']} ref={ref}>
                {children}
            </form>
        )
    }
)

// Update the displayName after using forwardRef.
FormBase.displayName = 'FormBase'

// Create a compound component.
export const Form = Object.assign(FormBase, {
    Col: FormCol,
    InteractionRow: FormInteractionRow,
    Row: FormRow
})

// Update the displayName for the compound component.
Form.displayName = 'Form'

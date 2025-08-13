import styles from './style.module.scss'
import React from 'react'
import { FormCol } from './form-col'
import { FormInteraction } from './form-interaction'
import { FormRow } from './form-row'

type FormProps = React.ComponentPropsWithRef<'form'>

const FormElement = React.forwardRef<HTMLFormElement, FormProps>(
    ({ children, ...props }, ref) => {
        return (
            <form {...props} className={styles['form']} ref={ref}>
                {children}
            </form>
        )
    }
)

// Updates the displayName after using forwardRef
FormElement.displayName = 'Form'

// Create a compound component without errors
export const Form = Object.assign({}, FormElement, {
    Col: FormCol,
    Interaction: FormInteraction,
    Row: FormRow
})

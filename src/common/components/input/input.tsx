import styles from './style.module.scss'
import React from 'react'

type InputProps = React.ComponentPropsWithRef<'input'>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type = 'text', ...props }, ref) => {
        return (
            <input
                {...props}
                type={type}
                ref={ref}
                autoComplete="off"
                className={styles['input']}
            />
        )
    }
)

// Updates the displayName after using forwardRef
Input.displayName = 'Input'

import styles from './switch.module.scss'
import React from 'react'

type SwitchProps = React.ComponentPropsWithRef<'input'> & {
    isChecked?: boolean
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
    ({ ...props }, ref) => {
        return (
            <input
                {...props}
                type="checkbox"
                role="switch"
                className={styles['switch']}
                ref={ref}
            />
        )
    }
)

// Update the displayName after using forwardRef.
Switch.displayName = 'Switch'

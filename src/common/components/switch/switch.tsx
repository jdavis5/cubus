import styles from './style.module.scss'
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

// Updates the displayName after using forwardRef
Switch.displayName = 'Switch'

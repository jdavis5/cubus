import React from 'react'
import { Input } from 'src/common/components/input'
import { InputContainer } from 'src/common/components/input-container'

export type BasicInputProps = React.ComponentPropsWithRef<'input'> & {
    isError?: boolean
}

export const BasicInput = React.forwardRef<HTMLInputElement, BasicInputProps>(
    ({ isError = false, type = 'text', ...props }, ref) => {
        return (
            <InputContainer isError={isError}>
                <Input {...props} type={type} ref={ref} />
            </InputContainer>
        )
    }
)

// Updates the displayName after using forwardRef
BasicInput.displayName = 'BasicInput'

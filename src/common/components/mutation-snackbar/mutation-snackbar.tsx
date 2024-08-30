import React from 'react'
import { Snackbar } from 'src/common/components/snackbar'

type MutationSnackbarProps = {
    error: { message: string } | null
    status: 'idle' | 'pending' | 'error' | 'success'
    reset: () => void
}

export const MutationSnackbar = ({
    error,
    status,
    reset
}: MutationSnackbarProps) => {
    if (status !== 'error') {
        return null
    }

    return <Snackbar onClose={reset} message={error?.message} />
}

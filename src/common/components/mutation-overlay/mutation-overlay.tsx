import { MutationSnackbar } from 'src/common/components/mutation-snackbar'
import { Overlay } from 'src/common/components/overlay'

type MutationOverlayProps = {
    error: { message: string } | null
    status: 'idle' | 'pending' | 'error' | 'success'
    reset: () => void
}

export const MutationOverlay = ({
    error,
    status,
    reset
}: MutationOverlayProps) => {
    if (status === 'pending') {
        return <Overlay variant="page-loading" />
    }
    return <MutationSnackbar error={error} status={status} reset={reset} />
}

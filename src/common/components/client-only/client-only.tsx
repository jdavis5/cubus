import React from 'react'
import { useRouter } from 'next/router'

type ClientOnlyProps = React.PropsWithChildren

export const ClientOnly = ({ children }: ClientOnlyProps) => {
    const router = useRouter()
    const [isMounted, setIsMounted] = React.useState<boolean>(false)

    React.useEffect(() => {
        setIsMounted(router.isReady)
    }, [router.isReady])

    if (!isMounted) {
        return null
    }

    return <>{children}</>
}

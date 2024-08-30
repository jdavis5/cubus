import { useRouter } from 'next/router'
import { FaSignOutAlt } from 'react-icons/fa'
import { Button } from 'src/common/components/button'
import { IconItem } from 'src/common/components/icon-item'
import { Mutation } from 'src/common/components/mutation'
import { trpc } from 'src/common/trpc.client'

type SignOutButtonProps = {
    variant?: 'normal' | 'link'
}
export const SignOutButton = ({ variant = 'normal' }: SignOutButtonProps) => {
    const router = useRouter()
    const mutation = trpc.authentication.logoutUser.useMutation()

    const handleSignOut = () => {
        return mutation.mutate(undefined, {
            onSuccess: (data) => {
                if (data.status === 'success') {
                    router.reload()
                }
            }
        })
    }

    return (
        <Mutation variant="overlay" {...mutation}>
            <Button variant={variant} onClick={handleSignOut}>
                <IconItem icon={<FaSignOutAlt />}>Sign out</IconItem>
            </Button>
        </Mutation>
    )
}

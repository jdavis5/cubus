import { useAuthenticatedSession } from 'src/common/authentication/session'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { AccountActivationEmailButton } from 'src/features/account-activation/account-activation-email-button'

export const AccountActivationOverview = () => {
    const session = useAuthenticatedSession()

    return (
        <Section>
            <Heading as="h2">Activate your account</Heading>
            <p>
                To gain full access to Cubus&apos;s features you must first
                activate your account.
            </p>
            <p>
                Click the button below to receive an activation link by email.
            </p>
            <p>
                <AccountActivationEmailButton
                    email={session.user.email}
                    message="Send activation link"
                />
            </p>
        </Section>
    )
}

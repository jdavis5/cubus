import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { AccountActivationOverview } from 'src/features/account-activation/account-activation-overview'
import { CloseAccountModalButton } from 'src/features/account-closure/close-account-modal-button'

export const WelcomeOverview = () => {
    return (
        <Container>
            <Section>
                <Heading as="h1">Welcome to Cubus</Heading>
                <AccountActivationOverview />
                <Section>
                    <Heading as="h2">Close your account</Heading>
                    <p>
                        <CloseAccountModalButton />
                    </p>
                </Section>
            </Section>
        </Container>
    )
}

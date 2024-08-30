import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { AccountHomeMenu } from 'src/features/account-home/account-home-menu'

export const AccountHomeContent = () => {
    return (
        <Container constrict>
            <Section>
                <Heading as="h1">Your Account</Heading>
                <AccountHomeMenu />
            </Section>
        </Container>
    )
}

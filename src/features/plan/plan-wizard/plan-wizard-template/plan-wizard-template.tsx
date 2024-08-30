import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import {
    type ProgressStep,
    ProgressSteps
} from 'src/common/components/progress-steps'
import { Section } from 'src/common/components/section'

const progressSteps = [
    { id: 'select', title: 'Select' } as const,
    { id: 'update', title: 'Update' } as const,
    { id: 'done', title: 'Done' } as const
] satisfies Array<ProgressStep>

type PlanWizardTemplateProps = React.PropsWithChildren<{
    step: (typeof progressSteps)[number]['id']
    title: string
}>

export const PlanWizardTemplate = ({
    children,
    step,
    title
}: PlanWizardTemplateProps) => {
    return (
        <Container constrict>
            <Section>
                <ProgressSteps steps={progressSteps} currentId={step} />
                <Heading as="h1">{title}</Heading>
                {children}
            </Section>
        </Container>
    )
}

import { InteractionRow } from 'src/common/components/interaction-row'

type FormInteractionProps = React.PropsWithChildren<{
    align?: 'left' | 'right'
}>

export const FormInteraction = ({
    align = 'left',
    children
}: FormInteractionProps) => {
    return <InteractionRow align={align}>{children}</InteractionRow>
}

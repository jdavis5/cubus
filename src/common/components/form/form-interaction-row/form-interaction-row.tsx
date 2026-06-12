import styles from './form-interaction-row.module.scss'
import clsx from 'clsx'

type FormInteractionRowProps = React.PropsWithChildren<{
    align?: 'left' | 'right'
}>

export const FormInteractionRow = ({
    align = 'left',
    children
}: FormInteractionRowProps) => {
    return (
        <div
            className={clsx(
                styles['interaction'],
                styles[`interaction--${align}`]
            )}
        >
            {children}
        </div>
    )
}

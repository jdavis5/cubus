import styles from './style.module.scss'
import clsx from 'clsx'

type InteractionRowProps = React.PropsWithChildren<{
    align?: 'left' | 'right'
}>

export const InteractionRow = ({
    align = 'left',
    children
}: InteractionRowProps) => {
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

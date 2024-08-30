import styles from './style.module.scss'
import clsx from 'clsx'

type ActionContainerToggleButtonProps = {
    isActive: boolean
    onClick?: () => void
}

export const ActionContainerToggleButton = ({
    isActive,
    onClick
}: ActionContainerToggleButtonProps) => {
    const handleClick = () => {
        return onClick?.()
    }

    return (
        <button
            type="button"
            className={clsx(
                styles['button'],
                isActive && styles['button--active']
            )}
            onClick={handleClick}
        >
            {isActive ? 'Close' : 'Edit'}
        </button>
    )
}

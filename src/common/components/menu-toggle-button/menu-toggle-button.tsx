import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'

type MenuToggleButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    onClick: () => void
    isActive?: boolean
    title?: string
}

export const MenuToggleButton = ({
    onClick,
    isActive = false,
    title = 'Menu'
}: MenuToggleButtonProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(isActive)

    React.useEffect(() => {
        setIsOpen(isActive)
    }, [isActive])

    const handleClick = () => {
        setIsOpen((prev) => !prev)
        onClick()
    }

    return (
        <button
            type="button"
            title={title}
            className={clsx(styles['menu'], isOpen && styles['menu--open'])}
            onClick={handleClick}
        >
            <div className={styles['menu-icon']}>
                <span className={styles['menu-icon__line']}></span>
            </div>
        </button>
    )
}

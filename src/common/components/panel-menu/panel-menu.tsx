import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'
import { useOnOutsideClick } from 'src/common/hooks/on-outside-click'

const transitionSpeed = Number(styles['transition-speed']) ?? 200

export type PanelMenuProps = React.PropsWithChildren<{
    icon: JSX.Element
    value?: string
    align?: 'left' | 'right'
    onOpen?: () => void
}>

export const PanelMenu = ({
    children,
    icon,
    value,
    align,
    onOpen
}: PanelMenuProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const ref = useOnOutsideClick<HTMLDivElement>(() => setIsOpen(false))

    React.useEffect(() => {
        if (isOpen && onOpen) {
            return onOpen()
        }
    }, [isOpen, onOpen])

    const handleToggleVisibility = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div ref={ref} className={styles['panel']}>
            <div
                className={clsx(styles['panel-toggle'])}
                onClick={handleToggleVisibility}
            >
                <div className={styles['panel-toggle__icon']}>{icon}</div>
                {value && (
                    <div className={styles['panel-toggle__text']}>{value}</div>
                )}
            </div>
            <CSSTransition
                nodeRef={ref}
                in={isOpen}
                timeout={transitionSpeed}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                <div
                    className={clsx(
                        styles['panel-drawer'],
                        styles[`panel-drawer--${align}`]
                    )}
                >
                    {children}
                </div>
            </CSSTransition>
        </div>
    )
}

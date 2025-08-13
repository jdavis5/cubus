import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'
import { Spinner } from 'src/common/components/spinner'

type ButtonProps = React.PropsWithChildren<
    React.ComponentPropsWithoutRef<'button'> & {
        isActive?: boolean
        icon?: JSX.Element
        variant?: 'normal' | 'link' | 'pill' | 'pill-outline'
    }
>

export const Button = ({
    children,
    isActive = false,
    icon,
    variant = 'normal',
    ...props
}: ButtonProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(isActive)

    React.useEffect(() => {
        setIsLoading(isActive)
    }, [isActive])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) {
            setIsLoading(true)
            props.onClick(event)
            setIsLoading(false)
        }
    }

    return (
        <button
            type="button"
            {...props}
            className={clsx(
                variant === 'link' && styles['link-button'],
                variant === 'normal' && styles['button'],
                variant === 'pill' && [
                    styles['button'],
                    styles['button--pill']
                ],
                variant === 'pill-outline' && [
                    styles['button'],
                    styles['button--pill'],
                    styles['button--outline']
                ]
            )}
            disabled={props.disabled || isLoading}
            onClick={handleClick}
        >
            {icon && <span className={styles['icon']}>{icon}</span>}
            {children}
            {isLoading && <Spinner align="right" />}
        </button>
    )
}

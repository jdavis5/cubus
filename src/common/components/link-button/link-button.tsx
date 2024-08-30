import styles from './style.module.scss'
import React from 'react'
import Link, { type LinkProps } from 'next/link'
import clsx from 'clsx'
import { FaArrowRight } from 'react-icons/fa'
import { IconItem } from 'src/common/components/icon-item'

type LinkButtonProps = React.PropsWithChildren<LinkProps> & {
    variant?: 'normal' | 'cta' | 'pill' | 'pill-cta'
}

export const LinkButton = ({
    children,
    variant = 'normal',
    ...props
}: LinkButtonProps) => {
    const contents = ['cta', 'pill-cta'].includes(variant) ? (
        <IconItem icon={<FaArrowRight />} variant="right">
            {children}
        </IconItem>
    ) : (
        children
    )

    return (
        <Link
            {...props}
            className={clsx(
                styles['button'],
                variant === 'pill' && styles['button--pill'],
                variant === 'pill-cta' && styles['button--pill']
            )}
        >
            {contents}
        </Link>
    )
}

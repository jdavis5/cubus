import styles from './style.module.scss'
import React from 'react'
import clsx from 'clsx'

const headings = {
    h1: 'heading-1',
    h2: 'heading-2',
    h3: 'heading-3',
    h4: 'heading-4',
    h5: 'heading-5',
    h6: 'heading-6'
} as const

type HeadingProps = React.PropsWithChildren<{
    as: keyof typeof headings
}> &
    React.HTMLAttributes<HTMLHeadingElement>

export const Heading = ({ as: Tag, children, ...props }: HeadingProps) => {
    return (
        <Tag {...props} className={clsx(styles[headings[Tag]])}>
            {children}
        </Tag>
    )
}

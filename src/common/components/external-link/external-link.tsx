import styles from './style.module.scss'
import React from 'react'
import Link, { LinkProps } from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

type ExternalLinkProps = React.PropsWithChildren<LinkProps>

export const ExternalLink = ({ href, children }: ExternalLinkProps) => {
    return (
        <Link
            href={href}
            target="_blank"
            title="Opens in a new window or tab"
            className={styles['link']}
        >
            {children}
            <FaExternalLinkAlt />
        </Link>
    )
}

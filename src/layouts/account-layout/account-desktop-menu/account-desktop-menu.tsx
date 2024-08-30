import styles from './style.module.scss'
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { FaCubes, FaLink, FaUser } from 'react-icons/fa'
import { IconItem } from 'src/common/components/icon-item'
import { LinkList } from 'src/common/components/link-list'

const links = [
    {
        pathname: '/account/profile',
        value: 'Profile',
        icon: FaUser
    },
    {
        pathname: '/account/api-access',
        value: 'API Access',
        icon: FaLink
    },
    {
        pathname: '/account/plan',
        value: 'Plan',
        icon: FaCubes
    }
]

export const AccountDesktopMenu = () => {
    return (
        <div className={styles['menu']}>
            <nav className={styles['nav']}>
                <ul className={styles['nav-list']}>
                    <LinkList
                        items={links}
                        renderItem={(
                            { icon: Icon, pathname, value },
                            isActive
                        ) => (
                            <li
                                key={pathname}
                                className={clsx(
                                    styles['nav-list__item'],
                                    isActive && styles['nav-list__item--active']
                                )}
                            >
                                <Link href={{ pathname }}>
                                    <IconItem icon={<Icon />}>{value}</IconItem>
                                </Link>
                            </li>
                        )}
                    />
                </ul>
            </nav>
        </div>
    )
}

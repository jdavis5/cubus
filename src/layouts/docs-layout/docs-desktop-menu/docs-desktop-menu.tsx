import styles from './style.module.scss'
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { LinkList } from 'src/common/components/link-list'

const links = [
    {
        section: 'Schemas',
        links: [{ pathname: '/docs/api/v1', value: 'API v1' }]
    },
    {
        section: 'Guides',
        links: [{ pathname: '/docs/api/using-the-api', value: 'Using the API' }]
    },
    {
        section: 'Resources',
        links: [
            { pathname: '/docs/api/error-reference', value: 'Error reference' }
        ]
    }
]

export const DocsDesktopMenu = () => {
    return (
        <aside className={styles['menu']}>
            <div className={styles['menu__content']}>
                {links.map(({ section, links }) => (
                    <div key={section} className={styles['menu-group']}>
                        <div className={styles['menu-group__heading']}>
                            {section}
                        </div>
                        <ul className={styles['nav-list']}>
                            <LinkList
                                items={links}
                                renderItem={({ pathname, value }, isActive) => (
                                    <li
                                        key={pathname}
                                        className={clsx(
                                            styles['nav-list__item'],
                                            isActive &&
                                                styles[
                                                    'nav-list__item--current'
                                                ]
                                        )}
                                    >
                                        <Link href={{ pathname }}>{value}</Link>
                                    </li>
                                )}
                            />
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    )
}

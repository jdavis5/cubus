import styles from './style.module.scss'
import Link from 'next/link'
import { LinkList } from 'src/common/components/link-list'

const links = [
    {
        section: 'Company',
        links: [
            { pathname: '/about', value: 'About' },
            {
                pathname: '/terms',
                value: 'Terms'
            },
            { pathname: '/privacy-policy', value: 'Privacy Policy' },
            { pathname: '/cookies', value: 'Cookies' }
        ]
    },
    {
        section: 'Resources',
        links: [
            { pathname: '/docs', value: 'Documentation' },
            { pathname: '/docs/api', value: 'API' }
        ]
    },
    {
        section: 'Support',
        links: [
            { pathname: '/help', value: 'Help' },
            { pathname: '/help/contact', value: 'Contact' }
        ]
    }
]

export const BaseFooter = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer__content']}>
                <nav className={styles['nav']}>
                    {links.map(({ section, links }) => (
                        <div key={section} className={styles['nav-column']}>
                            <div className={styles['nav-column__heading']}>
                                {section}
                            </div>
                            <ul className={styles['col-list']}>
                                <LinkList
                                    items={links}
                                    renderItem={({ pathname, value }) => (
                                        <li
                                            className={styles['col-list__item']}
                                        >
                                            <Link href={{ pathname }}>
                                                {value}
                                            </Link>
                                        </li>
                                    )}
                                />
                            </ul>
                        </div>
                    ))}
                </nav>
                <div className={styles['copyright']}>
                    &copy; Copyright Cubus
                </div>
            </div>
        </footer>
    )
}

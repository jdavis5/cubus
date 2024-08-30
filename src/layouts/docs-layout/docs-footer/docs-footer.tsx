import styles from './style.module.scss'
import Link from 'next/link'
import { LinkList } from 'src/common/components/link-list'
import { LinkLogo } from 'src/common/components/link-logo'

const links = [
    { pathname: '/terms', value: 'Terms' },
    { pathname: '/privacy-policy', value: 'Privacy Policy' },
    { pathname: '/cookies', value: 'Cookies' },
    { pathname: '/help', value: 'Help' }
]
export const DocsFooter = () => {
    return (
        <footer className={styles['footer']}>
            <nav>
                <LinkLogo variant="small" href={{ pathname: '/' }} />
                <ul className={styles['list']}>
                    <LinkList
                        items={links}
                        renderItem={({ pathname, value }) => (
                            <li className={styles['list__item']}>
                                <Link href={{ pathname }}>{value}</Link>
                            </li>
                        )}
                    />
                </ul>
            </nav>
        </footer>
    )
}

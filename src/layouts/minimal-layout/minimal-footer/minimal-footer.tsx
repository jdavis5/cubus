import styles from './style.module.scss'
import Link from 'next/link'
import { LinkList } from 'src/common/components/link-list'

const links = [
    { pathname: '/terms', value: 'Terms' },
    { pathname: '/privacy-policy', value: 'Privacy Policy' },
    { pathname: '/cookies', value: 'Cookies' },
    { pathname: '/help', value: 'Help' }
]

export const MinimalFooter = () => {
    return (
        <footer className={styles['footer']}>
            <nav>
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

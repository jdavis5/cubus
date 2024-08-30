import styles from './style.module.scss'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { IconItem } from 'src/common/components/icon-item'
import { LinkList } from 'src/common/components/link-list'

const links = [
    {
        pathname: '/account/profile',
        value: 'Profile',
        description: 'Manage your profile'
    },
    {
        pathname: '/account/api-access',
        value: 'API Access',
        description: 'Manage your API keys'
    },
    {
        pathname: '/account/plan',
        value: 'Plan',
        description: 'Make changes to your plan'
    }
]

export const AccountHomeMenu = () => {
    return (
        <nav className={styles['menu']}>
            <LinkList
                items={links}
                renderItem={({ pathname, value, description }) => (
                    <Link href={{ pathname }}>
                        <div className={styles['menu-item-container']}>
                            <div className={styles['menu-item']}>
                                <div className={styles['menu-item__value']}>
                                    <IconItem
                                        variant="right"
                                        icon={<FaArrowRight />}
                                    >
                                        {value}
                                    </IconItem>
                                </div>
                                <div
                                    className={styles['menu-item__description']}
                                >
                                    {description}
                                </div>
                            </div>
                            <div className={styles['menu-item-edge']}></div>
                        </div>
                    </Link>
                )}
            />
        </nav>
    )
}

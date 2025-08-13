import styles from './style.module.scss'
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { FaCubes, FaLink, FaUser } from 'react-icons/fa'
import { CSSTransition } from 'react-transition-group'
import { IconItem } from 'src/common/components/icon-item'
import { LinkList } from 'src/common/components/link-list'
import { useBreakpointRange } from 'src/common/hooks/breakpoint-range'
import { useAccountLayoutContext } from 'src/layouts/account-layout/account-layout.context'

const transitionSpeed = Number(styles['transition-speed']) ?? 250

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

export const AccountMobileMenu = () => {
    const context = useAccountLayoutContext()
    const [isOpen, setIsOpen] = context.menu
    const isToggleVisible = useBreakpointRange('lg')
    const menuRef = React.useRef<HTMLDivElement>(null)

    /**
     * Closes the menu if the menu toggle disappears
     */
    React.useEffect(() => {
        if (isToggleVisible === false) {
            setIsOpen(false)
        }
    }, [isToggleVisible, setIsOpen])

    return (
        <CSSTransition nodeRef={menuRef} in={isOpen} timeout={transitionSpeed}>
            <div ref={menuRef} className={styles['menu']}>
                <nav className={styles['nav']}>
                    <ul className={styles['nav-list']}>
                        <LinkList
                            items={links}
                            renderItem={(
                                { icon: Icon, pathname, value },
                                isActive
                            ) => (
                                <li
                                    className={clsx(
                                        styles['nav-list__item'],
                                        isActive &&
                                            styles['nav-list__item--active']
                                    )}
                                >
                                    <Link href={{ pathname }}>
                                        <IconItem icon={<Icon />}>
                                            {value}
                                        </IconItem>
                                    </Link>
                                </li>
                            )}
                        />
                    </ul>
                </nav>
            </div>
        </CSSTransition>
    )
}

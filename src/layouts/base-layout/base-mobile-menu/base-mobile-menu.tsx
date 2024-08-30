import styles from './style.module.scss'
import React from 'react'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group'
import { useSession } from 'src/common/authentication/session'
import { Divider } from 'src/common/components/divider'
import { LinkButton } from 'src/common/components/link-button'
import { LinkList } from 'src/common/components/link-list'
import { Overlay } from 'src/common/components/overlay'
import { useBreakpointRange } from 'src/common/hooks/breakpoint-range'
import { useBaseLayoutContext } from 'src/layouts/base-layout/base-layout.context'

const transitionSpeed = Number(styles['transition-speed']) ?? 250

const links = [
    {
        section: 'Company',
        links: [
            { pathname: '/about', value: 'About Cubus' },
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

export const BaseMobileMenu = () => {
    const session = useSession()
    const menuRef = React.useRef<HTMLElement>(null)
    const context = useBaseLayoutContext()
    const [isOpen, setIsOpen] = context.menu
    const isToggleVisible = useBreakpointRange('md')

    /**
     * Closes the menu if the menu toggle disappears
     */
    React.useEffect(() => {
        if (isToggleVisible === false) {
            setIsOpen(false)
        }
    }, [isToggleVisible, setIsOpen])

    return (
        <CSSTransition
            nodeRef={menuRef}
            in={isOpen}
            timeout={transitionSpeed}
            mountOnEnter={true}
            unmountOnExit={true}
        >
            <Overlay variant="content">
                <aside ref={menuRef} className={styles['menu']}>
                    {session.user && (
                        <header>
                            <LinkButton
                                variant="pill-cta"
                                href={{ pathname: '/account' }}
                            >
                                View account
                            </LinkButton>
                        </header>
                    )}
                    <div className={styles['menu__content']}>
                        {links.map(({ section, links }) => (
                            <div key={section} className={styles['menu-group']}>
                                <div className={styles['menu-group__heading']}>
                                    {section}
                                </div>
                                <ul className={styles['nav-list']}>
                                    <LinkList
                                        items={links}
                                        renderItem={({ pathname, value }) => (
                                            <li
                                                key={pathname}
                                                className={
                                                    styles['nav-list__item']
                                                }
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
                        {!session.user && (
                            <footer>
                                <LinkButton
                                    variant="pill"
                                    href={{ pathname: '/sign-in' }}
                                >
                                    Sign in
                                </LinkButton>
                                <Divider value="or" />
                                <LinkButton
                                    variant="pill"
                                    href={{ pathname: '/register' }}
                                >
                                    Register
                                </LinkButton>
                            </footer>
                        )}
                    </div>
                </aside>
            </Overlay>
        </CSSTransition>
    )
}

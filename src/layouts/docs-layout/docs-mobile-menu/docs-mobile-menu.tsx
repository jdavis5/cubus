import styles from './style.module.scss'
import React from 'react'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group'
import { LinkButton } from 'src/common/components/link-button'
import { LinkList } from 'src/common/components/link-list'
import { Overlay } from 'src/common/components/overlay'
import { useBreakpointRange } from 'src/common/hooks/breakpoint-range'
import { useDocsLayoutContext } from 'src/layouts/docs-layout/docs-layout.context'

const transitionSpeed = Number(styles['transition-speed']) ?? 250

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

export const DocsMobileMenu = () => {
    const menuRef = React.useRef<HTMLElement>(null)
    const context = useDocsLayoutContext()
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
                    <header>
                        <LinkButton
                            variant="pill"
                            href={{ pathname: '/register' }}
                        >
                            Register
                        </LinkButton>
                    </header>
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
                    </div>
                </aside>
            </Overlay>
        </CSSTransition>
    )
}

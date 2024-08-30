import styles from './style.module.scss'
import React from 'react'
import { LinkButton } from 'src/common/components/link-button'
import { LinkLogo } from 'src/common/components/link-logo'
import { MenuToggleButton } from 'src/common/components/menu-toggle-button'
import { useDocsLayoutContext } from 'src/layouts/docs-layout/docs-layout.context'

export const DocsHeader = () => {
    const context = useDocsLayoutContext()
    const [isOpen, setIsOpen] = context.menu

    return (
        <header className={styles['header']}>
            <div className={styles['header-content']}>
                <LinkLogo
                    variant="large"
                    text="Docs"
                    href={{ pathname: '/docs' }}
                />
                <div className={styles['header-content__items']}>
                    <div className={styles['header-cta']}>
                        <LinkButton
                            variant="pill"
                            href={{ pathname: '/register' }}
                        >
                            Register
                        </LinkButton>
                    </div>
                    <div className={styles['menu-toggle']}>
                        <MenuToggleButton
                            onClick={() => {
                                setIsOpen((prev) => !prev)
                            }}
                            isActive={isOpen}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

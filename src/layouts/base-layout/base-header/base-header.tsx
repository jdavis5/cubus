import styles from './style.module.scss'
import React from 'react'
import { LinkLogo } from 'src/common/components/link-logo'
import { MenuToggleButton } from 'src/common/components/menu-toggle-button'
import { useBaseLayoutContext } from 'src/layouts/base-layout/base-layout.context'
import { BaseNavbar } from 'src/layouts/base-layout/base-navbar'

export const BaseHeader = () => {
    const context = useBaseLayoutContext()
    const [isOpen, setIsOpen] = context.menu

    const handleToggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <>
            <header className={styles['header']}>
                <LinkLogo variant="large" href={{ pathname: '/' }} />
                <BaseNavbar />
                <div className={styles['menu-nav']}>
                    <MenuToggleButton
                        onClick={handleToggleMenu}
                        isActive={isOpen}
                    />
                </div>
            </header>
        </>
    )
}

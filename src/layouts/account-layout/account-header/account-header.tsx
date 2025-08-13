import styles from './style.module.scss'
import React from 'react'
import { useAuthenticatedSession } from 'src/common/authentication/session'
import { LinkLogo } from 'src/common/components/link-logo'
import { MenuToggleButton } from 'src/common/components/menu-toggle-button'
import { useAccountLayoutContext } from 'src/layouts/account-layout/account-layout.context'
import { AccountMobileMenu } from 'src/layouts/account-layout/account-mobile-menu'
import { AccountPanelMenu } from 'src/layouts/account-layout/account-panel-menu'

type AccountHeaderProps = React.PropsWithChildren

export const AccountHeader = ({ children }: AccountHeaderProps) => {
    const session = useAuthenticatedSession()
    const isRestricted = !session.user.emailVerifiedAt
    const context = useAccountLayoutContext()
    const [isOpen, setIsOpen] = context.menu

    return (
        <header className={styles['header']}>
            <div className={styles['primary']}>
                <div className={styles['primary__logo']}>
                    <LinkLogo variant="small" href={{ pathname: '/account' }} />
                </div>
                {!isRestricted && (
                    <div className={styles['primary__mobile']}>
                        <MenuToggleButton
                            onClick={() => setIsOpen((prev) => !prev)}
                            isActive={isOpen}
                        />
                    </div>
                )}
                <div className={styles['primary__nav']}>
                    {children}
                    <AccountPanelMenu
                        align="right"
                        onOpen={() => setIsOpen(false)}
                    />
                </div>
            </div>
            {!isRestricted && <AccountMobileMenu />}
        </header>
    )
}

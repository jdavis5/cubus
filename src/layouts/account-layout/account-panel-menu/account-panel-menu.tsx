import styles from './style.module.scss'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import {
    PanelMenu,
    type PanelMenuProps
} from 'src/common/components/panel-menu'
import { SignOutButton } from 'src/features/authentication/sign-out-button'

type AccountPanelMenuProps = Omit<PanelMenuProps, 'icon' | 'suspend'>

export const AccountPanelMenu = (props: AccountPanelMenuProps) => {
    return (
        <PanelMenu icon={<FaUserCircle />} {...props}>
            <nav className={styles['nav']}>
                <ul className={styles['nav-list']}>
                    <li className={styles['nav-list__item']}>
                        <SignOutButton />
                    </li>
                </ul>
            </nav>
        </PanelMenu>
    )
}

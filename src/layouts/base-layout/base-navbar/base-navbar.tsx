import styles from './style.module.scss'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'src/common/authentication/session'
import { LinkButton } from 'src/common/components/link-button'

export const BaseNavbar = () => {
    const session = useSession()

    return (
        <nav className={styles['navbar']}>
            <ul className={styles['navbar__content']}>
                {session.user && (
                    <LinkButton
                        variant="pill-cta"
                        href={{ pathname: '/account' }}
                    >
                        View account
                    </LinkButton>
                )}
                {!session.user && (
                    <>
                        <li className={styles['nav-item']}>
                            <Link
                                className={styles['nav-link']}
                                href={{
                                    pathname: '/sign-in'
                                }}
                            >
                                Sign in
                            </Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <LinkButton
                                variant="pill"
                                href={{
                                    pathname: '/register'
                                }}
                            >
                                Register
                            </LinkButton>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

import styles from './style.module.scss'
import React from 'react'

type SectionProps = React.PropsWithChildren

export const Section = ({ children }: SectionProps) => {
    return <section className={styles['section']}>{children}</section>
}

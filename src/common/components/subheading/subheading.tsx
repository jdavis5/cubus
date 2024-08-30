import styles from './style.module.scss'

type SubheadingProps = React.PropsWithChildren

export const Subheading = ({ children }: SubheadingProps) => {
    return <div className={styles['subhead']}>{children}</div>
}

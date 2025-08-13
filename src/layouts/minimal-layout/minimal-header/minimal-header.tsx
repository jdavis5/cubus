import styles from './style.module.scss'
import { LinkLogo } from 'src/common/components/link-logo'

export const MinimalHeader = () => {
    return (
        <header className={styles['header']}>
            <LinkLogo variant="small" href={{ pathname: '/' }} />
        </header>
    )
}

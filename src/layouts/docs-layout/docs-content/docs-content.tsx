import styles from './docs-content.module.scss'
import { DocsMobileMenu } from 'src/layouts/docs-layout/docs-mobile-menu'

export const DocsContent = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={styles['content']}>
            <DocsMobileMenu />
            <main>{children}</main>
        </div>
    )
}

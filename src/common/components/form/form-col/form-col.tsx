import styles from './form-col.module.scss'

type FormColProps = React.PropsWithChildren

export const FormCol = ({ children }: FormColProps) => {
    return <div className={styles['form-col']}>{children}</div>
}

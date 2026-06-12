import styles from './form-row.module.scss'

type FormRowProps = React.PropsWithChildren

export const FormRow = ({ children }: FormRowProps) => {
    return <div className={styles['form-row']}>{children}</div>
}

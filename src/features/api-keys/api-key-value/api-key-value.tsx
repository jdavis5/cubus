import styles from './style.module.scss'

type ApiKeyValueProps = {
    value: string
}

export const ApiKeyValue = ({ value }: ApiKeyValueProps) => {
    return <code className={styles['key']}>{value}</code>
}

import styles from './api-key-value.module.scss'

type ApiKeyValueProps = {
    value: string
}

export const ApiKeyValue = ({ value }: ApiKeyValueProps) => {
    return <code className={styles['key']}>{value}</code>
}

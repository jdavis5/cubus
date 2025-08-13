import styles from './style.module.scss'
import { FaExclamationTriangle } from 'react-icons/fa'
import { formatPrice } from 'src/common/formatting'

type PlanComparisonTableProps = Record<
    'current' | 'selected',
    {
        name: string
        price: string
        limit: number
    }
> & {
    enabledKeysCount: number
}

export const PlanComparisonTable = ({
    current,
    selected,
    enabledKeysCount
}: PlanComparisonTableProps) => {
    return (
        <div className={styles['comparison-container']}>
            <table className={styles['comparison']}>
                <thead>
                    <tr>
                        <th scope="row"></th>
                        <th scope="col">Before</th>
                        <th scope="col">After</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td scope="col">{current.name}</td>
                        <td scope="col">{selected.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cost per month</th>
                        <td>{formatPrice(current.price)}</td>
                        <td>{formatPrice(selected.price)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Key limit</th>
                        <td>{current.limit}</td>
                        <td>
                            <span>{selected.limit}</span>
                            {enabledKeysCount > selected.limit && (
                                <span className={styles['warn']}>
                                    <FaExclamationTriangle />
                                </span>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

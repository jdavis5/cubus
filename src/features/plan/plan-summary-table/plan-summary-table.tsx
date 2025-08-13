import styles from './style.module.scss'

type PlanSummaryTableProps = {
    name: string
    price: string
    limit: number
    enabledKeysCount: number
}

export const PlanSummaryTable = ({
    name,
    price,
    limit,
    enabledKeysCount
}: PlanSummaryTableProps) => {
    return (
        <div className={styles['summary-container']}>
            <h2>Plan summary</h2>
            <table className={styles['summary']}>
                <thead>
                    <tr>
                        <th scope="row">Plan</th>
                        <td>{name}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Cost per month</th>
                        <td>{price}</td>
                    </tr>
                    <tr>
                        <th scope="row">Key limit</th>
                        <td>{limit}</td>
                    </tr>
                    <tr>
                        <th scope="row">Active keys</th>
                        <td>{enabledKeysCount}</td>
                    </tr>
                    <tr>
                        <th scope="row">Available keys</th>
                        <td>{limit - enabledKeysCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

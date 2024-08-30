import styles from './style.module.scss'
import Link from 'next/link'
import { type Plan } from 'prisma/main/schemas'
import { FaCubes } from 'react-icons/fa'

type PlanStatusProps = {
    plan: Plan
    totalKeysCount: number
    enabledKeysCount: number
}

export const PlanStatus = ({
    plan,
    totalKeysCount,
    enabledKeysCount
}: PlanStatusProps) => {
    return (
        <div className={styles['status']}>
            <div className={styles['status__icon']}>
                <FaCubes />
            </div>
            <div className={styles['content']}>
                <span className={styles['content__link']}>
                    <Link href={{ pathname: '/account/plan' }}>
                        {plan.name}
                    </Link>
                </span>
                <span className={styles['content__generated']}>
                    {totalKeysCount} Keys
                </span>
                <span className={styles['content__enabled']}>
                    {enabledKeysCount}/{plan.limit} Enabled
                </span>
            </div>
        </div>
    )
}

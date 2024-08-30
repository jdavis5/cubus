import styles from './style.module.scss'
import React from 'react'
import { type Plan } from 'prisma/main/schemas'
import { PlanCard } from 'src/features/plan/plan-card'

type PlanCardListProps = {
    current: Plan
    available: Array<Plan>
}

export const PlanCardList = ({ current, available }: PlanCardListProps) => {
    return (
        <div className={styles['plan-options']}>
            {available.map((item) => (
                <PlanCard
                    key={item.id}
                    option={item.option}
                    name={item.name}
                    price={item.price}
                    limit={item.limit}
                    isCurrent={item.id === current.id}
                />
            ))}
        </div>
    )
}

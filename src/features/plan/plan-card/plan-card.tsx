import styles from './style.module.scss'
import React from 'react'
import { type Plan } from 'prisma/main/schemas'
import { FaCheck } from 'react-icons/fa'
import { IconItem } from 'src/common/components/icon-item'
import { LinkButton } from 'src/common/components/link-button'
import { Status } from 'src/common/components/status'
import { formatPrice } from 'src/common/formatting'

type PlanCardProps = Pick<Plan, 'name' | 'price' | 'option' | 'limit'> & {
    isCurrent: boolean
}

export const PlanCard = ({
    name,
    price,
    option,
    limit,
    isCurrent = false
}: PlanCardProps) => {
    return (
        <div className={styles['card-container']}>
            <div className={styles['plan-card']}>
                <div className={styles['plan']}>
                    <div className={styles['plan__name']}>{name}</div>
                    <div className={styles['plan__cost']}>
                        <div className={styles['cost']}>
                            <span className={styles['cost__price']}>
                                {formatPrice(price)}
                            </span>
                            <span className={styles['cost__unit']}>
                                per month
                            </span>
                        </div>
                    </div>
                    <div className={styles['plan__select']}>
                        {isCurrent ? (
                            <Status variant="info">
                                This is your current plan
                            </Status>
                        ) : (
                            <LinkButton
                                variant="cta"
                                shallow
                                replace
                                href={{
                                    pathname: '/account/plan',
                                    query: {
                                        option: option.toLowerCase()
                                    }
                                }}
                            >
                                Select this plan
                            </LinkButton>
                        )}
                    </div>
                </div>
                <div className={styles['plan-details']}>
                    <div className={styles['plan-details__heading']}>
                        What&apos;s included?
                    </div>
                    <ul className={styles['details-list']}>
                        <li className={styles['details-list__item']}>
                            <IconItem icon={<FaCheck />}>
                                {limit} API keys
                            </IconItem>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles['edge']}></div>
        </div>
    )
}

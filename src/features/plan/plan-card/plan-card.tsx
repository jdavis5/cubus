import styles from './plan-card.module.scss'
import React from 'react'
import { type Plan } from 'prisma/main/models'
import { FaCheck } from 'react-icons/fa'
import { IconItem } from 'src/common/components/icon-item'
import { LinkButton } from 'src/common/components/link-button'
import { Notice } from 'src/common/components/notice'
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
                            <Notice variant="info">
                                This is your current plan
                            </Notice>
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
                        What's included?
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

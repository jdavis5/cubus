import styles from './style.module.scss'
import React from 'react'
import { type ApiKey } from 'prisma/main/schemas'
import {
    formatGeneratedAtDate,
    formatLastUsedAtDate
} from 'src/features/api-keys/api-keys.formatting'

type ApiKeyDetailsProps = Pick<
    ApiKey,
    'name' | 'generatedAt' | 'lastUsedAt' | 'isEnabled' | 'maskedKey'
>

export const ApiKeyDetails = ({
    name,
    generatedAt,
    lastUsedAt,
    isEnabled,
    maskedKey
}: ApiKeyDetailsProps) => {
    return (
        <div className={styles['overview']}>
            <div className={styles['overview-title']}>
                {!isEnabled && (
                    <div className={styles['overview-title__status']}>
                        Disabled
                    </div>
                )}
                <div className={styles['overview-title__name']}>{name}</div>
            </div>
            <div className={styles['overview__value']}>{maskedKey}</div>
            <div className={styles['overview__meta']}>
                Created {formatGeneratedAtDate(generatedAt)}. Last used{' '}
                {formatLastUsedAtDate(lastUsedAt)}.
            </div>
        </div>
    )
}

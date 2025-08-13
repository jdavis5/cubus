import React from 'react'
import { type ApiKey, type Plan } from 'prisma/main/schemas'
import { PlanWizardSelect } from './plan-wizard-select'
import { PlanWizardUpdate } from './plan-wizard-update'
import { usePageUrl } from 'src/common/hooks/page-url'

type PlanWizardProps = {
    current: Plan
    available: Array<Plan>
    keys: Array<ApiKey>
}

export const PlanWizard = ({ current, available, keys }: PlanWizardProps) => {
    const { searchParams } = usePageUrl()
    const option = searchParams.get('option')

    const matchedPlan = available.find(
        (item) => item.option === option?.toUpperCase()
    )

    if (matchedPlan) {
        return (
            <PlanWizardUpdate
                current={current}
                selected={matchedPlan}
                keys={keys}
            />
        )
    }

    return <PlanWizardSelect current={current} available={available} />
}

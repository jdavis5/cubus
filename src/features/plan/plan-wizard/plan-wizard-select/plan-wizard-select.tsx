import React from 'react'
import { type Plan } from 'prisma/main/schemas'
import { PlanCardList } from 'src/features/plan/plan-card-list'
import { PlanWizardTemplate } from 'src/features/plan/plan-wizard/plan-wizard-template'

type PlanWizardSelectProps = {
    current: Plan
    available: Array<Plan>
}

export const PlanWizardSelect = ({
    current,
    available
}: PlanWizardSelectProps) => {
    return (
        <PlanWizardTemplate step="select" title="Select a plan">
            <PlanCardList current={current} available={available} />
        </PlanWizardTemplate>
    )
}

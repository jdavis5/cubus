import React from 'react'
import { type ApiKey, type Plan } from 'prisma/main/schemas'
import { LinkButton } from 'src/common/components/link-button'
import { Section } from 'src/common/components/section'
import { PlanComparisonTable } from 'src/features/plan/plan-comparison-table'
import { PlanSummaryTable } from 'src/features/plan/plan-summary-table'
import { PlanWizardTemplate } from 'src/features/plan/plan-wizard/plan-wizard-template'
import { UpdatePlanForm } from 'src/features/plan/update-plan-form'

type PlanWizardUpdateProps = {
    current: Plan
    selected: Plan
    keys: Array<ApiKey>
}

export const PlanWizardUpdate = ({
    current,
    selected,
    keys
}: PlanWizardUpdateProps) => {
    const [stepData, setStepData] = React.useState<
        | { step: 'update' }
        | {
              step: 'complete'
              plan: Plan
              keys: Array<ApiKey>
          }
    >({ step: 'update' })

    if (stepData.step === 'complete') {
        return (
            <PlanWizardTemplate step="done" title="Your plan has been updated">
                <PlanSummaryTable
                    name={stepData.plan.name}
                    price={stepData.plan.price}
                    limit={stepData.plan.limit}
                    enabledKeysCount={
                        stepData.keys.filter((key) => key.isEnabled).length
                    }
                />
                <p>
                    <LinkButton
                        variant="cta"
                        href={{
                            pathname: '/account/api-access'
                        }}
                    >
                        Review your keys
                    </LinkButton>
                </p>
            </PlanWizardTemplate>
        )
    }

    return (
        <PlanWizardTemplate step="update" title="Update your plan">
            <PlanComparisonTable
                current={{
                    name: current.name,
                    price: current.price,
                    limit: current.limit
                }}
                selected={{
                    name: selected.name,
                    price: selected.price,
                    limit: selected.limit
                }}
                enabledKeysCount={keys.filter((key) => key.isEnabled).length}
            />
            <Section>
                <UpdatePlanForm
                    keys={keys}
                    plan={selected}
                    onSuccess={(data) =>
                        setStepData({
                            step: 'complete',
                            plan: data.plan,
                            keys: data.keys
                        })
                    }
                />
            </Section>
        </PlanWizardTemplate>
    )
}

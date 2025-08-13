import React from 'react'
import { type ApiKey, type Plan } from 'prisma/main/schemas'
import { ActionContainer } from 'src/common/components/action-container'
import { ExternalLink } from 'src/common/components/external-link'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { ApiKeyDetails } from 'src/features/api-keys/api-key-details'
import { DeleteApiKeyModalButton } from 'src/features/api-keys/delete-api-key-modal-button'
import { GenerateApiKeyModalButton } from 'src/features/api-keys/generate-api-key-modal-button'
import { ToggleApiKeyModalSwitch } from 'src/features/api-keys/toggle-api-key-modal-switch'
import { PlanStatus } from 'src/features/plan/plan-status'

type ApiKeysOverviewProps = {
    plan: Plan
    keys: Array<ApiKey>
}

export const ApiKeysOverview = ({ plan, keys }: ApiKeysOverviewProps) => {
    const activeKeys = keys.filter((key) => key.isEnabled)

    return (
        <>
            <Section>
                <Heading as="h2">Overview</Heading>
                <p>
                    API keys are used to access the Cubus API. See the{' '}
                    <ExternalLink href={{ pathname: '/docs/api' }}>
                        API reference
                    </ExternalLink>{' '}
                    for details.
                    <br />
                    The amount of keys available can be modified by updating
                    your plan.
                    <br />
                </p>
            </Section>
            <Section>
                <Heading as="h2">Your keys</Heading>
                <PlanStatus
                    plan={plan}
                    totalKeysCount={keys.length}
                    enabledKeysCount={activeKeys.length}
                />
                {plan.limit - keys.length > 0 && <GenerateApiKeyModalButton />}
                <>
                    {keys.map((key) => {
                        const isDisabled =
                            activeKeys.length >= plan.limit && !key.isEnabled
                        return (
                            <ActionContainer
                                key={key.id}
                                content={<ApiKeyDetails {...key} />}
                                actions={
                                    <>
                                        <ToggleApiKeyModalSwitch
                                            keyId={key.id}
                                            name={key.name}
                                            checked={key.isEnabled}
                                            disabled={isDisabled}
                                        />
                                        <DeleteApiKeyModalButton
                                            keyId={key.id}
                                            name={key.name}
                                        />
                                    </>
                                }
                            />
                        )
                    })}
                </>
            </Section>
        </>
    )
}

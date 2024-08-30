import styles from './style.module.scss'
import React from 'react'
import { ActionContainer } from 'src/common/components/action-container'
import { ActionContainerToggleButton } from 'src/common/components/action-container-toggle-button'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { usePageUrl } from 'src/common/hooks/page-url'
import { type Profile } from 'src/features/profile/profile.type'
import { UpdateEmailForm } from 'src/features/profile/update-email-form'
import { UpdatePasswordForm } from 'src/features/profile/update-password-form'
import { UpdateProfileForm } from 'src/features/profile/update-profile-form'

type ProfileReducerState = {
    target: 'profile' | 'email' | 'password' | 'none'
    status: 'inactive' | 'modifying' | 'complete'
}

type ProfileReducerActions =
    | { type: 'reset' }
    | { type: 'set_complete'; value: ProfileReducerState['target'] }
    | { type: 'change_focus'; value: ProfileReducerState['target'] }

const useProfileOverviewReducer = () => {
    const reducer = React.useReducer(
        (
            state: ProfileReducerState,
            action: ProfileReducerActions
        ): ProfileReducerState => {
            switch (action.type) {
                case 'reset': {
                    return { target: 'none', status: 'inactive' }
                }
                case 'set_complete': {
                    return { target: action.value, status: 'complete' }
                }
                case 'change_focus': {
                    return action.value !== state.target
                        ? { target: action.value, status: 'modifying' }
                        : { target: 'none', status: 'inactive' }
                }
                default: {
                    throw new Error('Invalid reducer action')
                }
            }
        },
        { target: 'none', status: 'inactive' }
    )
    return reducer
}

const actions = {
    reset: () => {
        return {
            type: 'reset'
        } satisfies ProfileReducerActions
    },
    complete: (target: ProfileReducerState['target']) => {
        return {
            type: 'set_complete',
            value: target
        } satisfies ProfileReducerActions
    },
    focus: (target: ProfileReducerState['target']) => {
        return {
            type: 'change_focus',
            value: target
        } satisfies ProfileReducerActions
    }
}

type ProfileOverviewProps = Pick<Profile, 'firstName' | 'surname' | 'email'>

export const ProfileOverview = (props: ProfileOverviewProps) => {
    const { replaceUrl } = usePageUrl()
    const [state, dispatch] = useProfileOverviewReducer()

    const handleSuccess = () => {
        dispatch(actions.reset())
        replaceUrl()
    }

    return (
        <Section>
            <Heading as="h2">Update your details</Heading>
            <ActionContainer
                content={
                    <div className={styles['item-overview']}>
                        {state.target === 'profile' ? (
                            <UpdateProfileForm
                                firstName={props.firstName}
                                surname={props.surname}
                                onSuccess={handleSuccess}
                            />
                        ) : (
                            <>
                                <div className={styles['header']}>Name</div>
                                <div className={styles['content']}>
                                    <p>
                                        {props.firstName} {props.surname}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                }
                actions={
                    <ActionContainerToggleButton
                        isActive={state.target === 'profile'}
                        onClick={() => dispatch(actions.focus('profile'))}
                    />
                }
            />
            <ActionContainer
                content={
                    <div className={styles['item-overview']}>
                        {state.target === 'email' ? (
                            <UpdateEmailForm
                                currentEmail={props.email}
                                onSuccess={() =>
                                    dispatch(actions.complete('email'))
                                }
                            />
                        ) : (
                            <>
                                <div className={styles['header']}>Email</div>
                                <div className={styles['content']}>
                                    <p>{props.email}</p>
                                </div>
                            </>
                        )}
                    </div>
                }
                actions={
                    <ActionContainerToggleButton
                        isActive={state.target === 'email'}
                        onClick={() => dispatch(actions.focus('email'))}
                    />
                }
            />
            <ActionContainer
                content={
                    <div className={styles['item-overview']}>
                        {state.target === 'password' ? (
                            <UpdatePasswordForm
                                dict={[
                                    props.email,
                                    props.firstName,
                                    props.surname
                                ]}
                            />
                        ) : (
                            <>
                                <div className={styles['header']}>Password</div>
                                <div className={styles['content']}>
                                    <p>{Array(10).join('*')}</p>
                                </div>
                            </>
                        )}
                    </div>
                }
                actions={
                    <ActionContainerToggleButton
                        isActive={state.target === 'password'}
                        onClick={() => dispatch(actions.focus('password'))}
                    />
                }
            />
        </Section>
    )
}

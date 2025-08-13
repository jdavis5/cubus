import styles from './style.module.scss'
import clsx from 'clsx'

export type ProgressStep = {
    id: string
    title: string
}

type ProgressStepsProps<T extends Array<ProgressStep>> = {
    steps: T
    currentId: T[number]['id']
}

export const ProgressSteps = <T extends Array<ProgressStep>>({
    steps,
    currentId
}: ProgressStepsProps<T>) => {
    let isCompletedStep = true

    return (
        <ol className={styles['progress-bar']}>
            {steps.map((item) => {
                const isCurrentStep = item.id === currentId
                if (isCurrentStep) {
                    isCompletedStep = false
                }
                if (isCurrentStep || isCompletedStep) {
                    return (
                        <li
                            key={item.id}
                            className={clsx(
                                styles['progress-step'],
                                styles['progress-step--complete'],
                                isCurrentStep &&
                                    styles['progress-step--current']
                            )}
                        >
                            <span className={styles['progress-step__title']}>
                                {item.title}
                            </span>
                        </li>
                    )
                }
                return (
                    <li key={item.id} className={styles['progress-step']}>
                        <span className={styles['progress-step__title']}>
                            {item.title}
                        </span>
                    </li>
                )
            })}
        </ol>
    )
}

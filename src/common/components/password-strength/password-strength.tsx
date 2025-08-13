import styles from './style.module.scss'
import React from 'react'
import zxcvbn from 'zxcvbn'

const scores = {
    0: '',
    1: 'Very weak',
    2: 'Weak',
    3: 'Good',
    4: 'Strong'
} as const

type PasswordStrengthProps = {
    password: string
    dict?: Array<string> | undefined
}

export const PasswordStrength = ({ password, dict }: PasswordStrengthProps) => {
    const [score, setScore] = React.useState<keyof typeof scores>(0)

    React.useEffect(() => {
        setScore(() => {
            const score = zxcvbn(password, dict).score
            return !password || score > 1 ? score : 1
        })
    }, [password, dict])

    return (
        <div className={styles['password-strength']}>
            <div
                className={styles['strength-rating']}
                data-strength={score}
                title={scores[score]}
            >
                {Array.from({ length: 4 }, (_, key) => (
                    <div key={key} className={styles['strength-block']}></div>
                ))}
            </div>
        </div>
    )
}

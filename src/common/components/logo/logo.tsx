import styles from './style.module.scss'
import { LogoSvg } from 'src/common/components/logo-svg'

type CommonLogoProps = {
    text?: string
}

type LargeLogoProps = CommonLogoProps

const LargeLogo = ({ text }: LargeLogoProps) => {
    return (
        <div className={styles['logo']}>
            <LogoSvg />
            <div className={styles['logo-content']}>
                <div className={styles['logo-content__brand']}>Cubus</div>
                {text && (
                    <div className={styles['logo-content__text']}>{text}</div>
                )}
            </div>
        </div>
    )
}

type SmallLogoProps = CommonLogoProps

const SmallLogo = ({ text }: SmallLogoProps) => {
    return (
        <div className={styles['logo']}>
            <LogoSvg />
            <div className={styles['logo-content']}>
                {text && (
                    <div className={styles['logo-content__text']}>{text}</div>
                )}
            </div>
        </div>
    )
}

const options = {
    large: LargeLogo,
    small: SmallLogo
} as const

type LogoProps =
    | ({ variant: 'large' } & LargeLogoProps)
    | ({ variant: 'small' } & SmallLogoProps)

export const Logo = ({ variant, ...props }: LogoProps) => {
    const Component = options[variant]
    return <Component {...props} />
}

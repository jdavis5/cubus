import styles from './style.module.scss'
import Link, { type LinkProps } from 'next/link'
import { Logo } from 'src/common/components/logo'

type CommonLinkLogoProps = LinkProps & {
    text?: string
}

type LargeLinkLogoProps = CommonLinkLogoProps

const LargeLinkLogo = ({ text, ...props }: LargeLinkLogoProps) => {
    return (
        <div className={styles['link-logo']}>
            <Link {...props}>
                <Logo variant="large" text={text} />
            </Link>
        </div>
    )
}

type SmallLinkLogoProps = CommonLinkLogoProps

const SmallLinkLogo = ({ text, ...props }: SmallLinkLogoProps) => {
    return (
        <div className={styles['link-logo']}>
            <Link {...props}>
                <Logo variant="small" text={text} />
            </Link>
        </div>
    )
}

const options = {
    large: LargeLinkLogo,
    small: SmallLinkLogo
}

type LinkLogoProps =
    | ({ variant: 'large' } & LargeLinkLogoProps)
    | ({ variant: 'small' } & SmallLinkLogoProps)

export const LinkLogo = ({ variant, ...props }: LinkLogoProps) => {
    const Component = options[variant]
    return <Component {...props} />
}

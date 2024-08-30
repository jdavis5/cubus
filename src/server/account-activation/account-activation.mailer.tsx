import env from 'env/server'
import { renderToStaticMarkup } from 'react-dom/server'
import { mailer } from 'src/server/common/mailer/mailer'
import { Signature } from 'src/server/common/mailer/templates/signature'

/**
 * Send an email with a `ACCOUNT_ACTIVATION` token
 */
export const accountActivationMailer = (options: {
    email: string
    token: string
}) => {
    const url = new URL(
        `/2fa/activate-account/${options.token}`,
        env.NEXT_PUBLIC_BASE_URL
    )
    return mailer({
        to: options.email,
        subject: 'Please activate your Cubus account',
        html: renderToStaticMarkup(<AccountActivationTemplate link={url} />)
    })
}

type AccountActivationTemplateProps = {
    link: URL
}

const AccountActivationTemplate = ({
    link
}: AccountActivationTemplateProps) => {
    return (
        <>
            <div>
                <p>
                    Please follow the link below in order to activate your Cubus
                    account.
                </p>
                <p>
                    If you did not create a Cubus account with this email
                    address, you can simply ignore this email.
                </p>
                <p>
                    <a href={link.href}>{link.href}</a>
                </p>
            </div>
            <Signature />
        </>
    )
}

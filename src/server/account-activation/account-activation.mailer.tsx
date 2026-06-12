import env from 'env/server'
import { renderToStaticMarkup } from 'react-dom/server'
import { mailer } from 'src/server/common/mailer/mailer'
import { Signature } from 'src/server/common/mailer/templates/signature'

/**
 * Send an email with a `ACCOUNT_ACTIVATION` token.
 */
export const accountActivationMailer = (options: {
    email: string
    token: string
}) => {
    const url = new URL(
        `/verify/activate-account/${options.token}`,
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
                    Please follow the link below to activate your Cubus account.
                </p>
                <p>
                    If you did not make this request, you can safely ignore this
                    email.
                </p>
                <p>
                    <a href={link.href}>{link.href}</a>
                </p>
            </div>
            <Signature />
        </>
    )
}

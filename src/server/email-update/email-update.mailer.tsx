import env from 'env/server'
import ReactDOMServer from 'react-dom/server'
import { mailer } from 'src/server/common/mailer/mailer'
import { Signature } from 'src/server/common/mailer/templates/signature'

/**
 * Send an email with a `EMAIL_UPDATE` token
 */
export const emailUpdateMailer = (options: {
    email: string
    token: string
}) => {
    const url = new URL(
        `/2fa/update-email/${options.token}`,
        env.NEXT_PUBLIC_BASE_URL
    )
    return mailer({
        to: options.email,
        subject: 'Change your email - Cubus',
        html: ReactDOMServer.renderToStaticMarkup(
            <EmailUpdateTemplate link={url} />
        )
    })
}

type EmailUpdateTemplateProps = {
    link: URL
}

const EmailUpdateTemplate = ({ link }: EmailUpdateTemplateProps) => {
    return (
        <>
            <div>
                <p>
                    Please follow the link below in order to confirm changes to
                    the email associated with your Cubus account.
                </p>
                <p>
                    <a href={link.href}>{link.href}</a>
                </p>
                <p>
                    If you did not request this email, you can simply ignore it.
                </p>
            </div>
            <Signature />
        </>
    )
}

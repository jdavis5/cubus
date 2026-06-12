import env from 'env/server'
import ReactDOMServer from 'react-dom/server'
import { mailer } from 'src/server/common/mailer/mailer'
import { Signature } from 'src/server/common/mailer/templates/signature'

/**
 * Send an email with a `EMAIL_UPDATE` token.
 */
export const emailUpdateMailer = (options: {
    email: string
    token: string
}) => {
    const url = new URL(
        `/verify/update-email/${options.token}`,
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
                    Please follow the link below to confirm the change to the
                    email address associated with your Cubus account.
                    <br />
                    You will be asked to enter your password before the change
                    is applied.
                </p>
                <p>
                    <a href={link.href}>{link.href}</a>
                </p>
                <p>
                    If you did not make this request, you can safely ignore this
                    email.
                </p>
            </div>
            <Signature />
        </>
    )
}

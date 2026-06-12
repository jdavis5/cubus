import env from 'env/server'
import ReactDOMServer from 'react-dom/server'
import { mailer } from 'src/server/common/mailer/mailer'
import { Signature } from 'src/server/common/mailer/templates/signature'

/**
 * Send an email with a `PASSWORD_RESET` token.
 */
export const passwordResetMailer = (options: {
    email: string
    token: string
}) => {
    const url = new URL(
        `/verify/reset-password/${options.token}`,
        env.NEXT_PUBLIC_BASE_URL
    )

    return mailer({
        to: options.email,
        subject: 'Your password reset verification for Cubus',
        html: ReactDOMServer.renderToStaticMarkup(
            <PasswordResetTemplate link={url} />
        )
    })
}

type PasswordResetTemplateProps = {
    link: URL
}

const PasswordResetTemplate = ({ link }: PasswordResetTemplateProps) => {
    return (
        <>
            <div>
                <p>
                    Please follow the link below to reset your Cubus account
                    password.
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

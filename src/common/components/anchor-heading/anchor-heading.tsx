import styles from './style.module.scss'
import { FaLink } from 'react-icons/fa'
import { Heading } from 'src/common/components/heading'

type AnchorHeadingProps = {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    id: string
    title: string
}

export const AnchorHeading = ({ as, id, title }: AnchorHeadingProps) => {
    return (
        <Heading as={as} id={id}>
            <div className={styles['heading']}>
                <span className={styles['heading__title']}>{title}</span>
                <a href={`#${id}`} title={`Link to ${title}`}>
                    <FaLink />
                </a>
            </div>
        </Heading>
    )
}

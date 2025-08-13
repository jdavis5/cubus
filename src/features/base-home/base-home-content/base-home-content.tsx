import styles from './style.module.scss'

export const BaseHomeContent = () => {
    return (
        <div className={styles['content']}>
            <section className={styles['hero']}>
                <p className={styles['heading']}>
                    Dolor sit amet{' '}
                    <span className={styles['heading__highlight']}>
                        consectetur
                    </span>
                </p>
            </section>
            <section className={styles['intro']}>
                <div className={styles['content-container']}>
                    <p className={styles['heading']}>
                        Duis{' '}
                        <span className={styles['heading__highlight']}>
                            aute
                        </span>{' '}
                        irure dolor
                    </p>
                    <p className={styles['content']}>
                        Tristique senectus et netus et malesuada fames ac turpis
                        egestas. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est
                        laborum. Vel facilisis volutpat est velit egestas dui.
                        Accumsan sit amet nulla facilisi morbi tempus.
                    </p>
                </div>
            </section>
            <section className={styles['intro']}>
                <div className={styles['content-container']}>
                    <p className={styles['heading']}>
                        In nulla posuere{' '}
                        <span className={styles['heading__highlight']}>
                            sollicitudin
                        </span>
                    </p>
                    <p className={styles['content']}>
                        Mattis aliquam faucibus purus in massa tempor nec.
                        Blandit turpis cursus in hac habitasse. A pellentesque
                        sit amet porttitor eget dolor morbi non. Nec ullamcorper
                        sit amet risus nullam eget. Tristique senectus et netus
                        et malesuada. Lacus sed turpis tincidunt id. Lectus urna
                        duis convallis convallis tellus id interdum. Dolor sit
                        amet consectetur adipiscing.
                    </p>
                </div>
            </section>
            <section className={styles['intro']}>
                <div className={styles['content-container']}>
                    <p className={styles['heading']}>
                        Magna ac{' '}
                        <span className={styles['heading__highlight']}>
                            placerat
                        </span>
                    </p>
                    <p className={styles['content']}>
                        Sed risus ultricies tristique nulla. Sit amet venenatis
                        urna cursus eget nunc scelerisque viverra mauris. Arcu
                        risus quis varius quam quisque id. Diam phasellus
                        vestibulum lorem sed risus ultricies tristique nulla
                        aliquet.
                    </p>
                </div>
            </section>
            <section className={styles['intro']}>
                <div className={styles['content-container']}>
                    <p className={styles['heading']}>
                        <span className={styles['heading__highlight']}>
                            Pulvinar
                        </span>{' '}
                        elementum
                    </p>
                    <p className={styles['content']}>
                        Duis ultricies lacus sed turpis. Aliquam purus sit amet
                        luctus venenatis lectus magna. Massa vitae tortor
                        condimentum lacinia quis. Sed pulvinar proin gravida
                        hendrerit lectus. Urna nec tincidunt praesent semper.
                        Gravida cum sociis natoque penatibus et magnis dis
                        parturient montes.
                    </p>
                </div>
            </section>
        </div>
    )
}

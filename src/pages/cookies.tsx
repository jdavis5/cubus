import React from 'react'
import Head from 'next/head'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { BaseLayout } from 'src/layouts/base-layout'
import { withSession } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withSession()

const CookiesPage: PageComponent = () => {
    return (
        <>
            <Head>
                <title>{pageTitle('How we use cookies')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">How we use cookies</Heading>
                    <p>
                        Egestas congue quisque egestas diam in. A diam
                        sollicitudin tempor id eu nisl nunc mi ipsum. Nulla
                        aliquet enim tortor at auctor urna. Dolor sit amet
                        consectetur adipiscing elit ut. Magna fermentum iaculis
                        eu non diam phasellus. Pulvinar mattis nunc sed blandit
                        libero volutpat. Sapien et ligula ullamcorper malesuada
                        proin libero. Et netus et malesuada fames ac turpis
                        egestas integer eget. Ultricies integer quis auctor elit
                        sed vulputate. Eget mi proin sed libero. Sodales ut eu
                        sem integer vitae justo eget. Dui ut ornare lectus sit
                        amet est placerat in egestas. Pharetra diam sit amet
                        nisl suscipit adipiscing. Ultricies mi quis hendrerit
                        dolor magna eget est lorem.
                    </p>
                    <p>
                        Pharetra pharetra massa massa ultricies mi quis
                        hendrerit dolor. Elementum curabitur vitae nunc sed. Et
                        molestie ac feugiat sed lectus vestibulum mattis. Donec
                        pretium vulputate sapien nec sagittis. Consectetur
                        adipiscing elit duis tristique sollicitudin nibh sit
                        amet commodo. Fermentum odio eu feugiat pretium nibh. A
                        iaculis at erat pellentesque adipiscing commodo. Eget
                        dolor morbi non arcu risus quis varius. Posuere urna nec
                        tincidunt praesent semper feugiat nibh sed. Leo integer
                        malesuada nunc vel risus commodo. Nisl condimentum id
                        venenatis a condimentum vitae. Vel facilisis volutpat
                        est velit egestas dui. Accumsan sit amet nulla facilisi
                        morbi tempus. Sed blandit libero volutpat sed cras
                        ornare arcu. Feugiat in ante metus dictum. Gravida in
                        fermentum et sollicitudin ac orci. Amet massa vitae
                        tortor condimentum lacinia quis vel. Amet tellus cras
                        adipiscing enim eu. Urna et pharetra pharetra massa
                        massa ultricies mi quis.
                    </p>
                    <p>
                        Magna ac placerat vestibulum lectus mauris ultrices.
                        Egestas quis ipsum suspendisse ultrices gravida dictum
                        fusce. Cras sed felis eget velit. Euismod nisi porta
                        lorem mollis aliquam ut porttitor leo a. Et sollicitudin
                        ac orci phasellus. Montes nascetur ridiculus mus mauris
                        vitae ultricies. Amet facilisis magna etiam tempor orci
                        eu lobortis elementum nibh. Mollis aliquam ut porttitor
                        leo a diam sollicitudin tempor. Venenatis lectus magna
                        fringilla urna porttitor rhoncus dolor purus. Feugiat
                        scelerisque varius morbi enim nunc faucibus. Erat nam at
                        lectus urna. Fringilla est ullamcorper eget nulla.
                        Ultrices tincidunt arcu non sodales neque sodales. Vitae
                        auctor eu augue ut lectus arcu bibendum at. Quis commodo
                        odio aenean sed adipiscing diam donec adipiscing.
                        Pellentesque habitant morbi tristique senectus et.
                        Pellentesque habitant morbi tristique senectus.
                    </p>
                    <p>
                        Vel pretium lectus quam id leo in vitae turpis. Semper
                        risus in hendrerit gravida rutrum quisque non. Mi in
                        nulla posuere sollicitudin. Eget nunc lobortis mattis
                        aliquam faucibus. Aliquam ut porttitor leo a diam
                        sollicitudin tempor. Arcu vitae elementum curabitur
                        vitae nunc sed velit dignissim. Non diam phasellus
                        vestibulum lorem sed risus ultricies tristique nulla.
                        Mauris nunc congue nisi vitae suscipit tellus mauris.
                        Egestas tellus rutrum tellus pellentesque eu tincidunt
                        tortor aliquam nulla. Maecenas accumsan lacus vel
                        facilisis volutpat est. Fringilla urna porttitor rhoncus
                        dolor purus non enim praesent. Elit sed vulputate mi sit
                        amet mauris commodo. Etiam tempor orci eu lobortis.
                        Egestas sed sed risus pretium.
                    </p>
                </Section>
                <Section>
                    <Heading as="h2">Tortor posuere</Heading>
                    <p>
                        Consectetur adipiscing elit ut aliquam. Blandit cursus
                        risus at ultrices mi. Et netus et malesuada fames ac.
                        Risus pretium quam vulputate dignissim suspendisse in
                        est ante in. Donec massa sapien faucibus et molestie ac
                        feugiat sed. Nunc vel risus commodo viverra maecenas
                        accumsan lacus. Magna fringilla urna porttitor rhoncus
                        dolor purus non enim praesent. Tortor posuere ac ut
                        consequat semper. Ligula ullamcorper malesuada proin
                        libero nunc consequat interdum varius. Sapien faucibus
                        et molestie ac feugiat. Sit amet commodo nulla facilisi
                        nullam vehicula ipsum. A arcu cursus vitae congue mauris
                        rhoncus aenean. Morbi blandit cursus risus at.
                        Pellentesque massa placerat duis ultricies lacus sed
                        turpis. Blandit turpis cursus in hac. Sit amet mattis
                        vulputate enim nulla aliquet porttitor.
                    </p>
                    <p>
                        Fermentum iaculis eu non diam phasellus vestibulum lorem
                        sed risus. Convallis a cras semper auctor neque. Nunc mi
                        ipsum faucibus vitae aliquet nec ullamcorper. Enim nec
                        dui nunc mattis enim ut tellus. Feugiat vivamus at augue
                        eget arcu. Et molestie ac feugiat sed lectus vestibulum
                        mattis ullamcorper. Ac felis donec et odio pellentesque.
                        Tortor dignissim convallis aenean et tortor at risus.
                        Neque convallis a cras semper auctor. Ut porttitor leo a
                        diam sollicitudin tempor id. Venenatis tellus in metus
                        vulputate eu scelerisque felis imperdiet proin.
                    </p>
                    <p>
                        Condimentum lacinia quis vel eros. Adipiscing bibendum
                        est ultricies integer quis auctor elit sed vulputate.
                        Morbi tristique senectus et netus et. Massa massa
                        ultricies mi quis hendrerit dolor magna eget. Facilisis
                        leo vel fringilla est ullamcorper eget. Etiam tempor
                        orci eu lobortis elementum. Consectetur adipiscing elit
                        duis tristique sollicitudin. Dignissim convallis aenean
                        et tortor at. Sed risus ultricies tristique nulla. Sit
                        amet venenatis urna cursus eget nunc scelerisque viverra
                        mauris. Arcu risus quis varius quam quisque id. Diam
                        phasellus vestibulum lorem sed risus ultricies tristique
                        nulla aliquet. Maecenas accumsan lacus vel facilisis
                        volutpat est. Interdum consectetur libero id faucibus
                        nisl tincidunt. Morbi quis commodo odio aenean sed
                        adipiscing diam donec adipiscing. Scelerisque eleifend
                        donec pretium vulputate. Tellus orci ac auctor augue
                        mauris augue neque gravida in.
                    </p>
                </Section>
            </Container>
        </>
    )
}

CookiesPage.layout = ({ children }) => <BaseLayout>{children}</BaseLayout>

export default CookiesPage

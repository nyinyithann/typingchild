import Head from 'next/head';
import React from "react";

const title = 'TypingChild';
const description = 'The best place for kids to learn touch-typing.';

function TpHead() {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="description" content={description} />
            <meta name="application-name" content={title} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta
                name="twitter:image"
                content="https://typingchild.com/static/brand/banner.png"
            />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
            <meta name="og:image" content="/static/brand/banner.png" />
            <meta name="theme-color" content="#FFFFFF" />
            <title>
                {title}-{description}{' '}
            </title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

export default TpHead

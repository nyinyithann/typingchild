import Head from 'next/head';
import React from "react";

const title = 'TypingChild-The best place for kids to learn touch-typing.';
const description = 'TypingChild provides free touch-typing lesssons for kids. TypingChild is the best place for kids to learn touch-typing.';

function TpHead() {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="application-name" content="TypingChild" />
            <meta name="twitter:site" content="@typingchild" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:domain" content="typingchild.com" />
            <meta name="twitter:url" content="https://www.typingchild.com" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta
                name="twitter:image"
                content="https://www.typingchild.com/static/images/1.png"
            />
            <meta name="twitter:alt" content="typingchild banner" />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
            <meta name="og:image" content="https://www.typingchild.com/static/images/1.png" />
            <meta name="og:image:alt" content="typingchild banner" />
            <meta name="og:url" content="https://www.typingchild.com" />
            <meta name="og:type" content="website" />
            <meta name="theme-color" content="#FFFFFF" />
            <title>
                {title}
            </title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

export default TpHead

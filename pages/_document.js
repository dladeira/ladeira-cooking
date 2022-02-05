import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
                <script src="https://kit.fontawesome.com/fc8fb46941.js" crossOrigin="anonymous" async={true} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
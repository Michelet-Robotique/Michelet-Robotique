import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MICHELET ROBOTIQUE | Immersive Digital Experiences',
    description: 'Portfolio immersif présentant les créations digitales innovantes de MICHELET ROBOTIQUE.',
    keywords: ['portfolio', '3D', 'WebGL', 'immersive', 'design', 'creative', 'development', 'robotique'],
    authors: [{ name: 'MICHELET ROBOTIQUE' }],
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#000000',
};

import StyledComponentsRegistry from '@/lib/registry';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}

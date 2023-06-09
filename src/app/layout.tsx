import FeedbackBox from '@/components/FeedbackBox';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DictionarAI',
  description: 'Consult words or phrases, get corrections, examples and more!',
  openGraph: {
    type: 'website',
    locale: 'en',
    title: 'DictionarAI',
    description:
      'Consult words or phrases, get corrections, examples and more!',
    images: [
      {
        width: 1200,
        height: 675,
        url: '/dictionar-ai-banner.png',
        alt: 'DictionarAI banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DictionarAI',
    description:
      'Consult words or phrases, get corrections, examples and more!',
    creator: '@juancmandev',
    images: {
      width: 1200,
      height: 675,
      url: '/dictionar-ai-banner.png',
      alt: 'DictionarAI banner',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <main>{children}</main>
        <FeedbackBox />
      </body>
    </html>
  );
}

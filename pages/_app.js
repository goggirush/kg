import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import '@scania/tegel/dist/tegel/tegel.css';
import Header from '../components/Header/Header';
import '@/styles/globals.scss'; // absolute path using tsconfig alias


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@scania/tegel/loader').then(({ defineCustomElements }) => {
        defineCustomElements(window);
      });
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

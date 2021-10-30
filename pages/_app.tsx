import { AppProps } from 'next/app'
import { globalCSS, Provider, foundations, NotificationContainer } from '@go1d/go1d'
import { SessionProvider } from "next-auth/react"
import { ModalProvider } from 'react-modal-hook';

globalCSS()

function App({ Component, pageProps: { session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider mode="dark" theme={{
        ...foundations,
        colors: {
          ...foundations.colors,
          background: '#2D2E32',
          black: '#25262A',
        },
      }}>
        <ModalProvider>
          <Component {...pageProps} />
          
        </ModalProvider>
      </Provider>
      <NotificationContainer />
    </SessionProvider>
  );
}

export default App

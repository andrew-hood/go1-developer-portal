import { AppProps } from "next/app";
import { Provider, NotificationContainer } from "@go1d/go1d";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "react-modal-hook";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </Provider>
      <NotificationContainer />
    </SessionProvider>
  );
}

export default App;

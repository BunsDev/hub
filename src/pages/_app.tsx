import Head from "next/head";
import { ThemeProvider } from "theme-ui";
import { SWRConfig } from "swr";

import "animate.css/animate.css";
import theme from "../theme";
import { StateProvider, useStateValue } from "../state/state";
import { fetcherREST } from "../utils/fetcher";

import { useAuth } from "hooks";
import { ResponsiveProvider } from "hooks/useResponsive";
import useOnboarding from "hooks/useOnboarding";
import { useEffect } from "react";
import useFavorites from "hooks/useFavorites";
import { ModalProvider } from "hooks/useModal";

const swrOptions = {
  // refreshInterval: 10000,
  fetcher: (resource: string) => fetcherREST(resource),
};

interface Props<T> {
  pageProps: React.PropsWithChildren<T>;
  Component: React.FC<T>; // eslint-disable-line
}

function StatefulApp({ pageProps, Component }: Props<any>) {
  // eslint-disable-line
  const [{ dapp }] = useStateValue();
  useOnboarding();
  const { authenticate } = useAuth(dapp);
  useFavorites();

  useEffect(() => {
    if (dapp.web3 && dapp.address) {
      authenticate();
    }
  }, [dapp.web3, dapp.address]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <SWRConfig value={swrOptions}>
        <ResponsiveProvider>
          <Component {...pageProps} />
        </ResponsiveProvider>
      </SWRConfig>
    </>
  );
}

function MyApp({ Component, pageProps }: Props<any>) {
  // eslint-disable-line
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <StatefulApp pageProps={pageProps} Component={Component} />
        </ModalProvider>
      </ThemeProvider>
    </StateProvider>
  );
}

export default MyApp;

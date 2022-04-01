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
import React, { useEffect } from "react";
import { ModalProvider } from "hooks/useModal";
import { CeramicProvider } from "hooks/useCeramic";

const swrOptions = {
  // refreshInterval: 10000,
  fetcher: (resource: string) => fetcherREST(resource),
};

interface Props<T> {
  pageProps: React.PropsWithChildren<T>;
  Component: React.FC<T>; // eslint-disable-line
}

function StatefulApp({ pageProps, Component }: Props<React.ReactNode>) {
  const [{ dapp }] = useStateValue();
  useOnboarding();
  const { authenticate } = useAuth(dapp);

  useEffect(() => {
    if (dapp.web3 && dapp.address) {
      void authenticate();
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

function MyApp({ Component, pageProps }: Props<React.ReactNode>) {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <CeramicProvider>
          <ModalProvider>
            <StatefulApp pageProps={pageProps} Component={Component} />
          </ModalProvider>
        </CeramicProvider>
      </ThemeProvider>
    </StateProvider>
  );
}

export default MyApp;

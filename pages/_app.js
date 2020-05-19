import App from 'next/app';
import Head from 'next/head';

import { AppProvider as PolarisProvider } from '@shopify/polaris';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';

import '@shopify/polaris/styles.css';
import translations from '@shopify/polaris/locales/en.json';

import Cookies from 'js-cookie';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  },
});

class MinimumByZip extends App {

  render() {
    const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Minimum By Zip</title>
          <meta charSet="utf-8" />
        </Head>
        <AppBridgeProvider config={config}>
          <PolarisProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </PolarisProvider>
        </AppBridgeProvider>
      </React.Fragment>
    );
  }
}

export default MinimumByZip;

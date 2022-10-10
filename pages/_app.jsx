import { Provider } from 'react-redux';
import { useStore } from '../store';
import Layout from '../components/Layout';
import "..//styles/globals.css";
import {useEffect, useState} from 'react';
import supabase from '../config/supabaseClient';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

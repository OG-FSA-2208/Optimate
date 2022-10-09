import { Provider } from 'react-redux';
import { useStore } from '../store';
import Layout from '../components/Layout';
import "..//styles/globals.css"

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

import { Provider } from 'react-redux';
import { useStore } from '../store';
import Layout from '../components/Layout';
import '..//styles/globals.css'; //TODO: remove ../ ? seems to have no effect further testing needed
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  return (
    <Provider store={store}>
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            className="base-page-size"
            variants={{
              initialState: {
                opacity: 1,
              },
              animateState: {
                opacity: 1,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%',
                transition: {
                  duration: 0.45,
                },
              },
              exitState: {
                clipPath: 'polygon(50% 0, 50% 0%, 50% 100%, 50% 100%',
                transition: {
                  duration: 0.45,
                },
              },
            }}
          >
            <Head>
              <link rel="shortcut icon" href="/images/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </Provider>
  );
}

export default MyApp;

import { Provider } from 'react-redux';
import { useStore } from '../store';
import Layout from '../components/Layout';
import '..//styles/globals.css';
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  return (
    <Provider store={store}>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{
              duration: 0.6,
            }}
            className="base-page-size"
            variants={{
              initialState: {
                opacity: 1,
              },
              animateState: {
                opacity: 1,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%',
              },
              exitState: {
                clipPath: 'polygon(50% 0, 50% 0%, 50% 100%, 50% 100%',
              },
            }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </Provider>
  );
}

export default MyApp;

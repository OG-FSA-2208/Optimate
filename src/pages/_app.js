import { Provider } from 'react-redux';
import { useStore } from '../store';
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
    //Component is the page that is loaded, see pages folder
    //props is an empty object unlessa data fetching method is used: https://nextjs.org/docs/basic-features/data-fetching/overview
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

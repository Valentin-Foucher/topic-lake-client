import { persistor, store } from '@/app/store';
import { OpenAPI } from '@/clients/api';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './theme.css'

export default function App({ Component, pageProps }: AppProps) {
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
    OpenAPI.HEADERS = {};

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}

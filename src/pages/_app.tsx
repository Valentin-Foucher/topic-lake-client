import { makeStore } from '@/app/store';
import { OpenAPI } from '@/clients/api';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
    const store = makeStore();
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
    OpenAPI.HEADERS = {};

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

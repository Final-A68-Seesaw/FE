import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import ReactDom from 'react-dom';
import App from './shared/App';

import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import Loader from './components/Loader';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true
        }
    },
}
)

ReactDom.render(
    <BrowserRouter>
    <QueryClientProvider client = {client}>
        <React.Suspense fallback= {<Loader/>}>
        <App />
        </React.Suspense>
        </QueryClientProvider>
    </BrowserRouter>
    , document.querySelector('#root'));
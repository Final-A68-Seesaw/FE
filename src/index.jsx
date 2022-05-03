import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import ReactDom from 'react-dom';
import App from './shared/App';

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.querySelector('#root'));
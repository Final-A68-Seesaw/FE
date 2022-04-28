import * as React from 'react';
import Router from './Router';


import Main from '../pages/Main';

const App = () => {
    return (
        <>
            {/* <GlobalStyles/> */}
            <Router />
            <Main />
        </>
    )
}

export default App;
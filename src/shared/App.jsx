import * as React from 'react';
import Router from './Router';
import GlobalStyles from './GlobalStyles'

import { isMobile } from 'react-device-detect';
import MoblieImg from '../asset/Moblie.svg'


const App = () => {
    return (
        <>
            {isMobile ?
                <MoblieImg style={{ width: '100%' }} />
                : <>
                    <GlobalStyles />
                    <Router />
                </>}
        </>
    )
}

export default App;
import * as React from 'react';
import Router from './Router';
import GlobalStyles from './GlobalStyles'

import { isMobile } from 'react-device-detect';
import MoblieImg1 from '../asset/Moblie.svg'
import MoblieImg2 from '../asset/Moblie2.svg'


const App = () => {

    const r = (parseInt(Math.random() * 10) % 2)

    return (
        <>
            {isMobile ?
                (r === 0 ? <MoblieImg1 style={{ width: '100%' }} />
                : <MoblieImg2 style={{ width: '100%' }} />)
                : <>
                    <GlobalStyles />
                    <Router />
                </>}
        </>
    )
}

export default App;
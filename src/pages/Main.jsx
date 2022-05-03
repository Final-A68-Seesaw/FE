import React from 'react'
import { useDispatch } from 'react-redux';
import { __logout } from '../redux/modules/user';

const Main = () => {

    const dispatch = useDispatch();
    const clickLogout = () => {
        dispatch(__logout());
      };

    return (
        <div>
            <p>Hello, World!</p>
            <p>Hello, React!</p>
            <button onClick={clickLogout}>logout</button>
        </div>
    )
}

export default Main;
import { combineReducers, createStore } from 'redux'
import { createBrowserHistory } from "history";
import { connectRouter } from 'connected-react-router';

import chat from './modules/chat';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    chat,
    router: connectRouter(history),
});

//스토어 만들기
let store = (initialStore) => createStore(rootReducer);

export default store();
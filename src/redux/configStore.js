import { combineReducers, createStore } from 'redux'
import { createBrowserHistory } from "history";
import { connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
});

//스토어 만들기
let store = (initialStore) => createStore(rootReducer);

export default store();
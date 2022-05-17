import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { createBrowserHistory } from "history";
import { connectRouter } from 'connected-react-router';
import thunk from "redux-thunk";

import user from './modules/user';
import chat from './modules/chat';
import trouble from "./modules/touble";
import dictionary from "./modules/dictionary";
import mypage from "./modules/mypage";

export const history = createBrowserHistory();

const rootReducer = combineReducers({

    user,
    chat,
    trouble,
    dictionary,
    mypage,
    router: connectRouter(history),
});

const env = process.env.NODE_ENV;

const middlewares = [thunk.withExtraArgument({ history })];

const enhancer = compose(applyMiddleware(...middlewares));


//스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
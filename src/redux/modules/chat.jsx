import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"

const GET_CHAT = 'GETCHAT'
const ADD_CHAT = 'ADDCHAT'
const CLEAR_CHAR = 'CLEARCHAT'

const getChat = createAction(GET_CHAT, (chat) => chat)
const addChat = createAction(ADD_CHAT, (chat) => chat)
const clearChat = createAction(CLEAR_CHAR, (chat) => chat)



const initialState = {
    list: [],
}



export default handleActions(
    {
        [GET_CHAT]: (state, action) => produce(state, (draft) => {
            action.payload.map((v) => {
                draft.list.push({ ...v })
            })
        }),

        [CLEAR_CHAR]: (state, action) => produce(state, (draft) => {
            draft.list = []
        }),

        [ADD_CHAT]: (state, action) => produce(state, (draft) => {
            if (action.payload.createdAt)
                draft.list.push({ ...action.payload })
            else
                draft.list.push({ ...action.payload })
        }),
    },
    initialState
);

const actionCreators = {
    getChat,
    addChat,
    clearChat,
};

export { actionCreators };

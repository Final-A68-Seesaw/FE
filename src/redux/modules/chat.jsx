import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"



const GET_CHAT = 'GETCHAT'
const ADD_CHAT = 'ADDCHAT'

const getChat = createAction(GET_CHAT, (chat) => chat)
const addChat = createAction(ADD_CHAT, (chat) => chat)



const initialState = {
    list: [],
}



export default handleActions(
    {
        [GET_CHAT]: (state, action) => produce(state, (draft) => {
            action.payload.map((v) => {
                draft.list.push({ ...v, createdAt: v.createdAt.match(/(\d*-\d*-\d*).(\d*:\d*:\d*)/)[2] })
            })
            // draft.list = action.payload
        }),

        [ADD_CHAT]: (state, action) => produce(state, (draft) => {
            draft.list.push(action.payload)
            console.log('add => ', draft.list)
        }),
    },
    initialState
);

const actionCreators = {
    getChat,
    addChat,
};

export { actionCreators };

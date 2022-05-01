import axios from "axios";
import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"



const GET_CHAT = 'GETCHAT'

const getChat = createAction(GET_CHAT, (chat) => chat)



const initialState = {
    list: [],
}



export default handleActions(
    {
        [GET_CHAT]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload
        }),
    },
    initialState
);

const actionCreators = {
    getChat,
};

export { actionCreators };

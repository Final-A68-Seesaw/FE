import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"
import { MypageApi } from "../../api/mypageApi";

const GET_MY_PROFILE = 'GETMYPROFILE'
const GET_MY_SCRAP = 'GETMYSCRAP'

const getMyprofile = createAction(GET_MY_PROFILE, (data) => data)
const getScrap = createAction(GET_MY_SCRAP, (data) => data)



const initialState = {
  list: [],
    
}




export const __loadMypage = (data) => {
    return (dispatch, getState, { history }) => {
      MypageApi
        .mypageGet(data)
        .then((res) => {
          console.log(res);
          dispatch(getMyprofile(res.data));
        })
        .catch((err) => console.log(err.response));
    };
  };


export default handleActions(
    {
        [GET_MY_PROFILE]: (state, action) =>
        produce(state, (draft) => {
            draft.list = action.payload
        }),
        [GET_MY_SCRAP]: (state, action) =>
        produce(state, (draft) => {
            draft.list = action.payload
        }),

        
    },
    initialState
);

const actionCreators = {
    getScrap,
    
};

export { actionCreators };
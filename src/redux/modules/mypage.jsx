import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"
import { MypageApi } from "../../api/mypageApi";
import { dictApi } from "../../api/dictApi";

const GET_MY_PROFILE = 'GETMYPROFILE'
const GET_MY_SCRAP = 'GETMYSCRAP'
const GET_MY_WORD = 'GETMYWORD'
const GET_MY_WRITING = 'GETMYWRITING'

const PUT_MY_PROFILE = 'PUTMYPROFILE'

const SCRAP_MY_PAGE = 'SCRAPMYPAGE'

const getMyprofile = createAction(GET_MY_PROFILE, (data) => data)
const getScrap = createAction(GET_MY_SCRAP, (data) => data)
const getMyWord = createAction(GET_MY_WORD, (data) => data)
const getMyWriting = createAction(GET_MY_WRITING, (data) => data)

const putMyprofile = createAction(PUT_MY_PROFILE, (data) => data)

const scrapMypage = createAction(SCRAP_MY_PAGE, (data) => data)

const initialState = {
  list: [],
  scrap: [],
  writing: []
}


export const __loadMypage = (data) => {
    return (dispatch, getState, { history }) => {
      MypageApi
        .mypageGet(data)
        .then((res) => {
          dispatch(getMyprofile(res.data));
        })
        .catch((err) => console.log(err.response));
    };
  };

export const __loadMypageScrap = (data) =>{
  return(dispatch, gestState, {history}) =>{
    MypageApi
    .mypageGetScrap(data)
    .then((res) => {
      dispatch(getScrap(res.data))
    })
    .catch((err) => console.log(err.response))
  }
}

export const __scrapMyPage = (scrap, postId) => {
  return (dispatch, getState, { history }) => {
    dictApi
      .scrapDict(postId)
      .then((res) => dispatch(scrapMypage({ postId, scrapStatus: res.data })))
      .catch((err) => console.log(err));
  };
};

export const __loadMypageMyWord = (data) =>{
  return(dispatch, gestState, {history}) =>{
    MypageApi
    . mypageGetMyWord(data)
    .then((res) => {
      dispatch(getMyWord(res.data))
    })
    .catch((err) => console.log(err.response))
  }
}

export const __loadMypageWriting = (data) =>{
  return(dispatch, gestState, {history}) =>{
    MypageApi
    . mypageGetTrou(data)
    .then((res) => {
      dispatch(getMyWriting(res.data))
    })
    .catch((err) => console.log(err.response))
  }
}

export const __editMyProfile = (data) =>{
  return(dispatch, getState, {history}) =>{
    MypageApi
    .mypagePutProfile(data)
    .then((res)=>{
    alert("프로필 수정이 완료되었습니다!")
    history.replace("/mypage/scrap");
  })
    .catch((err) =>{
    if(err.message === "Request failed with status code 400"){
      alert("중복된 닉네임입니다.")
    }
  })
  }
}

export default handleActions(
    {
        [GET_MY_PROFILE]: (state, action) =>
        produce(state, (draft) => {
            draft.list = action.payload
        }),
        [GET_MY_SCRAP]: (state, action) =>
        produce(state, (draft) => {
            draft.scrap = action.payload
        }),
        [GET_MY_WORD]: (state, action) =>
        produce(state, (draft) => {
            draft.scrap = action.payload
        }),
        [GET_MY_WRITING]: (state, action) =>
        produce(state, (draft) => {
            draft.writing = action.payload
        }),

        [SCRAP_MY_PAGE]: (state, action) =>
        produce(state, (draft) => {
            let index = draft.scrap.findIndex((v) => {
              return v.postId == action.payload.postId;
            });
            draft.scrap[index].scrapStatus = action.payload.scrapStatus.scrapStatus
            draft.scrap[index].scrapCount = action.payload.scrapStatus.scrapCount
          }),
  
        
    },
    initialState
);

const actionCreators = {
    getScrap,
    
};

export { actionCreators };
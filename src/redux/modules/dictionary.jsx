import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
import { dictApi } from "../../api/dictApi";

const GET_DICT = "GETDICT";
const GET_DICT_DETAIL = "GETDICTDETAIL";
const ADD_DICT = "ADDDICT";
const SET_DICT = "SETDICT";
const DEL_DICT = "DELDICT";

const ADD_DICT_COM = "ADD_DICT_COM";
const PUT_DICT_COM = "PUT_DICT_COM";
const DEL_DICT_COM = "DEL_DICT_COM";

const LIKE_DICT_COM = "LIKE_DICT_COM";

const getDict = createAction(GET_DICT, (data) => data);
const getDictDetail = createAction(GET_DICT_DETAIL, (detailData) => detailData);
const addDict = createAction(ADD_DICT, (data) => ({ data }));
export const setDict = createAction(SET_DICT, (files) => ({ files }));
const delDict = createAction(DEL_DICT, (dict) => dict);

const addDictCom = createAction(ADD_DICT_COM, (data) => data);
const putDictCom = createAction(PUT_DICT_COM, (data) => data);
const delDictCom = createAction(DEL_DICT_COM, (data) => data);

const likeDictCom = createAction(LIKE_DICT_COM, (data) => data);

const initialState = {
  list: [],
  files: [],
  detailData: null,
};

export const __addDict = (data) => {
  return (dispatch, getState, { history }) => {
    console.log(data);
    console.log(data.tagNames);
    const formData = new FormData();
    formData.append(
      "postRequestDto",
      new Blob(
        [
          JSON.stringify({
            title: data.title,
            contents: data.contents,
            videoUrl: data.videoUrl,
            tagNames: data.tagNames,
            generation: data.generation,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (data.files.length !== 0) {
      data.files.map((e) => {
        return formData.append("files", e);
      });
    }

    dictApi
      .addDictForm(formData)
      .then((res) => history.replace("/dictionary"))
      .catch((err) => console.log(err));
  };
};

export const __dictTitle = (data) => {
  return (dispatch, getState, { history }) => {
    dictApi
      .addDictTitle(data)
      .then((res) => {
        if (res.data === false) {
          alert("등록 가능한 단어입니다.");
          return;
        }
        if (res.data === true) {
          alert("아쉽게도 이미 등록된 단어입니다! 검색 후 댓글을 달아주세요!");
          return;
        }
      })

      .catch((err) => console.log(err.response));
  };
};

export const __loadDictDetail = (cardTitle, commentPage) => {
  return (dispatch, getState, { history }) => {
    dictApi
      .DictDetail(cardTitle, commentPage)
      .then((res) => {
        console.log(res.data);
        dispatch(getDictDetail(res.data));
      })
      .catch((err) => console.log(err.response));
  };
};

export const __deleteDictDetail = (postId )=>{
  return (dispatch, getState, { history }) => {
    console.log(postId)
    dictApi
    .delDictDetail(postId)
    .then((res)=>{
      console.log(res)
      history.push("/dictionary")
    })
    .catch((err)=> console.log(err))
  }
}

export const __loadDictCardList = (data) => {
  return (dispatch, getState, { history }) => {
    dictApi
      .DictList()
      .then((res) => dispatch(getDict(res.data)))
      .catch((err) => console.log(err.response));
  };
};

export const __addDictComment = (cardTitleId, data, nickname) => {
  return (dispatch, getState, { history }) => {
    console.log(data);
    dictApi
      .addComment(cardTitleId, data)
      .then((res) => {
        let nowCommentData = {
          comment: data,
          commentId: res.data,
          commentLikeCount: 0,
          commentLikeStatus: false,
          commentTime: "1초전",
          nickname: nickname
        }        
        dispatch(addDictCom(nowCommentData))
      })
      .catch((err) => console.log(err));
  };
};

export const __deleteDictComment = (commentId) => {
  return (dispatch, getState, { history }) => {
    dictApi
      .delComment(commentId)
      .then(() => dispatch(delDictCom(commentId)))
      .catch((err) => console.log(err));
  };
};

export const __updateDictComment = (data, commentId) => {
  return (dispatch, getState, { history }) => {
    dictApi
      .putComment(commentId, data)
      .then((res) => dispatch(putDictCom({commentId, comment: data.comment})))
      .catch((err) => console.log(err));
  };
};

export const __likeDictComment = (like,commentId) => {
  return (dispatch, getState, { history }) => {
    console.log(like, commentId)
    dictApi
      .likeComment(commentId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
};

export default handleActions(
  {
    [GET_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload;
      }),
    [GET_DICT_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detailData = action.payload;
        console.log("리듀서", draft.detailData)
      }),

    [ADD_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.data.unshift(action.payload.data);
      }),
    [SET_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.files.push(action.payload.files);
      }),


    [ADD_DICT_COM]: (state, action) =>
      produce(state, (draft) => {
      console.log()
      }),
    [PUT_DICT_COM]: (state, action) =>
      produce(state, (draft) => {
        let commentList = state.detailData.postComments.map((v,i)=>{
        if (v.commentId === action.payload.commentId)
        return {...v, comment: action.payload.comment}
        return v
        })
        draft.detailData = {...state.detailData, postComments: commentList}
      }),
    [DEL_DICT_COM]: (state, action) =>
      produce(state, (draft) => {
        // draft.data.unshift(action.payload.data);
        console.log(action.payload)
      }),

    [LIKE_DICT_COM]: (state, action) =>
      produce(state, (draft) => {
        draft.data.unshift(action.payload.data);
      }),
  },
  initialState
);

const actionCreators = {
  getDict,
  addDict,
  delDict,
};

export { actionCreators };

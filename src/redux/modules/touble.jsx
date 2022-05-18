import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
import { TroubleApi } from "../../api/troubleApi";

const GET_TROU = "GETTROU";
const ADD_TROU = "ADDTROU";
const SET_TROU = "SETTROU";
const DEL_TROU = "DELTROU";

const GET_TR_DETAIL = "GETDETAIL";
const CLEAR_DETAIL = "CLEARDETAIL";

const ADD_TROU_COM = "ADD_TROU_COM";
const PUT_TROU_COM = "PUT_TROU_COM";
const DEL_TROU_COM = "DEL_TROU_COM";

const LIKE_TROU_COM = "LIKE_TROU_COM";

const getTrou = createAction(GET_TROU, (trouble) => trouble);
const addTrou = createAction(ADD_TROU, (trouble) => trouble);
export const setTrou = createAction(SET_TROU, (files) => ({ files }));
const delTrou = createAction(DEL_TROU, (trouble) => trouble);

const getDetail = createAction(GET_TR_DETAIL, (trouble) => trouble);
export const clearDetail = createAction(CLEAR_DETAIL, (trouble) => trouble);

const addTrouCom = createAction(ADD_TROU_COM, (data) => data);
const putTrouCom = createAction(PUT_TROU_COM, (data) => data);
const delTrouCom = createAction(DEL_TROU_COM, (data) => data);

const initialState = {
  list: [],
  files: [],
  detail: null,
};

export const __loadTrouCardList = () => {
  return (dispatch, getState, { history }) => {
    TroubleApi.troubleget().then((res) => dispatch(getTrou(res.data)));
  };
};

export const __addTrou = (data) => {
  return (dispatch, getState, { history }) => {
    let formData = new FormData();

    formData.append(
      "troubleRequestDto",
      new Blob(
        [
          JSON.stringify({
            title: data.title,
            contents: data.contents,
            question: data.question,
            answer: data.answer,
            tagNames: data.tagNames,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    if (data.files.length !== 0) {
      data.files.map((e) => {
        return formData.append("files", e);
      });
    }

    TroubleApi.troublepost(formData)
      .then((res) => {
        history.replace("/trouble");
      })
      .catch((err) => console.log(err));
  };
};

export const __deleteTrouDetail = (data) => {
  return (dispatch, getState, { history }) => {
    TroubleApi.troubledel(data)
      .then((res) => {
        history.replace("/trouble");
      })
      .catch((err) => console.log(err));
  };
};

export const __addTrouComment = (troubleid, data, nickname) => {
  return (dispatch, getState, { history }) => {
    TroubleApi.troublecommentpost(troubleid, data)
      .then((res) => {
        dispatch(addTrouCom(res.data));
      })
      .catch((err) => console.log(err));
  };
};

const getTrouDetailDB = (id) => {
  return (dispatch, getState, { history }) => {
    TroubleApi.troubledetail(id)
      .then((res) => dispatch(getDetail(res.data)))
      .catch((err) => console.log(err));
  };
};

export default handleActions(
  {
    [GET_TROU]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload;
      }),

    [ADD_TROU]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        // draft.list = action.payload
      }),

    [SET_TROU]: (state, action) =>
      produce(state, (draft) => {
        draft.files.push(action.payload.files);
        console.log(state);
      }),

    [DEL_TROU]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        // draft.list = action.payload
      }),

    [GET_TR_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = { ...action.payload };
      }),

    [CLEAR_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = null;
      }),
    [ADD_TROU_COM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        // draft.detail.postComments.unshift(action.payload);

        // if (draft.detail.postComments.length > 4)
        //   draft.detail.postComments = draft.detailData.postComments.slice(
        //     0,
        //     4
        //   );

        // draft.detail.commentCount = action.payload.commentCount;
      }),
    [PUT_TROU_COM]: (state, action) =>
      produce(state, (draft) => {
        let commentList = state.detailData.postComments.map((v, i) => {
          if (v.commentId === action.payload.commentId)
            return { ...v, comment: action.payload.comment };
          return v;
        });
        draft.detailData = { ...state.detailData, postComments: commentList };
      }),
    [DEL_TROU_COM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        let comList = state.detailData.postComments.filter(
          (v) => v.commentId !== action.payload.commentId
        );

        if (action.payload.nextComment.commentId)
          comList.push(action.payload.nextComment);

        draft.detailData.postComments = comList;
        draft.detailData.commentCount = action.payload.nextComment.commentCount;
      }),

    [LIKE_TROU_COM]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.detailData.postComments.findIndex((v) => {
          return v.commentId == action.payload.commentId;
        });
        draft.detailData.postComments[index].commentLikeStatus =
          action.payload.likeStatus;
        console.log(action.payload);
      }),
  },
  initialState
);

const actionCreators = {
  getTrouDetailDB,
};

export { actionCreators };

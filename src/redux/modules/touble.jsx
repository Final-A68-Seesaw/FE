import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
import { TroubleApi } from "../../api/troubleApi";

const GET_TROU = "GETTROU";
const ADD_TROU = "ADDTROU";
const SET_TROU = "SETTROU";
const CLEAR_TROU = "CLEARTROU"

const GET_TR_DETAIL = "GETDETAIL";
const CLEAR_DETAIL = "CLEARDETAIL";

const ADD_TROU_COM = "ADD_TROU_COM";
const PUT_TROU_COM = "PUT_TROU_COM";
const DEL_TROU_COM = "DEL_TROU_COM";

const LIKE_TROU_COM = "LIKE_TROU_COM";

const getTrou = createAction(GET_TROU, (trouble) => trouble);
const addTrou = createAction(ADD_TROU, (trouble) => trouble);
export const setTrou = createAction(SET_TROU, (files) => ({ files }));
export const clearTrou = createAction(CLEAR_TROU, (data)=>data)

const getDetail = createAction(GET_TR_DETAIL, (trouble) => trouble);
export const clearDetail = createAction(CLEAR_DETAIL, (trouble) => trouble);

const addTrouCom = createAction(ADD_TROU_COM, (data) => data);
const putTrouCom = createAction(PUT_TROU_COM, (data) => data);
const delTrouCom = createAction(DEL_TROU_COM, (data) => data);

const likeTrouCom = createAction(LIKE_TROU_COM, (data) => data);

const initialState = {
  list: [],
  files: [],
  detail: null,
};

export const __loadTrouCardList = (data) => {
  return (dispatch, getState, { history }) => {
    TroubleApi
    .troubleget(data)
    .then((res) => dispatch(getTrou(res.data)));
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

export const __updateTrouDetail = (data, id) => {
  return (dispatch, getState, { history }) => {

    console.log(getState());
    // const formData = new FormData();
    // formData.append(
    //   "troubleRequestDto",
    //   new Blob(
    //     [
    //       JSON.stringify({
    //         title: data.title,
    //         contents: data.contents,
    //         question: data.question,
    //         answer: data.answer,
    //         tagNames: data.tagNames,
    //         troubleImages: data.filesUrl,
    //       }),
    //     ],
    //     {
    //       type: "application/json",
    //     }
    //   )
    // );

    // if (data.files.newimagelist !== 0) {
    //   data.files.newimagelist.map((e) => {
    //     return formData.append("files", e);
    //   });
    // }

    // TroubleApi.troubleput(id, formData)
    //   .then((res) => {
    //     history.replace(`/trouble/detail/${id}`);
    //   })
    //   .catch((err) => console.log(err));
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

export const __updateTrouComment = (data, commentId) => {
  return (dispatch, getState, { history }) => {
    TroubleApi.troublecommentput(commentId, data)
      .then(
        (res) =>dispatch(putTrouCom({comment: data.comment, commentId }))
      )
      .catch((err) => console.log(err));
  };
};

export const __deleteTrouComment = (commentId, postId, pageNum) => {
  return (dispatch, getState, { history }) => {
    TroubleApi.troublecommentdelete(commentId)
      .then((res) => {
        let getNextComment = {
          commentId: commentId,
          nextComment: res.data,
        };
        dispatch(delTrouCom(getNextComment));
      })
      .catch((err) => console.log(err));
  };
};

const getTrouDetailDB = (id, commentId) => {
  return (dispatch, getState, { history }) => {
    TroubleApi.troubledetail(id, commentId)
      .then((res) => dispatch(getDetail(res.data)))
      .catch((err) => console.log(err));
  };
};

export const __likeTrouComment = (commentLikeStatus, commentId) => {
  return (dispatch, getState, { history }) => {
    TroubleApi.troublecommentlike(commentId)
      .then((res) => 
      dispatch(likeTrouCom({commentId, comments: res.data})))
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
        // draft.list = action.payload
      }),

    [SET_TROU]: (state, action) =>
      produce(state, (draft) => {
        draft.files.push(action.payload.files);
      }),

      [CLEAR_TROU]: (state, action) =>
      produce(state, (draft) => {
        draft.list = []
      }),

    [GET_TR_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload;
      }),

    [CLEAR_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = null;
      }),
    [ADD_TROU_COM]: (state, action) =>
      produce(state, (draft) => {
        draft.detail.troubleComments.unshift(action.payload);
        draft.detail.commentCount = draft.detail.commentCount +1
        if (draft.detail.troubleComments.length > 4)
          draft.detail.troubleComments = draft.detail.troubleComments.slice(
            0,
            4
          );
      }),
    [PUT_TROU_COM]: (state, action) =>
      produce(state, (draft) => {
        let commentList = state.detail.troubleComments.map((v, i) => {
          if (v.commentId === action.payload.commentId)
            return { ...v, comment: action.payload.comment };
          return v;
        });
        draft.detail = { ...state.detail, troubleComments: commentList };
      }),
    [DEL_TROU_COM]: (state, action) =>
      produce(state, (draft) => {
        let comList = state.detail.troubleComments.filter(
          (v) => v.commentId !== action.payload.commentId
        );
        draft.detail.commentCount = draft.detail.commentCount -1
        if (action.payload.nextComment.commentId)
          comList.push(action.payload.nextComment);

        draft.detail.troubleComments = comList;
      }),

    [LIKE_TROU_COM]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.detail.troubleComments.findIndex((v) => {
          return v.commentId == action.payload.comments.commentId;
        });
        draft.detail.troubleComments[index].commentLikeStatus =
          action.payload.comments.commentLikeStatus;
          draft.detail.troubleComments[index].commentLikeCount =
          action.payload.comments.commentLikeCount;
      }),
  },
  initialState
);

const actionCreators = {
  __loadTrouCardList,
  getTrouDetailDB,
};

export { actionCreators };

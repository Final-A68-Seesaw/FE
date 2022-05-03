import { createAction, handleActions } from "redux-actions";
import jwt_decode from "jwt-decode";
import produce from "immer";


// shared & api
import { cookies } from "../../shared/cookie";
import { userApi } from "../../api/userApi";

// action
const LOGIN = "user/LOGIN";
const LOGIN_CHECK = "user/LOGIN_CHECK";
const LOGOUT = "user/LOGOUT";

// action creator
const login = createAction(LOGIN, (data) => (data));
const loginCheck = createAction(LOGIN_CHECK, (isLogin, username) => ({
  isLogin,
  ...username,
}));
const logout = createAction(LOGOUT, (username,pwd) => ({username,pwd}));

// Thunk

export const __login =
  (data) =>
  async (dispatch, getState, { history }) => {
    try {
    const login = await userApi.login(data);

    const Token = login.headers.authorization.split(';Bearer ');
    const accessToken = Token[0].split(' ')[1];
    const refreshToken = Token[1];
    console.log(accessToken)
    console.log(refreshToken);
    
        localStorage.setItem("accessToken", accessToken, {
        path: "/",
        maxAge: 259200, // 3일
      });
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        maxAge: 604800, // 7일
      });
      history.replace("/main");
    } catch (e) {
        console.log("login error");
    }
  };
  
 const __kakao = (code) => {
    return async function (dispatch, getState, { history }) {
        try{
            const login = await userApi.kakao(code);

            const Token = login.headers.authorization.split(';Bearer ');
            const accessToken = Token[0].split(' ')[1];
            const refreshToken = Token[1];
            localStorage.setItem("accessToken", accessToken, {
                path: "/",
                maxAge: 259200, // 3일
              });
              cookies.set("refreshToken", refreshToken, {
                path: "/",
                maxAge: 604800, // 7일
              });
              history.replace("/main");
        }catch (e) {
            console.log("kakao error",e);
            window.alert("로그인에 실패했습니다.");
            history.replace("/login");
        }
       
    };
  };

export const __logout =
  () =>
  (dispatch, getState, { history }) => {
    localStorage.removeItem("accessToken", {
      path: "/",
    });
    cookies.remove("refreshToken", {
      path: "/",
    });
    history.replace("/login");
    dispatch(logout());
  };

 const __loginCheck =
  (isLogin, username) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { ok: isLogin, username },
      } = await userApi.loginCheck();
      dispatch(loginCheck(isLogin, username));
    } catch (e) {}
  };


const initialState = {
  isLogin: false,
  user: {
    email: null,
    nickname: null,
    userId: null,
    avatar: null,
    color: null,
  },
  tutorial: {
    roomlist: null,
    main: null,
    document: null,
    board: null,
    calendar: null,
    modal: null,
  },
};

export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
      }),

    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = action.payload.isLogin;
        draft.user.email = action.payload.email;
        draft.user.nickname = action.payload.nickname;
        draft.user.userId = action.payload._id;
        draft.user.avatar = action.payload.avatar;
        draft.user.color = action.payload.color;
        draft.tutorial = action.payload.tutorial;
      }),

    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
      }),
  },
  initialState
);

const userActions={
    __kakao,
    __loginCheck
}

export {userActions};
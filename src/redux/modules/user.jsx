import { createAction, handleActions } from "redux-actions";
import jwt_decode from "jwt-decode";
import produce from "immer";


// shared & api
import { cookies } from "../../shared/cookie";
import { userApi } from "../../api/userApi";
import jwtDecode from "jwt-decode";
import { MypageApi } from "../../api/mypageApi";

// action
const LOGIN = "user/LOGIN";
const LOGIN_CHECK = "user/LOGIN_CHECK";
const LOGOUT = "user/LOGOUT";

const USERDATA = 'user/SIGNDATA'
const LOADUSER = 'user/LOAD'

// action creator
const login = createAction(LOGIN, (data) => (data));
const loginCheck = createAction(LOGIN_CHECK, (isLogin, username) => ({
  isLogin,
  ...username,
}));
const logout = createAction(LOGOUT, (username,pwd) => ({username,pwd}));

const userSave = createAction(USERDATA, (user) => (user))
const loadUser = createAction(LOADUSER, (user) => (user))
// Thunk

export const __login =
  (data) =>
  async (dispatch, getState, { history }) => {
    try {
    const login = await userApi.login(data);

    const Token = login.headers.authorization.split(';Bearer ');
    const accessToken = Token[0].split(' ')[1];
    const refreshToken = Token[1];
    
      cookies.set("accessToken", accessToken, {
        path: "/",
        maxAge: 86400, // 1일
      });
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        maxAge: 604800, // 7일
      });

      MypageApi.mypageGet().then((res)=>{
        cookies.set('generation', res.data.generation, {
          path: '/',
          maxAge: 604800,
        })
        cookies.set('nickname', res.data.nickname, {
          path: '/',
          maxAge: 604800,
        })

        localStorage.setItem('profileImage0id', res.data.profileImages[0].charId)
        localStorage.setItem('profileImage0url', res.data.profileImages[0].profileImage)
        localStorage.setItem('profileImage1id', res.data.profileImages[1].charId)
        localStorage.setItem('profileImage1url', res.data.profileImages[1].profileImage)
        localStorage.setItem('profileImage2id', res.data.profileImages[2].charId)
        localStorage.setItem('profileImage2url', res.data.profileImages[2].profileImage)
      })
      dispatch(loadUser())

      history.replace("/main");
    } catch (e) {
      if (e.message === "Request failed with status code 401") {
        alert("이메일과 패스워드를 확인해주세요!");
        return;
      }
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
    localStorage.clear();
    cookies.remove("refreshToken", {
      path: "/",
    });
    history.replace("/main");
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
  usersign: {
    username: null,
    generation: null,
    pwd: null,
    energy: null,
    insight: null,
    judgement: null,
    lifePattern: null,
    mbtiRes: null,
  },
  userinfo: {},
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

    [USERDATA]: (state, action) => produce(state, (draft) => {
        draft.usersign = { ...initialState.usersign, ...action.payload }
      }),

    [LOADUSER]: (state, action) => produce(state, (draft) => {
        const profileImages = [
        {
          charId: localStorage.getItem('profileImage0id'),
          profileImage: localStorage.getItem('profileImage0url')
        },
        {
          charId: localStorage.getItem('profileImage1id'),
          profileImage: localStorage.getItem('profileImage1url')
        },
        {
          charId: localStorage.getItem('profileImage2id'),
          profileImage: localStorage.getItem('profileImage2url')
        },
      ]
      const nickname = cookies.get('nickname')
      const generation = cookies.get('generation')

      draft.userinfo = { nickname, generation,  profileImages }
      }),
  },
  initialState
);

const userActions={
    __kakao,
    __loginCheck,
    userSave,
    loadUser,
}

export {userActions};
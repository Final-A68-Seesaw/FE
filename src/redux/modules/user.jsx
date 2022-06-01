import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// shared & api
import { cookies } from "../../shared/cookie";
import { userApi } from "../../api/userApi";

// action
const LOGOUT = "user/LOGOUT";

const USERDATA = "user/SIGNDATA";
const LOADUSER = "user/LOAD";

// action creator
const logout = createAction(LOGOUT, (username, pwd) => ({ username, pwd }));

const userSave = createAction(USERDATA, (user) => user);
const loadUser = createAction(LOADUSER, (user) => user);
// Thunk

export const __login =
  (data) =>
  async (dispatch, getState, { history }) => {
    try {
      const login = await userApi.login(data);

      const Token = login.headers.authorization.split(";Bearer ");
      const accessToken = Token[0].split(" ")[1];
      const refreshToken = Token[1];

      cookies.set("accessToken", accessToken, {
        path: "/",
        maxAge: 86400, // 1일
      });
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        maxAge: 604800, // 7일
      });

      dispatch(loadUser());

      history.replace("/main");
    } catch (e) {
      if (e.message === "Request failed with status code 401") {
        alert("이메일과 패스워드를 확인해주세요!");
        return;
      }
    }
  };

export const __logout =
  () =>
  (dispatch, getState, { history }) => {
    localStorage.clear();
    cookies.remove("refreshToken", {
      path: "/",
    });
    cookies.remove("accessToken", {
      path: "/",
    });
    history.replace("/login");
    dispatch(logout());
    alert("로그아웃이 완료되었습니다!");
  };

const initialState = {
  isLogin: false,
  usersign: {
    username: null,
    id: null,
    generation: null,
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
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
      }),

    [USERDATA]: (state, action) =>
      produce(state, (draft) => {
        draft.usersign = { ...initialState.usersign, ...action.payload };
      }),


    [LOADUSER]: (state, action) =>
      produce(state, (draft) => {
        const profileImages = [
          {
            charId: localStorage.getItem("profileImage0id"),
            profileImage: localStorage.getItem("profileImage0url"),
          },
          {
            charId: localStorage.getItem("profileImage1id"),
            profileImage: localStorage.getItem("profileImage1url"),
          },
          {
            charId: localStorage.getItem("profileImage2id"),
            profileImage: localStorage.getItem("profileImage2url"),
          },
        ];
        const nickname = cookies.get("nickname");
        const generation = cookies.get("generation");

        draft.userinfo = { nickname, generation, profileImages };
      }),
  },
  initialState
);

const userActions = {
  userSave,
  loadUser,
};

export { userActions };

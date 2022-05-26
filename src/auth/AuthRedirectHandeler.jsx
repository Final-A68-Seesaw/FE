import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/modules/user";

// import spinner from"./spinner";

const AuthRedirectHandler = (props) => {

  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  React.useEffect(() => {
    dispatch(userActions.__kakao(code));
  }, [code]);

  return null;
};

export default AuthRedirectHandler;
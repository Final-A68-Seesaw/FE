import React from "react";
import { useDispatch } from "react-redux";
import { __kakao } from "../redux/modules/user";
// import spinner from"./spinner";

const AuthRedirectHandler = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  React.useEffect(() => {
    dispatch(__kakao(code));
  }, []);

  return null;
};

export default AuthRedirectHandler;

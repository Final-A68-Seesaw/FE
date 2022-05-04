import { instance, nonTokenInstance } from "./index";

export const userApi = {
  //홈페이지 회원가입 로그인
  loginCheck: () => instance.get("user/refresh"),
  login: (data) => nonTokenInstance.post("user/login", data),
  signup: (data) => nonTokenInstance.post("user/check", data),
  mbti: (Mbti) => instance.post("user/mbti",Mbti),
  signupFinal: (data) => instance.post("user/signup",data),

  //kakao 로그인
  kakao: (code) => nonTokenInstance.get(`/user/kakao/callback?code=${code}`),
}
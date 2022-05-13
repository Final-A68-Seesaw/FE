import { instance, nonTokenInstance } from "./index";

export const userApi = {
  //홈페이지 회원가입 로그인
  loginCheck: () => instance.get("user/refresh"),
  login: (data) => nonTokenInstance.post("user/login", data),
  signup: (data) => nonTokenInstance.post("user/check", data),
  mbti: (Mbti) => nonTokenInstance.post("user/mbti", Mbti),
  signupFinal: (data) => nonTokenInstance.post("user/signup", data),
  signupCharacter: () => nonTokenInstance.get("user/profiles"),

  //kakao 로그인
  kakao: (code) => nonTokenInstance.get(`/user/kakao/callback?code=${code}`),
}
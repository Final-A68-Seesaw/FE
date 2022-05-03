import { instance, nonTokenInstance } from "./index";

export const userApi = {
  //홈페이지 회원가입 로그인
  loginCheck: () => instance.get("user/refresh"),
  login: (data) => nonTokenInstance.post("user/login", data),
  signup: (data) => nonTokenInstance.post("user/signup", data),
  mbti: (Mbti) => instance.post("api/mbti",Mbti),

  //kakao 로그인
  kakao: (code) => nonTokenInstance.get(`/user/kakao/callback?code=${code}`),
}
import { instance, nonTokenInstance } from "./index";

export const dictApi = {
  //홈페이지 회원가입 로그인
  addDict: (data) => instance.post("api/post",data)
  
}
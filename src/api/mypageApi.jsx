import { instance, nonTokenInstance } from "./index";

export const MypageApi = {
  mypageGet: () => instance.get('api/mypage'),
  mypageGetScrap: () => instance.get('api/mypage/scraps'),
  mypageGetTrou: () => instance.get('api/mypage/troubles'),
  mypageGetMyWord: () => instance.get('api/mypage/posts'),
  
  mypagePutProfile: () => instance.put('api/mypage/profile'),
}
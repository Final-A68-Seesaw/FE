import { instance, formDatas } from "./index";

export const dictApi = {
  //홈페이지 회원가입 로그인
  addDictForm: (formdata) => formDatas.post("/api/post",formdata),
  addDictTitle: (title) => instance.post(`/api/post/${title}/present`,title),
  DictDetail: (cardTitleId, commentPageId) => instance.get(`/api/post/${cardTitleId}/detail?page=${commentPageId}`),
  DictList: (page)=> instance.get(`/api/post/list?page=${page}`),
  delDictDetail: (postId)=> instance.delete(`api/post/${postId}`),
  putDictDetail: (postId, data)=> formDatas.put(`api/post/${postId}/update`,data),
 
  scrapDict: (postId) => instance.post(`api/post/${postId}/scrap`),

  addComment: (cardTitleId, data) => instance.post(`/api/post/comment/${cardTitleId}`, data),
  putComment: (commentId, data) => instance.put(`/api/post/comment/${commentId}`,data),
  delComment: (commentId) => instance.delete(`/api/post/comment/${commentId}`),

  likeComment: (commentId) => instance.post(`/api/post/comment/${commentId}/like`)
}
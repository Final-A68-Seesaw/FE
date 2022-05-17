import { instance, nonTokenInstance } from "./index";

export const MainApi = {
  mainGetRecent: () => instance.get('/api/main/post/scrap'),
  mainGetRand: () => instance.get('/api/main/post/random'),
  mainGetBest: () => instance.get('/api/main/post/list'),
  mainGetTrou: () => instance.get('/api/main/trouble/list'),

  getsearch: (data) => instance.get(`/api/post/search?keyword=${data}`),
}
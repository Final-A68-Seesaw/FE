import { instance, formDatas } from "./index";

export const TroubleApi = {
    troubleget: (pageId) => instance.get(`/api/trouble/list?page=${pageId}`),
    troubledetail: (id, commentPageId) => instance.get(`/api/trouble/${id}/detail?page=${commentPageId}`),
    troublepost: (data) => formDatas.post('/api/trouble', data),
    troubleput: (id, data) => formDatas.put(`/api/trouble/${id}`, data),
    troubledetailget: (id) => instance.get(`/api/trouble/${id}`),
    troubledel: (id) => instance.delete(`/api/trouble/${id}`),

    troublecommentpost: (troubleid,data) => instance.post(`/api/trouble/comment/${troubleid}`,data),
    troublecommentput: (commentid,data) => instance.put(`/api/trouble/comment/${commentid}`,data),
    troublecommentdelete: (commentid) => instance.delete(`/api/trouble/comment/${commentid}`),
    
    troublecommentlike: (commentid) => instance.post(`/api/trouble/comment/${commentid}/like`),
}
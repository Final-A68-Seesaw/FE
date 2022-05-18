import { instance, nonTokenInstance, formDatas } from "./index";

export const TroubleApi = {
    troubleget: () => instance.get('/api/trouble/list'),
    troubledetail: (id) => instance.get(`/api/trouble/${id}/detail`),
    troublepost: (data) => formDatas.post('/api/trouble', data),
    troubleput: (id, data) => formDatas.put(`/api/trouble/${id}`, data),
    troubledetailget: (id) => instance.get(`/api/trouble/${id}`),
    troubledel: (id) => instance.delete(`/api/trouble/${id}`),

    troublecommentpost: (troubleid,data) => instance.post(`/api/trouble/comment/${troubleid}`,data),
    troublecommentput: (commentid) => instance.put(`/api/trouble/comment/${commentid}`),
    troublecommentdelete: (commentid) => instance.delete(`/api/trouble/comment/${commentid}`),
    
    troublecommentlike: (commentid) => instance.post(`/api/trouble/comment/${commentid}/like`),
}
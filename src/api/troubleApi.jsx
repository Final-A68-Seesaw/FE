import { instance, nonTokenInstance } from "./index";

export const TroubleApi = {
    troubleget: () => instance.get('api/trouble/list'),
}
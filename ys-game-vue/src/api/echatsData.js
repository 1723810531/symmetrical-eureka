import {request} from "./request";

//元素精通
export function echatsEm() {
   return request({
     url:'/Rest/echats/echatsEm',
	 method:"post"
   })
}
import {request} from "./request";

export function selectInjury(dataArray) {
   return request({
     url:'/Rest/expectation/selectInjury',
	 method:"post",
	 data: dataArray
   })
}

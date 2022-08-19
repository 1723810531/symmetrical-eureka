import {request} from "./request";

// export function checkLogin(username,password) {
//   return request({
//     url:'/login',
//     method:"post",
//     data:{
//       'username':username,
//       'password':password,
//     },
//   })
// }

//具体的请求方法
export function checkLogin(dataArray) {
  return request({
    url:'/Rest/user/userLogin',
    method:"post",
    data: dataArray
  })
  }

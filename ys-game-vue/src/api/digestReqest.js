import { digestRequest } from './node-digest-auth-client'
 
 
// 默认的请求配置参数信息
const defaultOption = {
  hostname: '127.0.0.1',
  port: 80,
  path: '/ISAPI/Security/userCheck',
  method: 'GET',
  headers: {
    'Connection': 'Keep-Alive',
    'Content-Type': 'application/json; charset="utf-8"'
  }
}
 
export const ISApiRequest = function(option, data, username, password) {
  // 将用户的请求参数信息与默认的请求参数信息进行合并
  const reqOption = Object.assign(defaultOption, option)
  return digestRequest(
    reqOption,
    data,
    username,
    password
  )
}
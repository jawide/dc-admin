import request from '@/utils/request'

export function login(data) {
  request.defaults.headers['Authorization'] = 'Basic ' + btoa(`${data.username}:${data.password}`)
  return request({
    url: '/user',
    method: 'get'
  })
}

export function getInfo(token) {
  request.defaults.headers['Authorization'] = token
  return request({
    url: '/user',
    method: 'get'
  })
}

export function logout() {
  // return request({
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post'
  // })
  return new Promise((resolve, reject) => {
    resolve()
  })
}

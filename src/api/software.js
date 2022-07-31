import request from '@/utils/request'

export function add(name, data) {
  return request({
    url: `/software/${name}`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

export function remove(name) {
  return request({
    url: `/software/${name}`,
    method: 'delete'
  })
}

export function update(name, data) {
  return request({
    url: `/software/${name}`,
    method: 'put',
    data,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

export function select(name) {
  return request({
    url: `/software/${name}`,
    method: 'get'
  })
}

export function selectall() {
  return request({
    url: `/list/software`,
    method: 'get'
  })
}

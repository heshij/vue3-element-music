import instance from '../utils/request'

export function getBanner () {
  return instance.get('/banner?type=0')
}

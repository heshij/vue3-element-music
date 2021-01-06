import instance from '../utils/request'

export function getBanner () {
  return instance.get('/banner?type=0')
}

export function getRecommendSongs () {
  return instance.get('/personalized?limit=10')
}

export function getExclusiveBroadcast () {
  return instance.get('/personalized/privatecontent')
}

export function getNewSong () {
  return instance.get('/personalized/newsong?limit=12')
}

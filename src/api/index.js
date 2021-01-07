import instance from '../utils/request'

/**
 * @method 获取头部轮播图列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getBanner () {
  return instance.get('/banner?type=0')
}

/**
 * @method 获取推荐歌单
 * @param limit 默认30
 */
export function getRecommendSongs () {
  return instance.get('/personalized?limit=10')
}

/**
 * @method 获取独家放送
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getExclusiveBroadcast () {
  return instance.get('/personalized/privatecontent')
}

/**
 * @method 获取最新歌曲
 * @param limit 默认10
 */
export function getNewSong () {
  return instance.get('/personalized/newsong?limit=12')
}

/**
 * @method 获取推荐MV
 */
export function getRecommendMV () {
  return instance.get('/personalized/mv')
}

/**
 * @method 获取推荐电台
 */
export function getRecommendRadio () {
  return instance.get('/personalized/djprogram')
}

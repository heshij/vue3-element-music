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

/**
 * @method 获取歌单详情
 * @param id  歌单 id
 * @param s 歌单最近的 s 个收藏者,默认为8
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getPlayListDetail (id, s) {
  return instance.get(`/playlist/detail?id=${id}&s=${s}`)
}

/**
 * @method 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function checkMusic (id) {
  return instance.get(`/check/music?id=${id}`)
}

/**
 * @method 获取歌曲详情
 * @param ids  音乐 id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getSongDetail (ids) {
  return instance.get(`/song/detail?ids=${ids}`)
}

/**
 * @method 获取歌曲url
 * @param id 音乐 id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getSongUrl (id) {
  return instance.get(`/song/url?id=${id}`)
}

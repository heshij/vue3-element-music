/**
 * 数字转整数 如 100000 转为10万
 * @param {需要转化的数} num
 * @param {需要保留的小数位数} point
 */
export function tranNumber (num, point) {
  const numStr = num.toString()
  // 十万以内直接返回
  if (numStr.length < 6) {
    return numStr
  } else if (numStr.length > 8) { // 大于8位数是亿
    const decimal = numStr.substring(
      numStr.length - 8,
      numStr.length - 8 + point
    )
    return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
  } else if (numStr.length > 5) { // 大于6位数是十万 (以10W分割 10W以下全部显示)
    const decimal = numStr.substring(
      numStr.length - 4,
      numStr.length - 4 + point
    )
    return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
  }
}

// 格式化时间毫秒转分秒
export function formatTime (time) {
  // 取整
  time = ~~time
  var formatTime
  if (time < 10) {
    formatTime = '00:0' + time
  } else if (time < 60) {
    formatTime = '00:' + time
  } else {
    var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
    if (m < 10) {
      m = '0' + m
    }
    var s = ~~parseInt((time % (1000 * 60)) / 1000)
    if (s < 10) {
      s = '0' + s
    }
    formatTime = m + ':' + s
  }
  return formatTime
}

// 转换成秒
export function formatSecond (time) {
  // 取整
  time = ~~time
  var secondTime
  if (time < 10) {
    secondTime = '00:0' + time
  } else if (time < 60) {
    secondTime = '00:' + time
  } else {
    var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
    var s = ~~parseInt((time % (1000 * 60)) / 1000)
    secondTime = Number(m * 60 + s)
  }
  return secondTime
}

// 秒转00:00
export function formatSecondTime (interval) {
  interval = interval | 0
  const m = (interval / 60) | 0
  const s = interval % 60
  return `${formatZero(m, 2)}:${formatZero(s, 2)}`
}

// 日期格式化
export function dateFormat (str, type) {
  const date = new Date(str)
  const year = date.getFullYear()
  const month = formatZero(date.getMonth() + 1, 2)
  const day = formatZero(date.getDate(), 2)
  const hour = formatZero(date.getHours(), 2)
  const minute = formatZero(date.getMinutes(), 2)
  const seconds = formatZero(date.getSeconds(), 2)
  // eslint-disable-next-line eqeqeq
  if (type == 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`
    // eslint-disable-next-line eqeqeq
  } else if (type == 'YYYY-MM-DD HH:MM:SS') {
    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
    // eslint-disable-next-line eqeqeq
  } else if (type == 'MM/DD  HH:MM:SS') {
    return `${month}/${day} ${hour}:${minute}:${seconds}`
  }
}

// 补0方法
function formatZero (num, len) {
  if (String(num).length > len) return num
  return (Array(len).join(0) + num).slice(-len)
}

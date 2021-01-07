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

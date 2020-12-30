import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import router from '@/router'
import config from '@/api/config'

const { baseUrl } = config

const instance = axios.create({
  time: 1000 * 60,
  baseURL: baseUrl
})

instance.defaults.responseType = 'json'
instance.defaults.withCredentials = true
instance.defaults.transformRequest = [
  data => {
    return qs.stringify(data)
  }
]
instance.defaults.validateStatus = () => true

// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    ElMessage.error({
      message: '请求超时!',
      duration: 5 * 1000
    })
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(response => {
  const data = response.data
  const status = response.status

  if (status !== 200) {
    ElMessage.error({
      message: data.message || 'Error',
      duration: 5 * 1000
    })
    if (status === 301) {
      ElMessage.error({
        message: '请求超时!',
        duration: 5 * 1000
      })
      router.replace({
        path: 'login'
      })
    }
    return Promise.reject(response)
  } else {
    return Promise.resolve(data)
  }
})

export default instance

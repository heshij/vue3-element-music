import {
  ElButton,
  ElCarousel,
  ElCarouselItem
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'

export default (app) => {
  locale.use(lang)
  app.use(ElButton).use(ElCarousel).use(ElCarouselItem)
}

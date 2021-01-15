import {
  ElLoading,
  ElButton,
  ElCarousel,
  ElCarouselItem,
  ElImage,
  ElSkeleton,
  ElSkeletonItem
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'

export default (app) => {
  locale.use(lang)
  app.use(ElLoading).use(ElButton).use(ElCarousel).use(ElCarouselItem).use(ElImage).use(ElSkeleton).use(ElSkeletonItem)
}

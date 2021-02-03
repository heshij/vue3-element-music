import {
  ElLoading,
  ElButton,
  ElInput,
  ElCarousel,
  ElCarouselItem,
  ElImage,
  ElSkeleton,
  ElSkeletonItem,
  ElPagination,
  ElSlider
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'

export default (app) => {
  locale.use(lang)
  app.use(ElLoading)
    .use(ElButton)
    .use(ElInput)
    .use(ElCarousel)
    .use(ElCarouselItem)
    .use(ElImage)
    .use(ElSkeleton)
    .use(ElSkeletonItem)
    .use(ElPagination)
    .use(ElSlider)
}

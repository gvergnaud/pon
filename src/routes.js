import Home from './views/Home'
import RochardCaseStudy from './views/RochardCaseStudy'
import JaiyeCaseStudy from './views/JaiyeCaseStudy'
import DylerzCaseStudy from './views/DylerzCaseStudy'

export default {

  default: 'home',

  '/': {
    path: '/',
    component: Home
  },

  '/appartement-rochard': {
    path: '/appartement-rochard',
    component: RochardCaseStudy
  },

  '/jaiye-music': {
    path: '/jaiye-music',
    component: JaiyeCaseStudy
  },

  '/dylerz-magazine': {
    path: '/dylerz-magazine',
    component: DylerzCaseStudy
  },

}

export const mapValues = (obj, mapper) => Object.keys(obj).map((key) => mapper(obj[key], key))


export const getDocumentHeight = () => Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
)


export const getScrollTop = () => {
  if (typeof pageYOffset != 'undefined') {
    //most browsers except IE before #9
    return pageYOffset
  } else {
    var B = document.body //IE 'quirks'
    var D = document.documentElement //IE with doctype
    D = (D.clientHeight) ? D : B
    return D.scrollTop
  }
}

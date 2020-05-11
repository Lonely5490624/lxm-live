const loadImage = (url) => {
  let img = new Image()
  img.src = url
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (e) => {
      console.log('图片加载失败', e)
      reject(e)
    }
  })
}

export default loadImage
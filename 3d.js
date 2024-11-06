const centerX = window.innerWidth / 2
const centerY = window.innerHeight / 2

const random = (low, high) => {
  return low + Math.random() * (high - low)
}

const elementData = (element) => {
  const rect = element.getBoundingClientRect()
  const x = rect.left + window.scrollX
  const y = rect.top + window.scrollY
  const pageHeight = document.body.scrollHeight
  const maxScale = 2
  return {
    target: element,
    x: x,
    y: centerY - rect.height / 2,
    z: Math.floor(pageHeight - y),
    width: rect.width,
    height: rect.height,
    increment: 0.1,
    maxScale: maxScale,
    scale: ((pageHeight - y) / pageHeight) * maxScale,
  }
}

const locateElements = () => {
  const elementsNodes = document.querySelectorAll("*")
  const elements = Array.from(elementsNodes)
  const result = elements.map((element) => {
    return elementData(element)
  })
  return result
}

const elements = locateElements()

elements.forEach((element) => {
  const { x, y, z, width, height, scale, target } = element
  target.style.position = "fixed"
  target.style.left = x
  target.style.top = y
  target.style.zIndex = z
  target.style.width = width
  target.style.height = height
  target.style.scale = scale
})

window.addEventListener("wheel", (event) => {
  const dir = event.deltaY < 0 ? 1 : -1
  console.log(dir)
  elements.forEach((element) => {
    const { maxScale, scale, increment, target } = element
    target.style.scale = scale + dir * increment
    if (scale > maxScale) {
      target.style.opacity = 0
      target.style.pointerEvents = "none"
    } else if (scale < 1) {
      target.style.opacity = 0
      target.style.pointerEvents = "none"
    } else {
      target.style.opacity = 1
      target.style.pointerEvents = "auto"
    }
  })
})

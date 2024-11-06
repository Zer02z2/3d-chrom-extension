const elementsNodes = document.body.querySelectorAll("*")
const elementsArray = Array.from(elementsNodes)
const elements = elementsArray.filter((element) => {
  const children = element.querySelectorAll("*")
  return Array.from(children).length === 0
})
console.log(elements)

const style = document.createElement("style")
document.head.appendChild(style)
const stylesheet = style.sheet

stylesheet.insertRule(
  "@keyframes spin {0% {transform: rotate(0);}100%{transform: rotate(360deg);}}"
)

elements.forEach((element) => {
  element.style.animation = "2s linear infinite spin"
})

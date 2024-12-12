// dynamic-font.js
const averageRatio = 0.0427

function setResponsiveFontSize() {
  const screenWidth = window.innerWidth
  let fontSize = 16

  if (screenWidth > 375 && screenWidth <= 960) {
    fontSize = screenWidth * averageRatio
  }
  else if (screenWidth <= 375) {
    fontSize = screenWidth * averageRatio
  }

  document.documentElement.style.fontSize = `${fontSize}px`
}

setResponsiveFontSize()
window.addEventListener('resize', setResponsiveFontSize)

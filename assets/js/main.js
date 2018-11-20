const scroll = () => {
  const body = document.querySelector('body')
  const bg = document.querySelectorAll('.bg')
  bg.forEach(element => {
    element.style.transform = 'translateY(' + -(body.scrollTop / 2) + 'px)'
  })
}
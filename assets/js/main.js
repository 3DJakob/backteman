const scroll = () => {
  const body = document.querySelector('body')
  const bg = document.querySelectorAll('.bg')
  bg.forEach(element => {
    element.style.transform = 'translateY(' + -(body.scrollTop / 2) + 'px)'
  })
}

const init = () => {
  renderDates()
  initiateSlideshow()
  // setBgHeight()
}

// const setBgHeight = () => {
//   const height = document.querySelector('.home').scrollHeight
//   const elements = document.querySelectorAll('.bg')
//   elements.forEach((element) => {
//     element.style.height = height + 100 + 'px'
//   })
// }

const renderDates = () => {
  const dates = [
    { day: 'Måndag', from: '7:30', to: '11:00' },
    { day: 'Tisdag', from: '9:00', to: '17:30' },
    { day: 'Onsdag', from: '7:30', to: '11:00' },
    { day: 'Torsdag', from: '9:00', to: '17:30' },
    { day: 'Fredag', from: '', to: '' }
  ]

  const today = new Date().getDay() - 1

  const renderDate = (target) => {
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i]
      const element = document.createElement('p')
      if (date.from === '') {
        element.textContent = date.day + ': stängt'
      } else {
        element.textContent = date.day + ': ' + date.from + '-' + date.to
      }
      if (i === today) {
        element.style.backgroundColor = '#668198'
        element.style.color = '#fff'
      }
      target.appendChild(element)
    }
  }

  const targets = document.querySelectorAll('.openingHours')
  targets.forEach(target => { renderDate(target) })
}

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

const initiateSlideshow = () => {
  const populateSlideshow = (slideshow) => {
    const slider = slideshow.children[0]
    let width = 0
    const children = [].slice.call(slider.children)
    children.forEach((node) => {
      width += 1
      node.style.backgroundImage = 'url(' + node.dataset.image + ')'
    })
    slider.style.width = document.querySelector('.slideshow').scrollWidth * width + 'px'
  }

  const populateButtons = (slideshow) => {
    const container = document.createElement('div')
    container.classList.add('dotContainer')
    const id = guid()
    for (let i = 0; i < slideshow.children[0].children.length; i++) {
      const bullet = document.createElement('input')
      bullet.type = 'radio'
      bullet.name = id
      if (i === 0) {
        bullet.checked = true
      }
      bullet.addEventListener('click', () => {
        goToSlide(slideshow, i)
      })
      container.appendChild(bullet)
    }
    slideshow.appendChild(container)
  }

  const slideshows = document.querySelectorAll('.slideshow')
  slideshows.forEach((slideshow) => {
    populateSlideshow(slideshow)
    populateButtons(slideshow)
  })
}

const goToSlide = (slideshow, number) => {
  slideshow.children[0].style.transform = 'translateX(' + -number * slideshow.children[0].children[0].scrollWidth + 'px)'
}

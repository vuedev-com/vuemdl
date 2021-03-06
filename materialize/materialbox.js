import Velocity from 'velocity-animate'

const inDuration = 275
const outDuration = 200

export default class MaterialBox {
  // private img
  // private placeholder
  // public overlayActive = false

  constructor (img, placeholder) {
    this.img = img
    this.placeholder = placeholder
    this.overlayActive = false
  }

  maximalize (sizes) {
    var originalWidth = sizes.width
    var originalHeight = sizes.height
    var ancestorsChanged
    var ancestor

    var windowWidth = window.innerWidth
    var windowHeight = window.innerHeight

    // Set states
    this.overlayActive = true

    // Set positioning for placeholder
    this.placeholder.style.width = this.placeholder.offsetWidth + 'px'
    this.placeholder.style.height = this.placeholder.offsetHeight + 'px'
    this.placeholder.style.position = 'relative'
    this.placeholder.style.top = 0 + 'px'
    this.placeholder.style.left = 0 + 'px'

    // Find ancestor with overflow: hidden; and remove it

    ancestorsChanged = undefined
    ancestor = this.placeholder.parentElement
    // var count = 0
    while (ancestor !== null && ancestor !== document) {
      var curr = ancestor
      if (curr.style.overflow === 'hidden') {
        curr.style.overflow = 'visible'
        if (ancestorsChanged === undefined) {
          ancestorsChanged = curr
        } else {
          ancestorsChanged = ancestorsChanged.add(curr)
        }
      }
      ancestor = ancestor.parentElement
    }

    // Set css on origin
    this.img.style.position = 'absolute'
    this.img.style.zIndex = '1003'

    // Resize Image
    var ratio = 0
    var widthPercent = originalWidth / windowWidth
    var heightPercent = originalHeight / windowHeight
    var newWidth = 0
    var newHeight = 0

    if (widthPercent > heightPercent) {
      ratio = originalHeight / originalWidth
      newWidth = windowWidth * 0.9
      newHeight = windowWidth * 0.9 * ratio
    } else {
      ratio = originalWidth / originalHeight
      newWidth = (windowHeight * 0.9) * ratio
      newHeight = windowHeight * 0.9
    }

    // Animate image + set z-index
    if (this.img.classList.contains('responsive-img')) {
      Velocity(this.img, {'max-width': newWidth, 'width': originalWidth}, {duration: 0, queue: false,
        complete: function () {
          this.img.style.left = 0 + 'px'
          this.img.style.top = 0 + 'px'
          Velocity(this.img,
            {
              height: newHeight,
              width: newWidth,
              left: window.scrollX + windowWidth / 2 - this.placeholder.offsetLeft - newWidth / 2,
              top: window.scrollY + windowHeight / 2 - this.placeholder.offsetTop - newHeight / 2
            },
            {
              duration: inDuration,
              queue: false,
              easing: 'easeOutQuad'
            }
          )
        } // End Complete
      }) // End Velocity
    } else {
      this.img.style.left = 0 + 'px'
      this.img.style.top = 0 + 'px'
      Velocity(this.img,
        {
          height: newHeight,
          width: newWidth,
          left: window.scrollX + windowWidth / 2 - this.placeholder.offsetLeft - newWidth / 2,
          top: window.scrollY + windowHeight / 2 - this.placeholder.offsetTop - newHeight / 2
        },
        {
          duration: inDuration,
          queue: false,
          easing: 'easeOutQuad'
        }
      ) // End Velocity
    }

    // Return on scroll
    window.addEventListener('scroll', function () {
      if (this.overlayActive) {
        this.returnToOriginal()
      }
    })
  }

  close (sizes) {
    this.returnToOriginal(sizes)
  }

  returnToOriginal (sizes) {
    // var windowWidth = window.innerWidth
    // var windowHeight = window.innerHeight
    var originalWidth = sizes.width
    var originalHeight = sizes.height

    Velocity(this.img, 'stop', true)

    // Resize Image
    Velocity(this.img,
      {
        width: originalWidth,
        height: originalHeight,
        left: 0,
        top: 0
      },
      {
        duration: outDuration,
        queue: false, easing: 'easeOutQuad'
      }
    )

    this.img.style.height = ''
    this.img.style.top = ''
    this.img.style.left = ''
    this.img.style.width = ''
    this.img.style.maxWidth = ''
    this.img.style.position = ''
    this.img.style.zIndex = ''
  }
}

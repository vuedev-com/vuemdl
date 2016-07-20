/**
 * Created by teddyzhu on 16/4/12.
 */
/*!
 * Waves v0.7.5
 * http://fian.my.id/Waves
 *
 * Copyright 2014-2016 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */
// require('./waves.css');
module.exports = function (Vue) {
  var toString = Object.prototype.toString
  var isTouchAvailable = 'ontouchstart' in window

  // Find exact position of element
  function isWindow (obj) {
    return obj !== null && obj === obj.window
  }

  function getWindow (elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView
  }

  function offset (elem) {
    var docElem
    var win
    var box = {top: 0, left: 0}
    var doc = elem && elem.ownerDocument

    docElem = doc.documentElement

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect()
    }

    win = getWindow(doc)
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    }
  }

  function convertStyle (styleObj) {
    var style = ''

    for (var prop in styleObj) {
      if (styleObj.hasOwnProperty(prop)) {
        style += (prop + ':' + styleObj[prop] + ';')
      }
    }

    return style
  }

  var Effect = {
    // Effect duration
    duration: 750,

    // Effect delay (check for scroll before showing effect)
    delay: 200,

    show: function (e, element, velocity) {
      // Disable right click
      if (e.button === 2) {
        return false
      }

      element = element || this

      // Create ripple
      var ripple = document.createElement('div')
      ripple.className = 'waves-ripple waves-rippling'
      element.appendChild(ripple)

      // Get click coordinate and element width
      var pos = offset(element)
      var relativeY = 0
      var relativeX = 0
      // Support for touch devices
      if ('touches' in e && e.touches.length) {
        relativeY = (e.touches[0].pageY - pos.top)
        relativeX = (e.touches[0].pageX - pos.left)
      } else { // Normal case
        relativeY = (e.pageY - pos.top)
        relativeX = (e.pageX - pos.left)
      }
      // Support for synthetic events
      relativeX = relativeX >= 0 ? relativeX : 0
      relativeY = relativeY >= 0 ? relativeY : 0

      var scale = 'scale(' + ((element.clientWidth / 100) * 3) + ')'
      var translate = 'translate(0,0)'

      if (velocity) {
        translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)'
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now())
      ripple.setAttribute('data-x', relativeX)
      ripple.setAttribute('data-y', relativeY)
      ripple.setAttribute('data-scale', scale)
      ripple.setAttribute('data-translate', translate)

      // Set ripple position
      var rippleStyle = {
        top: relativeY + 'px',
        left: relativeX + 'px'
      }

      ripple.classList.add('waves-notransition')
      ripple.setAttribute('style', convertStyle(rippleStyle))
      ripple.classList.remove('waves-notransition')

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale + ' ' + translate
      rippleStyle['-moz-transform'] = scale + ' ' + translate
      rippleStyle['-ms-transform'] = scale + ' ' + translate
      rippleStyle['-o-transform'] = scale + ' ' + translate
      rippleStyle.transform = scale + ' ' + translate
      rippleStyle.opacity = '1'

      var duration = e.type === 'mousemove' ? 2500 : Effect.duration
      rippleStyle['-webkit-transition-duration'] = duration + 'ms'
      rippleStyle['-moz-transition-duration'] = duration + 'ms'
      rippleStyle['-o-transition-duration'] = duration + 'ms'
      rippleStyle['transition-duration'] = duration + 'ms'

      ripple.setAttribute('style', convertStyle(rippleStyle))
    },

    hide: function (e, element) {
      element = element || this

      var ripples = element.getElementsByClassName('waves-rippling')

      for (var i = 0, len = ripples.length; i < len; i++) {
        removeRipple(e, element, ripples[i])
      }
    }
  }

    /**
     * Collection of wrapper for HTML element that only have single tag
     * like <input> and <img>
     */
  var TagWrapper = {

    // Wrap <input> tag so it can perform the effect
    input: function (element) {
      var parent = element.parentNode

      // If input already have parent just pass through
      if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
        return
      }

      // Put element class and style to the specified parent
      var wrapper = document.createElement('i')
      wrapper.className = element.className + ' waves-input-wrapper'
      element.className = 'waves-button-input'

      // Put element as child
      parent.replaceChild(wrapper, element)
      wrapper.appendChild(element)

      // Apply element color and background color to wrapper
      var elementStyle = window.getComputedStyle(element, null)
      var color = elementStyle.color
      var backgroundColor = elementStyle.backgroundColor

      wrapper.setAttribute('style', 'color:' + color + ';background:' + backgroundColor)
      element.setAttribute('style', 'background-color:rgba(0,0,0,0);')
    },

    // Wrap <img> tag so it can perform the effect
    img: function (element) {
      var parent = element.parentNode

      // If input already have parent just pass through
      if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
        return
      }

      // Put element as child
      var wrapper = document.createElement('i')
      parent.replaceChild(wrapper, element)
      wrapper.appendChild(element)
    }
  }

  /**
   * Hide the effect and remove the ripple. Must be
   * a separate function to pass the JSLint...
   */
  function removeRipple (e, el, ripple) {
    // Check if the ripple still exist
    if (!ripple) {
      return
    }

    ripple.classList.remove('waves-rippling')

    var relativeX = ripple.getAttribute('data-x')
    var relativeY = ripple.getAttribute('data-y')
    var scale = ripple.getAttribute('data-scale')
    var translate = ripple.getAttribute('data-translate')

    // Get delay beetween mousedown and mouse leave
    var diff = Date.now() - Number(ripple.getAttribute('data-hold'))
    var delay = 350 - diff

    if (delay < 0) {
      delay = 0
    }

    if (e.type === 'mousemove') {
      delay = 150
    }

    // Fade out ripple after delay
    var duration = e.type === 'mousemove' ? 2500 : Effect.duration

    setTimeout(function () {
      var style = {
        top: relativeY + 'px',
        left: relativeX + 'px',
        opacity: '0',

        // Duration
        '-webkit-transition-duration': duration + 'ms',
        '-moz-transition-duration': duration + 'ms',
        '-o-transition-duration': duration + 'ms',
        'transition-duration': duration + 'ms',
        '-webkit-transform': scale + ' ' + translate,
        '-moz-transform': scale + ' ' + translate,
        '-ms-transform': scale + ' ' + translate,
        '-o-transform': scale + ' ' + translate,
        'transform': scale + ' ' + translate
      }

      ripple.setAttribute('style', convertStyle(style))

      setTimeout(function () {
        try {
          el.removeChild(ripple)
        } catch (e) {
          return false
        }
      }, duration)
    }, delay)
  }

  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {

    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,

    allowEvent: function (e) {
      var allow = true

      if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
        allow = false
      }

      return allow
    },

    registerEvent: function (e) {
      var eType = e.type

      if (eType === 'touchstart') {
        TouchHandler.touches += 1 // push
      } else if (/^(touchend|touchcancel)$/.test(eType)) {
        setTimeout(function () {
          if (TouchHandler.touches) {
            TouchHandler.touches -= 1 // pop after 500ms
          }
        }, 500)
      }
    }
  }

  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  // function getWavesEffectElement (e) {
  //   if (TouchHandler.allowEvent(e) === false) {
  //       return null
  //   }

  //   return e
  // }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect (e, element) {
    // Disable effect if element has "disabled" property on it
    // In some cases, the event is not triggered by the current element
    // if (e.target.getAttribute('disabled') !== null) {
    //     return;
    // }
    if (element !== null) {
      // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
      if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
        return
      }

      TouchHandler.registerEvent(e)

      if (e.type === 'touchstart' && Effect.delay) {
        var hidden = false

        var timer = setTimeout(function () {
          timer = null
          Effect.show(e, element)
        }, Effect.delay)

        var hideEffect = function (hideEvent) {
          // if touch hasn't moved, and effect not yet started: start effect now
          if (timer) {
            clearTimeout(timer)
            timer = null
            Effect.show(e, element)
          }
          if (!hidden) {
            hidden = true
            Effect.hide(hideEvent, element)
          }
        }

        var touchMove = function (moveEvent) {
          if (timer) {
            clearTimeout(timer)
            timer = null
          }
          hideEffect(moveEvent)
        }

        element.addEventListener('touchmove', touchMove, false)
        element.addEventListener('touchend', hideEffect, false)
        element.addEventListener('touchcancel', hideEffect, false)
      } else {
        Effect.show(e, element)

        if (isTouchAvailable) {
          element.addEventListener('touchend', Effect.hide, false)
          element.addEventListener('touchcancel', Effect.hide, false)
        }

        element.addEventListener('mouseup', Effect.hide, false)
        element.addEventListener('mouseleave', Effect.hide, false)
      }
    }
  }

  Vue.directive('waves', {
    name: 'waves',
    version: '0.7.5',

    bind: function () {
      var classes = this.expression

      if (toString.call(classes) === '[object Array]') {
        classes = classes.join(' ')
      }

      classes = classes ? ' ' + classes : ''

      var element = this.el
      var tagName

      tagName = element.tagName.toLowerCase()

      if (['input', 'img'].indexOf(tagName) !== -1) {
        TagWrapper[tagName](element)
        element = element.parentElement
      }

      if (element.className.indexOf('waves-effect') === -1) {
        element.className += ' waves-effect' + classes
      }

      this.show = function (e) {
        return showEffect(e, element)
      }

      if (isTouchAvailable) {
        element.addEventListener('touchstart', this.show, false)
        element.addEventListener('touchcancel', TouchHandler.registerEvent, false)
        element.addEventListener('touchend', TouchHandler.registerEvent, false)
      }

      element.addEventListener('mousedown', this.show, false)
    },

    unbind: function () {
      var mouseup = {
        type: 'mouseup',
        button: 1
      }

      Effect.hide(mouseup, this.el)
    }
  })
}
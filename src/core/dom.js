class Dom {
  constructor(selector) {
    if (typeof selector === 'string') {
      // #app
      this.$el = document.querySelector(selector)
    } else {
      this.$el = selector
    }
  }

  html(content) {
    if (typeof content === 'string') {
      this.$el.innerHTML = content
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    this.$el.append(node)
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = function (tagName, className = '') {
  const el = document.createElement(tagName)
  if (className) {
    el.classList.add(className)
  }
  return $(el)
}

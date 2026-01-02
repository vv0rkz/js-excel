import { $ } from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.selector = selector
    this.$el = $(selector)

    if (!this.$el) {
      console.error(`Element ${selector} not found`)
      console.log('document', document)
      return
    }

    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    this.components.forEach((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
  }
}

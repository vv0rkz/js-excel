export class Excel {
  constructor(selector, options) {
    this.selector = selector
    this.$el = document.querySelector(selector)

    if (!this.$el) {
      console.error(`Element ${selector} not found`)
      console.log('document', document)
      return
    }

    this.components = options.components || []
  }

  getRoot() {
    const $root = document.createElement('div')
    console.log('this.components', this.components)
    this.components.forEach((Component) => {
      const component = new Component()
      // console.log(component.toHTML())
      $root.insertAdjacentHTML('afterbegin', component.toHTML())
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
  }
}

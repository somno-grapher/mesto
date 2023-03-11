export default class Section {

  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element, isPrepending) {
    if (isPrepending) {
      this._container.prepend(element);
    }
    else {
      this._container.append(element);
    }
  }

  generateAndAddInitialItems(items) {
    items.forEach(item => this._renderer(item));
  }

}

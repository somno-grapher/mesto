export default class Section {

  constructor({ items, renderer }, selector) {
    this._items = items;
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

  generateAndAddInitialItems() {
    this._items.forEach(item => this._renderer(item));
  }

}

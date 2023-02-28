export default class Popup {

  constructor(selector) {
    this._closeButtonClass = 'popup__close-button';
    this._escKey = 'Escape';
    this._popupElement = document.querySelector(selector);
    this._popupOpenedClass = 'popup_opened';
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === this._escKey) {
      this.close();
    };
  }

  close() {
    this._popupElement.classList.remove(this._popupOpenedClass);
    document.removeEventListener('keyup', this._handleEscClose);
  }

  open() {
    this._popupElement.classList.add(this._popupOpenedClass);
    document.addEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (event) => {
      if ((event.currentTarget === event.target) || (event.target.classList.contains(this._closeButtonClass))) {
        this.close();
      }
    });
  }

}

class Card {

  constructor(item, cardSettings, openPopup) {
    // vars: pseudo-ascending order

    // root vars derived from parameters
    this._item = item;
    this._cardSettings = cardSettings;
    this._openPopup = openPopup;

    // root vars derived from document and this._cardSettings
    this._cardTemplate = document.querySelector(this._cardSettings.templateSelector).content.querySelector(this._cardSettings.itemSelector);
    this._showPhotoPopup = document.querySelector(this._cardSettings.showPhotoPopupSelector);

    // root vars derived from this._cardTemplate
    this._card = this._cardTemplate.cloneNode(true);

    // root vars derived from this._card and this._cardSettings
    this._deleteButton = this._card.querySelector(this._cardSettings.deleteButtonSelector);
    this._likeButton = this._card.querySelector(this._cardSettings.likeButtonSelector);
    this._photo = this._card.querySelector(this._cardSettings.photoSelector);
    this._title = this._card.querySelector(this._cardSettings.titleSelector);

    // root vars derived from this._showPhotoPopup and this._cardSettings
    this._fullPhoto = this._showPhotoPopup.querySelector(this._cardSettings.fullPhotoSelector);
    this._fullPhotoTitle = this._showPhotoPopup.querySelector(this._cardSettings.fullPhotoTitle);

    // this._photo properties derived from this._item
    this._photo.alt = this._item.name;
    this._photo.src = this._item.link;

    // this._title properties derived from this._item
    this._title.textContent = this._item.name;


    // main code
    this._photo.classList.add(this._cardSettings.interactiveElementClass);
    this._setEventListeners();
  }


  // private methods: ascending order

  _handleLikedCard() {
    this._likeButton.addEventListener('click', (event) => {
      event.target.classList.toggle(this._cardSettings.likeButtonLikedClass);
    });
  }

  _handleRemoveCard() {
    this._deleteButton.addEventListener('click', () => {
      this._card.remove();
    });
  }

  _handleShowPhoto() {
    this._photo.addEventListener('click', () => {
      this._fullPhoto.src = this._item.link;
      this._fullPhoto.alt = this._item.name;
      this._fullPhotoTitle.textContent = this._item.name;
      this._openPopup(this._showPhotoPopup);
    });
  }

  _setEventListeners() {
    this._handleLikedCard();
    this._handleRemoveCard();
    this._handleShowPhoto();
  }


  // public methods: ascending order

  generateCard() {
    return this._card;
  }

}

export { Card };

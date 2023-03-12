export default class Card {

  constructor(item, currentUserId, cardSettings, handleCardClick) {
    // vars: pseudo-ascending order

    // root vars derived from parameters
    this._item = item;
    this._cardSettings = cardSettings;
    this._handleCardClick = handleCardClick;
    this._isOwner = this._item.owner._id === currentUserId;

    // root vars derived from document and this._cardSettings
    this._cardTemplate = document.querySelector(this._cardSettings.templateSelector).content.querySelector(this._cardSettings.itemSelector);

    // root vars derived from this._cardTemplate
    this._card = this._cardTemplate.cloneNode(true);

    // root vars derived from this._card and this._cardSettings
    this._deleteButton = this._card.querySelector(this._cardSettings.buttonDeleteSelector);
    this._likeButton = this._card.querySelector(this._cardSettings.buttonLikeSelector);
    this._photo = this._card.querySelector(this._cardSettings.photoSelector);
    this._title = this._card.querySelector(this._cardSettings.titleSelector);

    // this._photo properties derived from this._item
    this._photo.alt = this._item.name;
    this._photo.src = this._item.link;

    // this._title properties derived from this._item
    this._title.textContent = this._item.name;


    // main code
    if (!this._isOwner) {
      this._deleteButton.classList.add(this._cardSettings.buttonDeleteHiddenClass);
    }
    this._setEventListeners();
  }


  // private methods: ascending order

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle(this._cardSettings.buttonLikeLikedClass);
  }

  _handleDeleteButtonClick() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
    if (this._isOwner) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick();
      });
    }
    this._photo.addEventListener('click', () => {
      this._handleCardClick(this._item);
    });
  }


  // public methods: ascending order

  generateCardElement() {
    return this._card;
  }

}

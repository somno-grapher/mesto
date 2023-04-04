export default class Card {

  constructor(item, currentUserId, cardSettings, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick) {
    // vars: pseudo-ascending order

    // root vars derived from parameters
    this._item = item;
    this._cardSettings = cardSettings;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._isOwner = this._item.owner._id === currentUserId;
    this._currentUserId = currentUserId;

    // root vars derived from document and this._cardSettings
    this._cardTemplate = document.querySelector(this._cardSettings.templateSelector).content.querySelector(this._cardSettings.itemSelector);

    // root vars derived from this._cardTemplate
    this._card = this._cardTemplate.cloneNode(true);

    // root vars derived from this._card and this._cardSettings
    this._counterLikes = this._card.querySelector(this._cardSettings.likesCounterSelector);
    this._deleteButton = this._card.querySelector(this._cardSettings.buttonDeleteSelector);
    this._likeButton = this._card.querySelector(this._cardSettings.buttonLikeSelector);
    this._photo = this._card.querySelector(this._cardSettings.imageSelector);
    this._title = this._card.querySelector(this._cardSettings.titleSelector);

    // this._photo properties derived from this._item
    this._photo.alt = this._item.name;
    this._photo.src = this._item.link;

    // this._title properties derived from this._item
    this._title.textContent = this._item.name;
  }


  // private methods: ascending order

  _checkLikeOnCardGeneration() {
    const isLiked = this._item.likes.some(like => {
      return like._id === this._currentUserId;
    });
    return isLiked;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this);
    });
    if (this._isOwner) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick(this);
      });
    }
    this._photo.addEventListener('click', () => {
      this._handleCardClick(this._item);
    });
  }

  _setLikeOnCardGeneration(isLiked) {
    if (isLiked) {
      this._likeButton.classList.add(this._cardSettings.buttonLikeLikedClass);
    };
  }


  // public methods: ascending order

  checkLikeOnLike() {
    return this._likeButton.classList.contains(this._cardSettings.buttonLikeLikedClass);
  }

  deleteCardElement() {
    this._card.remove();
    this._card = null;
  }

  createElement() {
    if (!this._isOwner) {
      this._deleteButton.classList.add(this._cardSettings.buttonDeleteHiddenClass);
    };
    const isLiked = this._checkLikeOnCardGeneration();
    this._setLikeOnCardGeneration(isLiked);
    this.setCounterLikes(this._item);
    this._setEventListeners();
    return this._card;
  }

  getId() {
    return this._item._id;
  }

  toggleLike() {
    this._likeButton.classList.toggle(this._cardSettings.buttonLikeLikedClass);
  }

  setCounterLikes(item) {
    this._counterLikes.textContent = item.likes.length;
  }

}

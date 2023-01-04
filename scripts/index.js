// * consts and vars: scope descending then alphabeticaly ascending

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardTitleQuerySelector = '.card__title';
const cardPhotoQuerySelector = '.card__photo';

//document scope
const popupTypeAddCard = document.querySelector('.popup_type_add-card');
const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
const popupTypePhoto = document.querySelector('.popup_type_photo');
const photoGridList = document.querySelector('.photo-grid__list');
const addButtonTypeCard = document.querySelector('.add-button_type_card');
const editButtonTypeProfile = document.querySelector('.edit-button_type_profile');
const profileAbout = document.querySelector('.profile__about');
const profileName = document.querySelector('.profile__name');

// photoGridList scope
// TODO: check .querySelector('.card')
const cardTemplate = photoGridList.querySelector('#card-template').content.querySelector('.card');

// popupTypeAddCard scope
const popupTypeAddCardCloseButton = popupTypeAddCard.querySelector('.popup__close-button');
const popupTypeAddCardForm = popupTypeAddCard.querySelector('.popup__form');

// popupTypeAddCardForm scope
const inputFieldNameCardTitle = popupTypeAddCardForm.querySelector('.input-field_name_card-title');
const inputFieldNameCardPhotoLink = popupTypeAddCardForm.querySelector('.input-field_name_card-photo-link');

// popupTypePhoto scope
const largePhoto = popupTypePhoto.querySelector('.large-photo');
const popupTypePhotoTitle = popupTypePhoto.querySelector('.popup__title');
const popupTypePhotoCloseButton = popupTypePhoto.querySelector('.popup__close-button');

// popupTypeEditProfile scope
const popupTypeEditProfileCloseButton = popupTypeEditProfile.querySelector('.popup__close-button');
const popupTypeEditProfileForm = popupTypeEditProfile.querySelector('.popup__form');

// popupTypeEditProfileForm scope
const inputFieldNameProfileAbout = popupTypeEditProfileForm.querySelector('.input-field_name_profile-about');
const inputFieldNameProfileName = popupTypeEditProfileForm.querySelector('.input-field_name_profile-name');

// * functions: ascending order

function addCard(container, template, titleQuerySelector, photoQuerySelector, cardTitle, cardLink, prepend) {

  // create card
  const card = template.cloneNode(true);
  const deleteButton = card.querySelector('.delete-button');
  const likeButton = card.querySelector('.like-button');
  const photo = card.querySelector(photoQuerySelector);
  const title = card.querySelector(titleQuerySelector);
  photo.src = cardLink;
  photo.alt = cardTitle;
  photo.classList.add('mix-interactive-element');
  title.textContent = cardTitle;

  //insert event listeners
  deleteButton.addEventListener('click', () => {
    card.remove();
  });
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('like-button_active');
  });
  photo.addEventListener('click', () => {
    largePhoto.src = cardLink;
    largePhoto.alt = cardTitle;
    popupTypePhotoTitle.textContent = cardTitle;
    openPopup(popupTypePhoto);
  });

  // insert card
  if (prepend) {
    container.prepend(card);
  } else {
    container.append(card);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handlePopupTypeAddCardFormSubmit(event) {
  event.preventDefault();
  addCard(photoGridList, cardTemplate, cardTitleQuerySelector, cardPhotoQuerySelector, inputFieldNameCardTitle.value, inputFieldNameCardPhotoLink.value, true);
  popupTypeAddCardForm.reset();
  closePopup(popupTypeAddCard);
}

function handlePopupTypeEditProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputFieldNameProfileName.value;
  profileAbout.textContent = inputFieldNameProfileAbout.value;
  closePopup(popupTypeEditProfile);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}


// * event listeners: ascending order

popupTypePhotoCloseButton.addEventListener('click', () => {
  closePopup(popupTypePhoto);
});

popupTypeAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupTypeAddCard);
});

popupTypeEditProfileCloseButton.addEventListener('click', () => {
  closePopup(popupTypeEditProfile);
});

popupTypeAddCardForm.addEventListener('submit', handlePopupTypeAddCardFormSubmit);

popupTypeEditProfileForm.addEventListener('submit', handlePopupTypeEditProfileFormSubmit);

addButtonTypeCard.addEventListener('click', () => {
  openPopup(popupTypeAddCard);
});

editButtonTypeProfile.addEventListener('click', () => {
  openPopup(popupTypeEditProfile);
  inputFieldNameProfileName.value = profileName.textContent;
  inputFieldNameProfileAbout.value = profileAbout.textContent;
});


// * main code

// insert initial cards
initialCards.forEach(item => {
  addCard(photoGridList, cardTemplate, cardTitleQuerySelector, cardPhotoQuerySelector, item.name, item.link, false);
});

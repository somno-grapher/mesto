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
const photoGridList = document.querySelector('.photo-grid__list');
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
let profileAbout = document.querySelector('.profile__about');
let profileName = document.querySelector('.profile__name');

// photoGridList scope
// TODO: check .querySelector('.card')
const cardTemplate = photoGridList.querySelector('#card-template').content.querySelector('.card');

// popup scope
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__container');

// popupForm scope
let popupAboutInput = popupForm.querySelector('.input-field_name_profile-about');
let popupNameInput = popupForm.querySelector('.input-field_name_profile-name');


// * functions: ascending order

function addCard(container, template, titleQuerySelector, photoQuerySelector, title, link) {
  // create card
  const card = template.cloneNode(true);
  card.querySelector(titleQuerySelector).textContent = title;
  card.querySelector(photoQuerySelector).src = link;
  // insert card
  container.append(card);
  return card;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileAbout.textContent = popupAboutInput.value;
  closePopup(popup);
}


// * event listeners: ascending order

popupForm.addEventListener('submit', handleFormSubmit);

popupCloseButton.addEventListener('click', function () {
  closePopup(popup);
});

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
});


// * main code

// insert initial cards
initialCards.forEach(item => {
  addCard(photoGridList, cardTemplate, cardTitleQuerySelector, cardPhotoQuerySelector, item.name, item.link);
});

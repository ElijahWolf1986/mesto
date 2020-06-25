import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Задан массив карточек
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

const formValidationOptionsNew = { //Задан массив настроек для валидации форм
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Выбор элементов для работы с окном "Новое место"
const popupPlace = document.querySelector('#popup-place');
const addButton = document.querySelector('.profile__add-button');
const popupFormPlace = document.forms.popup_place_form;
const buttonSave = popupFormPlace.querySelector('.popup__button-save');
const place = popupFormPlace.elements.place;
const url = popupFormPlace.elements.url;
const gallery = document.querySelector('.gallery');

// Выбор элементов для работы с окном "Редактировать профиль"
const popupAuthor = document.querySelector('#popup-author');
const editButton = document.querySelector('.profile__info-edit-button');
const profileUserName = document.querySelector('.profile__info-title');
const profileMetier = document.querySelector('.profile__info-subtitle');
const popupFormAuthor = document.forms.popup_author_form;
const userName = popupFormAuthor.elements.author;
const metier = popupFormAuthor.elements.metier;
const buttonSaveAuthor = popupFormAuthor.querySelector('.popup__button-save');

function closeByOverlay() { //Функция закрытия попапа по клику на овелей
    const overlay = Array.from(document.querySelectorAll('.popup__overlay'));
    overlay.forEach(function (overlayItem) {
        overlayItem.addEventListener('click', (evt) => { popupClose(evt.target.closest('.popup')) });
    });
}

function closeByEsc(evt) { //Функция закрытия попапа по клику клавиши Esc
    const openedPopup = document.querySelector('.popup_state_opened')
    if (evt.key === 'Escape' && (openedPopup)) {
        popupClose(openedPopup);
    }
}

function popupOpen(el) { //Функция открытия попапа 
    el.classList.add('popup_state_opened');
    document.addEventListener('keydown', closeByEsc);
}

function popupClose(el) { //Функция закрытия попапа
    el.classList.remove('popup_state_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function closeButtons() { //Функция работы закрывающих кнопок на попапах
    const closeButton = Array.from(document.querySelectorAll('.popup__close-icon'));
    closeButton.forEach(function (item) {
        item.addEventListener('click', (evt) => popupClose(evt.target.closest('.popup')));
    });
}

function fillPopupAuthor() { // Функция открытия попапа автор
    userName.value = profileUserName.textContent;
    metier.value = profileMetier.textContent;
    popupOpen(popupAuthor);
    const formValidator = new FormValidator(formValidationOptionsNew, popupFormAuthor);
    formValidator.enableButtonState(buttonSaveAuthor);
}

function forSubmitHandler(evt) { // Функция изменения данных по Автору
    evt.preventDefault();
    profileUserName.textContent = userName.value;
    profileMetier.textContent = metier.value;
    popupClose(popupAuthor);
}

function forAddNewCard(evt) { // Функция добавления новой карточки пользователя в начало показа
    evt.preventDefault();
    const card = new Card(place.value, url.value, '#card');
    const cardElement = card.createNewCard();
    gallery.prepend(cardElement);
    place.value = '';
    url.value = '';
    buttonSave.classList.add('popup__button-save_disabled');
    buttonSave.setAttribute('disabled', true);
    popupClose(popupPlace);
}


function renderCards(el) { // Функция вывода карточек на экран пользователя
    el.forEach((item) => {
        const card = new Card(item.name, item.link, '#card');
        const cardElement = card.createNewCard();
        gallery.append(cardElement);
    });
}

function activateValidation(options) { // Функция активирования валидации форм 
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const formValidator = new FormValidator(options, formElement);
        formValidator.enableValidation();
    });
}

// Исполнение задач на странице пользователя:
activateValidation(formValidationOptionsNew);
renderCards(initialCards);
closeByOverlay();
closeButtons();
editButton.addEventListener('click', fillPopupAuthor); //Кнопка открытия редактирования автора
addButton.addEventListener('click', () => { popupOpen(popupPlace) }); //Кнопка открытия редактирования карточек
popupFormAuthor.addEventListener('submit', forSubmitHandler); //Работа кнопки "Сохранить" по событию submit
popupFormPlace.addEventListener('submit', forAddNewCard); //Работа кнопки "Создать" по событию submit



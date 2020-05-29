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

// Выбор элементов для работы с окном "Новое место"
const popupPlace = document.querySelector('#popup-place');
const addButton = document.querySelector('.profile__add-button'); 
const closePlaceButton = popupPlace.querySelector('.popup__close-icon');
const popupFormPlace = document.forms.popup_place_form; 
const place = popupFormPlace.elements.place; 
const url = popupFormPlace.elements.url; 
const gallery = document.querySelector('.gallery'); 
const cardTemplate = document.querySelector('#card').content; 

// Выбор элементов для работы с окном "Редактировать профиль"
const popupAuthor = document.querySelector('#popup-author'); 
const editButton = document.querySelector('.profile__info-edit-button'); 
const closeButtonAuthor = popupAuthor.querySelector('.popup__close-icon'); 
const profileUserName = document.querySelector('.profile__info-title'); 
const profileMetier = document.querySelector('.profile__info-subtitle'); 
const popupFormAuthor = document.forms.popup_author_form; 
const userName = popupFormAuthor.elements.author; 
const metier = popupFormAuthor.elements.metier; 

//Выбор элементов для работы с "Обзорынм окном"
const popupView = document.querySelector('#popup-view');
const closeViewButton = popupView.querySelector('.popup__close-icon');
const popupImgView = popupView.querySelector('.popup__img-view');
const popupTitleView = popupView.querySelector('.popup__title-view');
const newCard = 0;

function forSubmitHandler (evt) { // Функция изменения данных по Автору
    evt.preventDefault();
    profileUserName.textContent = userName.value; 
    profileMetier.textContent = metier.value;
    popupCloseOpen (popupAuthor);   
}

function popupCloseOpen (el) { //Функция открытия/закрытия всплывающих окон
    el.classList.toggle('popup_state_opened');
}

function cardDelete (evt) { //Функция удаления карточек
    evt.target.closest('.card').remove();
}

function cardLike (evt) { //Функция лайка карточек
    evt.target.closest('.card__like').classList.toggle('card__like_state_active');
}

function createNewCard (name, link) { // Функция создания новой карточки: получаем шаблон, собираем карточку, устанавливаем слушатели
    const newCard = cardTemplate.cloneNode(true); //Клонирование шаблона
    const cardTitle = newCard.querySelector('.card__title');
    const cardImg = newCard.querySelector('.card__img');
    cardTitle.textContent = name;
    cardImg.src = link;
    cardImg.alt = name;
    const delButton = newCard.querySelector('.card__trash');
    delButton.addEventListener('click',  cardDelete);
    const likeButton = newCard.querySelector('.card__like');
    likeButton.addEventListener('click', cardLike);
    const imgButton = newCard.querySelector('.card__img');
    imgButton.addEventListener('click', cardView);
    return newCard;
}

function putCard (el) { //Функция добавления карточки в разметку в конец показа
    gallery.append(createNewCard(el.name, el.link));
}

function renderCards () { //Функция вывода карточек на экран
    initialCards.forEach(putCard);
}

function forAddNewCard (evt) { // Функция добавления новой карточки пользователя в начало показа
    evt.preventDefault();  
    gallery.prepend(createNewCard(place.value, url.value));
    place.value = '';
    url.value = '';
    popupCloseOpen(popupPlace);
}

function cardView (evt) { //Функция открытия карточки 
    popupImgView.src = evt.target.closest('.card__img').src;
    popupImgView.alt = evt.target.closest('.card__img').alt;
    popupTitleView.textContent =  evt.target.closest('.card__img').alt;
    popupCloseOpen (popupView);
}

// Исполнение задач на странице пользователя:
renderCards(initialCards);
closeButtonAuthor.addEventListener('click', () => {popupCloseOpen(popupAuthor)}); //Кнопка закрытия редактирования автора
editButton.addEventListener('click', function () { //Кнопка открытия редактирования автора
        userName.value = profileUserName.textContent;
        metier.value = profileMetier.textContent;
        popupCloseOpen(popupAuthor);    
});
closePlaceButton.addEventListener('click', () => {popupCloseOpen(popupPlace)}); //Кнопка закрытия редактирования карточек
addButton.addEventListener('click', () => {popupCloseOpen(popupPlace)}); //Кнопка открытия редактирования карточек
closeViewButton.addEventListener('click', () => {popupCloseOpen(popupView)}); //Кнопка закрытия карточки
popupFormAuthor.addEventListener('submit', forSubmitHandler); //Работа кнопки "Сохранить" по событию submit
popupFormPlace.addEventListener('submit', forAddNewCard); //Работа кнопки "Создать" по событию submit

    
    




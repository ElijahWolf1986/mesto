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
const popupPlace = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button'); 
const closePlaceButton = popupPlace.querySelector('.popup__close-icon');
const popupFormPlace = document.forms.popupPlaceForm; 
let place = popupFormPlace.elements.place; 
let url = popupFormPlace.elements.url; 
const gallery = document.querySelector('.gallery'); 
const cardTemplate = document.querySelector('#card').content; 

// Выбор элементов для работы с окном "Редактировать профиль"
const popupAuthor = document.querySelector('#popupAuthor'); 
const editButton = document.querySelector('.profile__info-edit-button'); 
const closeButtonAuthor = popupAuthor.querySelector('.popup__close-icon'); 
let profileUserName = document.querySelector('.profile__info-title'); 
let profileMetier = document.querySelector('.profile__info-subtitle'); 
const popupFormAuthor = document.forms.popupAuthorForm; 
let userName = popupFormAuthor.elements.author; 
let metier = popupFormAuthor.elements.metier; 


//Выбор элементов для работы с "Обзорынм окном"
const popupView = document.querySelector('#popupView');
const closeViewButton = popupView.querySelector('.popup__close-icon');


// Функция вывода массива на экран
function render () {
    initialCards.forEach(function (el) {
        const newCard = cardTemplate.cloneNode(true); //Клонирование шаблона
        newCard.querySelector('.gallery__title').textContent = el.name;
        newCard.querySelector('.gallery__img').src = el.link;
        newCard.querySelector('.gallery__img').alt = el.name;
        const delButton = newCard.querySelector('.gallery__trash');
        delButton.addEventListener('click',  (evt) => { evt.target.closest('.gallery__element').remove()});
        const likeButton = newCard.querySelector('.gallery__like');
        likeButton.addEventListener('click',  (evt) => { evt.target.closest('.gallery__like').classList.toggle('gallery__like_state_active')});
        const imgButton = newCard.querySelector('.gallery__img');
        imgButton.addEventListener('click', function (evt) {
            popupView.querySelector('.popup__img-view').src = evt.target.closest('.gallery__img').src;
            popupView.querySelector('.popup__img-view').alt = evt.target.closest('.gallery__img').alt;
            popupView.querySelector('.popup__title-view').textContent =  evt.target.closest('.gallery__img').alt;
            popupCloseOpen (popupView);
        });
        gallery.append(newCard);
    } );
}

function popupCloseOpen (el) { // Функция Открытия/Закрытия всплывющих окон (Универсальная)
    if (el === popupAuthor) {
        userName.value = profileUserName.textContent;
        metier.value = profileMetier.textContent;
        el.classList.toggle('popup_state_opened');  
    } else  el.classList.toggle('popup_state_opened');    
}

function forSubmitHandler (evt) { // Функция изменения данных по Автору
    evt.preventDefault();
    profileUserName.textContent = userName.value; 
    profileMetier.textContent = metier.value;
    popupCloseOpen (popupAuthor);   
}

function addNewCard (name, link) { // Функция создания новой карточки
    const newCard = cardTemplate.cloneNode(true); //Клонирование шаблона
    newCard.querySelector('.gallery__title').textContent = name;
    newCard.querySelector('.gallery__img').src = link;
    newCard.querySelector('.gallery__img').alt = name;
    const delButton = newCard.querySelector('.gallery__trash');
    delButton.addEventListener('click',  (evt) => { evt.target.closest('.gallery__element').remove()});
    const likeButton = newCard.querySelector('.gallery__like');
    likeButton.addEventListener('click',  (evt) => { evt.target.closest('.gallery__like').classList.toggle('gallery__like_state_active')});
    const imgButton = newCard.querySelector('.gallery__img');
    imgButton.addEventListener('click', function (evt) {
        popupView.querySelector('.popup__img-view').src = evt.target.closest('.gallery__img').src;
        popupView.querySelector('.popup__img-view').alt = evt.target.closest('.gallery__img').alt;
        popupView.querySelector('.popup__title-view').textContent =  evt.target.closest('.gallery__img').alt;
        popupCloseOpen (popupView);
    });
    gallery.prepend(newCard);
}

function forAddNewCard (evt) { // Функция добавления новой карточки
    evt.preventDefault();  
    addNewCard (place.value, url.value);
    place.value = '';
    url.value = '';
    popupCloseOpen(popupPlace);
    
}

// Исполнение задач на странице пользователя:
render();
closeButtonAuthor.addEventListener('click', () => {popupCloseOpen(popupAuthor)});
closePlaceButton.addEventListener('click', () => {popupCloseOpen(popupPlace)}); 
editButton.addEventListener('click', () => {popupCloseOpen(popupAuthor)}); 
addButton.addEventListener('click', () => {popupCloseOpen(popupPlace)}); 
closeViewButton.addEventListener('click', () => {popupCloseOpen(popupView)});
popupFormAuthor.addEventListener('submit', forSubmitHandler); //Работа кнопки "Сохранить" по событию submit
popupFormPlace.addEventListener('submit', forAddNewCard); //Работа кнопки "Создать" по событию submit

    
    




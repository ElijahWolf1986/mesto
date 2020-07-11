// Класс карточки, создает и управляет поведением карточек
// Колбэк функция handleCardClick определяет поведение карточки при клике на нее

export class Card {
    constructor(name, link, cardTemplate, { handleCardClick }) {
        this._name = name;
        this._link = link;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplate).content.cloneNode(true);
        return cardElement;
    }

    _cardDelete(evt) {
        evt.target.closest('.card').remove();
    }

    _cardLike(evt) {
        evt.target.closest('.card__like').classList.toggle('card__like_state_active');
    }

    _cardView(evt) {
        this._handleCardClick(evt);
    }

    _setEventListenersCard() {
        this._element.querySelector('.card__trash').addEventListener('click', (evt) => this._cardDelete(evt));
        this._element.querySelector('.card__like').addEventListener('click', (evt) => this._cardLike(evt));
        this._element.querySelector('.card__img').addEventListener('click', (evt) => this._cardView(evt));

    }
    createNewCard() { //Создает новую карточку по шаблону и заносит туда ссылку и описание картинки
        this._element = this._getTemplate();
        this._setEventListenersCard(); // навешиваем слушателей которые определим ранее как методы лайка, удаления и зума карточки
        const cardTitle = this._element.querySelector('.card__title');
        const cardImg = this._element.querySelector('.card__img');
        cardTitle.textContent = this._name;
        cardImg.src = this._link;
        cardImg.alt = this._name;
        return this._element;
    }
}
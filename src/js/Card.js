// Класс карточки, создает и управляет поведением карточек
// Колбэк функция handleCardClick определяет поведение карточки при клике на нее

export class Card {
    constructor(item, cardTemplate, { handleCardClick }, { handleCardDelete }) {
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._likesOwners = item.likes;
        this._likesCount = item.likes.length;
        this._ownerId = item.owner._id;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplate).content.cloneNode(true);
        return cardElement;
    }

    _cardPushTrash(evt) {
        const container = evt.target.closest('.card');    
        this._handleCardDelete(this._id, container); 
    }

    _cardLike(evt) {

        evt.target.closest('.card__like').classList.toggle('card__like_state_active');
    }

    _cardView(evt) {
        this._handleCardClick(evt);
    }

    _setEventListenersCard() {
        this._element.querySelector('.card__trash').addEventListener('click', (evt) => this._cardPushTrash(evt));
        this._element.querySelector('.card__like').addEventListener('click', (evt) => this._cardLike(evt));
        this._element.querySelector('.card__img').addEventListener('click', (evt) => this._cardView(evt));

    }

    _getLikesOwners() { //Доп фича -  просмотр имен тех кто лайкнул при наведении на сердечко
        const likesTitle = this._element.querySelector('.card__like');
        let sumury = [];
        this._likesOwners.forEach((owner) => {
            sumury.push(owner.name); 
        })
        likesTitle.setAttribute('title', sumury);
    }

    createNewCard() { //Создает новую карточку по шаблону и заносит туда ссылку и описание картинки
        this._element = this._getTemplate();
        this._setEventListenersCard(); // навешиваем слушателей которые определим ранее как методы лайка, удаления и зума карточки
        const cardTitle = this._element.querySelector('.card__title');
        const cardImg = this._element.querySelector('.card__img');
        const likesCounter = this._element.querySelector('.card__like_counter');
        const trash = this._element.querySelector('.card__trash');
        cardTitle.textContent = this._name;
        cardImg.src = this._link;
        cardImg.alt = this._name;
        likesCounter.textContent = this._likesCount;
        this._getLikesOwners();


        /** Этот кусок определяет принадлежит ли
         * карточка владельцу, если да, то отбражает значок удаления  */ 
        if (this._ownerId === '0ee52a6058a8608e0a1dc5e4') {   
            trash.classList.add('card__trash_type_visible');
        }
        

        return this._element;
    }
}
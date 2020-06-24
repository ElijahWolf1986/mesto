export class Card {
    constructor(name, link, cardTemplate) {
        this._name = name;
        this._link = link;
        this._cardTemplate = cardTemplate;
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

    _cardClose(el) {
        el.classList.remove('popup_state_opened');
        document.removeEventListener('keydown', this._closeByEsc);
    }

    _cardOpen(el) {
        el.classList.add('popup_state_opened');
        document.addEventListener('keydown', this._closeByEsc);
    }

    _closeByEsc(evt) {
        const openedPopup = document.querySelector('.popup_state_opened')
        if (evt.key === 'Escape' && (openedPopup)) {
            openedPopup.classList.remove('popup_state_opened');
        }
    }

    _cardView(evt) {
        const cardImg = evt.target.closest('.card__img');
        const popupView = document.querySelector('#popup-view');
        const popupImgView = popupView.querySelector('.popup__img-view');
        const popupTitleView = popupView.querySelector('.popup__title-view');
        popupImgView.src = cardImg.src;
        popupImgView.alt = cardImg.alt;
        popupTitleView.textContent = cardImg.alt;
        this._cardOpen(popupView);
    }

    _setEventListeners() {
        this._element.querySelector('.card__trash').addEventListener('click', (evt) => this._cardDelete(evt));
        this._element.querySelector('.card__like').addEventListener('click', (evt) => this._cardLike(evt));
        this._element.querySelector('.card__img').addEventListener('click', (evt) => this._cardView(evt));
    }
    createNewCard() {
        this._element = this._getTemplate();
        this._setEventListeners(); // навешиваем слушателей которые определим ранее как методы лайка, удаления и зума карточки
        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__img').src = this._link;
        this._element.querySelector('.card__img').alt = this._name;
        return this._element;
    }
}
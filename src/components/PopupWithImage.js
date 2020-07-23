// Класс отвечающий за работу всплывающих карточек (зум изображений)
// Добавляет в сплывающее окно ссылку на картинку, описание и alt 

import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
    }

    open(evt) {
        super.open();
        const cardImg = evt.target.closest('.card__img');
        const popupImgView = this._container.querySelector('.popup__img-view');
        const popupTitleView = this._container.querySelector('.popup__title-view');
        popupImgView.src = cardImg.src;
        popupImgView.alt = cardImg.alt;
        popupTitleView.textContent = cardImg.alt;
    }
}


import { Popup } from './Popup.js';

export default class PopupWhithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
    }

    open(evt) {
        super.open();
        const cardImg = evt.target.closest('.card__img');
        const popupView = document.querySelector('#popup-view');
        const popupImgView = popupView.querySelector('.popup__img-view');
        const popupTitleView = popupView.querySelector('.popup__title-view');
        popupImgView.src = cardImg.src;
        popupImgView.alt = cardImg.alt;
        popupTitleView.textContent = cardImg.alt;
    }
}


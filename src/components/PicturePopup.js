import { Popup } from './Popup.js';

/**
 * Класс отвечающий за работу окна спрашивающего хотите ли вы удалить свою карточку
 */

export default class PicturePopup extends Popup {
    constructor(containerSelector, { handleFormDelete }) {
        super(containerSelector);
        this._handleFormDelete = handleFormDelete;
        this._container = document.querySelector(containerSelector);
    }

    setEventListeners(id, container) {
        super.setEventListeners();
        this._container.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormDelete(id, container);
        }, { once: true });
    }

    setButtonState(state) {
        this._container.querySelector('.popup__button-save').textContent = state;
    }

    close() {
        super.close();
    }
}
import { Popup } from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor(containerSelector, {handleFormDelete}) {
        super(containerSelector);
        this._handleFormDelete = handleFormDelete;
        this._container = document.querySelector(containerSelector);
    }

    setEventListeners(id, container) {
        super.setEventListeners();
        this._container.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormDelete(id, container);
        this._close();   
        }, { once: true });
    }

    _close() {
        super.close();
    }
    
}
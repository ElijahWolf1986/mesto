export default class Api {
    constructor({url, headers = {}}) {
        this._url = url; //https://mesto.nomoreparties.co/v1/cohortId/
        this._headers = headers;
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            console.log('Ошибка подключения к серверу');
            return Promise.reject(res.statusText);
        }
    }

    _handleResponseError(err) {
        console.log('Ошибка подключения к серверу');
        return Promise.reject(err.message);
    }

    getInitialCards() { //worked
        return fetch(`${this._url}/cards`, {headers: this._headers})
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {headers: this._headers})
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    setUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`       
            })
        }) 
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    setNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`       
            })
        }) 
            .then(this._handleResponse)
            .catch(this._handleResponseError)

    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }) 
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    setLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        }) 
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    delLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }) 
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }






}



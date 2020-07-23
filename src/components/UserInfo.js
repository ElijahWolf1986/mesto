// Класс отвечающий за работу с данными по автору
// Принимает селекторы отвечающие за размещение данных на страницу


export default class UserInfo { //Класс принимает селекторы элементов страницы в которых содержится отображаемая информация об имени пользователя и роде его деятельности
    constructor(userName, userMetier) {
        this._userName = document.querySelector(userName);
        this._userMetier = document.querySelector(userMetier);
    }

    getUserInfo() { // Метод получает данные из заголовков секции отображения данных о пользователе и возвращает их (используем для подстановки в форму)
        this._userInfo = {};
        this._userInfo.name = this._userName.textContent;
        this._userInfo.metier = this._userMetier.textContent;
        return this._userInfo;
    }

    setUserInfo(name, metier) { //Метод получает данные пользователя, которые ввели в форму и подставляет на страницу пользователя 
        this._userName.textContent = name;
        this._userMetier.textContent = metier;
    }
}
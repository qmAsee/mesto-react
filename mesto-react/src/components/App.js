import React from  'react';
import '../App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'

function App() {
  const [imagePopup, setImagePopup] = React.useState({});
  const [isAddPopupOpened, setIsAddPopupOpened] = React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false)

  function closeAllPopups() {
    setImagePopup({})
    setIsAddPopupOpened(false)
    setIsEditProfilePopupOpened(false)
    setIsEditAvatarPopupOpened(false)
  }

  return (
      <div  className="page__container">
        <Header />
        <Main
          onCardClick={setImagePopup}
          onAddCard={setIsAddPopupOpened}
          onEditProfile={setIsEditProfilePopupOpened}
          onEditAvatar={setIsEditAvatarPopupOpened} 
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          butonText="Сохранить"
          onPopupClose={closeAllPopups}
          isOpened={isEditProfilePopupOpened}>
          <input
            id="username"
            type="text"
            className="popup__input"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="username-error popup__error" />
          <input
            id="profession"
            type="text"
            className="popup__input"
            name="profession"
            placeholder="Род деятельности"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="profession-error popup__error" />
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          buttonText="Создать"
          onPopupClose={closeAllPopups}
          isOpened={isAddPopupOpened}>
          <input
            id="place"
            type="text"
            className="popup__input"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="place-error popup__error" />
          <input
            id="link"
            type="url"
            className="popup__input"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="link-error popup__error" />
        </PopupWithForm>
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpened={isEditAvatarPopupOpened}
          onPopupClose={closeAllPopups}>
          <input
            id="avatarLink"
            name="name"
            type="url"
            placeholder="Вставьте ссылку"
            className="popup__input"
            required
          />
          <span className="avatarLink-error popup__error" />
        </PopupWithForm> 
        <PopupWithImage
          card={imagePopup}
          onPopupClose={closeAllPopups}
        />
          
      </div>
  );
}

export default App;

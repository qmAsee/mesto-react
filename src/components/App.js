import React from  'react';
import '../App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import {api} from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function App() {
  const [imagePopup, setImagePopup] = React.useState({});
  const [isAddPopupOpened, setIsAddPopupOpened] = React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    api.getUserInfo() 
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch((err) => console.log(err))

    api.getInitialCards().then((cardElements) => {
        setCards(cardElements)
    }).catch((err) => console.log(err))
}, []) 

  function handleSetUser(userInfo) {
    setLoading(true);

    api.setUserInfo(userInfo)
      .then(info => {
        setCurrentUser(info);
        closeAllPopups();
      }).catch(err => console.log(err))
        .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(ava) {
    setLoading(true);

    api.putAvatar(ava)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      }).catch(err => console.log(err))
        .finally(() => setLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.putLike(card._id, !isLiked)
      .then(newCard => setCards((state) => state.map((item) => item._id === card._id ? newCard : item)))
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(
        state => state.filter(
          item => item._id !== card._id
        )
      )).catch(err => console.log(err)) 
  }

  function handleAddCardSubmit(newCard) {
    setLoading(true);

    api.addCard(newCard)
      .then(data => {
        setCards([data, ...cards])
        closeAllPopups();
      }).catch(err => console.log(err))
        .finally(() => setLoading(false))
  }

  function closeAllPopups() {
    setImagePopup({})
    setIsAddPopupOpened(false)
    setIsEditProfilePopupOpened(false)
    setIsEditAvatarPopupOpened(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div  className="page__container">
        <Header />
        <Main
          onCardClick={setImagePopup}
          onAddCard={setIsAddPopupOpened}
          onEditProfile={setIsEditProfilePopupOpened}
          onEditAvatar={setIsEditAvatarPopupOpened}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpened={isEditProfilePopupOpened}
          onClose={closeAllPopups}
          onSetUser={handleSetUser}
          loading={loading}
        />
        <EditAvatarPopup
          onSetAvatar={handleUpdateAvatar} 
          isOpened={isEditAvatarPopupOpened}
          onClose={closeAllPopups}
          loading={loading}
        />
        <ImagePopup
          card={imagePopup}
          onPopupClose={closeAllPopups}
        />
        <AddPlacePopup
          onAddCard={handleAddCardSubmit}
          isOpened={isAddPopupOpened}
          onClose={closeAllPopups}
          loading={loading}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
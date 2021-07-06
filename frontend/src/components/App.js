import React, { useEffect } from "react";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import PopupDeleteCard from "./PopupDeleteCard";
import Footer from "./Footer.js";
import Register from "./Register.js";
import Login from "./Login.js";
import api from "../utils/api";
import auth from "../utils/auth.js";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessSignup, setIsSuccessSignup] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState(null);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardForDeletion, setCardForDeletion] = React.useState(null);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isPopupDeleteCardOpen, setIsPopupDeleteCardOpen] = React.useState(false);

  const history = useHistory();

  const [isLoadingInitialCards, setIsLoadingInitialCards] = React.useState(false);
  const [isLoadingEditAvatar, setIsLoadingEditAvatar] = React.useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = React.useState(false);
  const [isLoadingAddNewCard, setIsLoadingAddNewCard] = React.useState(false);
  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = React.useState(false);
  const [isLoadingSignup, setIsLoadingSignup] = React.useState(false);
  const [isLoadingSignin, setIsLoadingSignin] = React.useState(false);

  
 
  useEffect(() => {
    if (loggedIn) {
      setIsLoadingInitialCards(true);
      api
        .getInitialCards()
        .then((data) => {
          setCards(
            data.map((item) => ({
              likes: item.likes,
              owner: item.owner,
              _id: item._id,
              name: item.name,
              alt: item.name,
              link: item.link,
            }))
          );
        })
        .catch((err) => console.log(err)).finally(() => setIsLoadingInitialCards(false))
    }
  }, [loggedIn]);
   
  useEffect(() => {
    setIsLoadingUserInfo(true);
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingUserInfo(false));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
    setIsPopupDeleteCardOpen(false);
  }

  function handleUpdateUser(user) {
    setIsLoadingUserInfo(true);
    api
      .editUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingUserInfo(false));
  }

  

  function handleUpdateAavatar(link) {
    setIsLoadingEditAvatar(true);
    api
      .editAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingEditAvatar(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoadingAddNewCard(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() =>setIsLoadingAddNewCard(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoadingDeleteCard(true);
    api
      .deleteCard(cardForDeletion._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== cardForDeletion._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingDeleteCard(false));
  }

  function handleCardDeletePopup(card) {
    setCardForDeletion(card);
    setIsPopupDeleteCardOpen(true);
  }

  function handleAuthorization(data) {
    setIsLoadingSignin(true);
    auth
      .authorize(data)
      .then((token) => {
        setUserEmail(data.email);
        localStorage.setItem("jwt", token.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingSignin(false));
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  function handleRegistration(data) {
    setIsLoadingSignup(true);
    auth
      .register(data)
      .then((data) => {
        setIsSuccessSignup(true);
        handleInfoTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessSignup(false);
        handleInfoTooltipOpen();
      })
      .finally(() => setIsLoadingSignup(false));
  }

  const handleCheckToken = React.useCallback(() => {
    const token = localStorage.getItem("jwt");
    auth
      .checkToken(token)
      .then((data) => {
        setUserEmail(data.data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }, [history]);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      handleCheckToken();
    }
  }, [handleCheckToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
          userEmail={userEmail}
        />
        <Switch>
          <Route path="/sign-up">
            <Register onRegistration={handleRegistration} isLoading={isLoadingSignup}/>
          </Route>
          <Route path="/sign-in">
            <Login onAuthotization={handleAuthorization} isLoading={isLoadingSignin} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onPopupDeleteCardOpen={handleCardDeletePopup}
            isLoadingEditAvatar={isLoadingInitialCards}
            isLoadingUserInfo={isLoadingUserInfo}

          ></ProtectedRoute>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoadingUserInfo={isLoadingUserInfo}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAavatar}
          isLoadingEditAvatar={isLoadingEditAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoadingAddNewCard={isLoadingAddNewCard}
        />


        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessSignup={isSuccessSignup}
          successText="Вы успешно зарегистрировались!"
          unSuccessText="Что-то пошло не так! Попробуйте ещё раз."
        />

        <PopupDeleteCard  
      isOpen={isPopupDeleteCardOpen}
      onClose={closeAllPopups}
      title="Вы уверены?"
      buttonText="Да"
      onSubmit={handleCardDelete}
      isLoading={isLoadingDeleteCard}
      />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

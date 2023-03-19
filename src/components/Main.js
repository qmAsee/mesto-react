import React, { useState, useEffect} from 'react';
import { api } from '../utils/Api.js';
import Card  from './Card.js';

function Main({onCardClick, onAddCard, onEditProfile, onEditAvatar}) {
    const [cards, setCards]  =  useState([]);
    const [userName,  setUserName] = useState("");
    const [userJob, setUserJob] = useState("");
    const [userAvatar, setUserAvatar] = useState("");

    useEffect(() => {
        api.getUserInfo()
          .then((userInfo) => {
            setUserName(userInfo.name)
            setUserJob(userInfo.about)
            setUserAvatar(userInfo.avatar)
          })
          .catch((err) => console.log(err))

        api.getInitialCards().then((cardElements) => {
            setCards(cardElements.map((cardData)  => ({
                cardId: cardData._id,
                name: cardData.name,
                link: cardData.link,
                likes: cardData.likes,
            })))
        }).catch((err) => console.log(err))
    }, [])

    return (
        <main>
            <section className="profile">
              <div className="profile__box">
                <img src={userAvatar} alt="аватар" className="profile__image" />
                <button type="button" className="profile__overlay" onClick={() => {
                    onEditAvatar(true)
                }} />
              </div>
              <div className="profile__info">
                <div className="profile__container">
                  <h1 className="profile__name">
                    {userName}
                  </h1>
                  <button type="button" className="profile__edit" onClick={() => {
                    onEditProfile(true)
                  }} />
                </div>
                  <p className="profile__description">
                    {userJob}
                  </p> 
              </div>
              <button type="button" className="profile__add" onClick={() => {
                onAddCard(true)
              }} />
            </section>
            <section className="photos">
              <ul className="elements">
                {cards.map((cardElement)  => (
                  <Card
                    name = {cardElement.name}
                    link = {cardElement.link}
                    likes = {cardElement.likes}
                    onCardClick = {onCardClick}
                  />
                ))}
              </ul>
            </section>  
          </main>
    )
}

export default Main;


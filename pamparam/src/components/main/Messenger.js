import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Messenger.css';
import { BsPencilSquare } from 'react-icons/bs';
import messageCover from '../../materials/MessageCover.png'; 
import { db } from '../../materials/firebase.js';

import Cover from '../dependent/MessengerCover.js';
import ActiveChat from '../dependent/ActiveChat.js';
import MessageElement from '../dependent/MessengerElement.js';

import ModalNewMessage from '../../components/dependent/ModalNewMessage.js';
import { getModalStyle, useMessageStyles } from '../../materials/modalStyles.js';

function Messenger({ setLocal, user }) {
  let location = useLocation()

  const [activeChat, setActiveChat] = useState(false);
  const [messageText, setMessageTest] = useState('');
  
  const [roomsActive, setRoomsActive] = useState([]);
  const [rooms, setRooms] = useState([]);
  
  const classes = useMessageStyles();
  const [modalStyle] = useState(getModalStyle);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalMessageClick, setModalMessageClick] = useState(false);
  

  useEffect(
    () => {
      setLocal(location.pathname)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  useEffect(() => {
      if (user !== null) {
          const doc = db.collection('users').doc(user.uid);
          
          doc.onSnapshot(function(doc) {
            // receiving real time list of chat rooms in real time from user collection data
            const realChatRooms = doc.data().chatRooms
            // console.log("Current data: ", realChatRooms);
            if (realChatRooms) {
                setRoomsActive(realChatRooms)
            }
           });
      }
  }, [user]);
  
  useEffect(() => {
      if (roomsActive.length !== 0) {
          db.collection("rooms").where("usersIn", "array-contains", user.uid).get()
          .then(function(querySnapshot) {
              setRooms(
                querySnapshot.docs.map((room) => ({
                  id: room.id,
                  data: room.data(),
                }))
              )
          })
          .catch(function(error) {
              console.log("Error getting active rooms with user: ", error);
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsActive]);

  const modalOpener = () => {
    setModalMessage(!modalMessage)
    setModalMessageClick(!modalMessageClick)
  }


  return (
    <div className="messenger">
      <div className="messenger__window">
        <div className="messenger__window__leftColumn">
          <div className="messenger__window__leftColumn__header">
            <div className="messenger__window__leftColumn__header__content">
              <div/>
              <div>Direct</div>
              <BsPencilSquare size={26} onClick={() => {modalOpener()}}/>
            </div>
          </div>
          <div className="messenger__window__leftColumn__chats">
            {rooms.length === 0 ? (
                <div className="messenger__window__leftColumn__chats__element">
                    <img src={messageCover} alt='create a message plane'></img>
                    <div className="lonely__messenger__div">
                        <p>Start your messaging</p>
                    </div>
                </div>
            ):(
              <>
                {rooms.map((room) => (
                  <MessageElement key={room.id} id={room.id} usersIn={room.data.usersIn} roomName={room.data.roomName} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="messenger__window__rightColumn">
          { activeChat === false ? (
            <Cover setActiveChat={setActiveChat} />
          ):(
            <ActiveChat messageText={messageText} setMessageTest={setMessageTest} />
          )}
        </div>
      </div>
      <ModalNewMessage setModalMessageClick={setModalMessageClick} modalMessageClick={modalMessageClick} modalMessage={modalMessage} setModalMessage={setModalMessage} modalStyle={modalStyle} classesStyle={classes.paper} />
    </div>
  );
}

export default Messenger;

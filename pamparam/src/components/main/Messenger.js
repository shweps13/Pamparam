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

  const [messageText, setMessageTest] = useState('');
  
  const [roomsActive, setRoomsActive] = useState([]);
  const [rooms, setRooms] = useState([]);
  
  // modal hooks
  const classes = useMessageStyles();
  const [modalStyle] = useState(getModalStyle);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalMessageClick, setModalMessageClick] = useState(false);
  
  // opened room hook
  const [openedRoom, setOpenedRoom] = useState({
      opened: false,
      openedRoom: '',
      usersIn: [],
      usersInNames: []
  });

  // useEffect(() => {
  //   console.log('openedRoom', openedRoom)
  // }, [openedRoom])
  
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
                  <MessageElement openedRoom={openedRoom} setOpenedRoom={setOpenedRoom} user={user} key={room.id} id={room.id} usersIn={room.data.usersIn} room={room} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="messenger__window__rightColumn">
          { openedRoom.opened === false ? (
            <Cover modalOpener={modalOpener} />
          ):(
            <ActiveChat user={user} openedRoom={openedRoom} messageText={messageText} setMessageTest={setMessageTest} />
          )}
        </div>
      </div>
      <ModalNewMessage setOpenedRoom={setOpenedRoom} userID={user} setModalMessageClick={setModalMessageClick} modalMessageClick={modalMessageClick} modalMessage={modalMessage} setModalMessage={setModalMessage} modalStyle={modalStyle} classesStyle={classes.paper} />
    </div>
  );
}

export default Messenger;

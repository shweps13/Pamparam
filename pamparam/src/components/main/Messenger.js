import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Messenger.css';
import { BsPencilSquare } from 'react-icons/bs';
import messageCover from '../../materials/MessageCover.png'; 

import Cover from '../dependent/MessengerCover.js';
import ActiveChat from '../dependent/ActiveChat.js';
import MessageElement from '../dependent/MessengerElement.js';

import { auth, db } from '../../materials/firebase.js';

function Messenger({ setLocal, user }) {
  let location = useLocation()

  const [activeChat, setActiveChat] = useState(false);
  const [messageText, setMessageTest] = useState('');
  

  const [roomsActive, setRoomsActive] = useState([]);
  const [rooms, setRooms] = useState([]);

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
            setRoomsActive(realChatRooms)
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
  }, [roomsActive]);

  useEffect(() => {
    console.log('rooms', rooms)
  }, [rooms])


  return (
    <div className="messenger">
      <div className="messenger__window">
        <div className="messenger__window__leftColumn">
          <div className="messenger__window__leftColumn__header">
            <div className="messenger__window__leftColumn__header__content">
              <div/>
              <div>Direct</div>
              <BsPencilSquare size={26} onClick={() => {setActiveChat(!activeChat)}}/>
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
    </div>
  );
}

export default Messenger;

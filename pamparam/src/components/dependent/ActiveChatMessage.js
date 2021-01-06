import React from 'react';
import noAvatar from '../../materials/noAvatar.jpg'; 
import { db } from '../../materials/firebase.js';

import { BsFillHeartFill } from 'react-icons/bs';

function ActiveChatMessage({ currentUser, message, userId, timestamp, liked, openedRoom, localId }) {

    const isLocalMessage = () => {
        if (userId === currentUser) {
            return true
        } else {
            return false
        }
    }

    const likeMessage = () => {
        let likeValue = {}
        db.collection('rooms').doc(openedRoom).collection('messages').where("localId", "==", localId).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // console.log(doc.id, " => ", doc.data().liked);
                likeValue = {
                    id: doc.id,
                    liked: doc.data().liked
                }
                // console.log('likeValue', likeValue);
            });
        })
        .then(function() {
            let likedDoc = db.collection('rooms').doc(openedRoom).collection('messages').doc(likeValue.id)
            // console.log('like feature operation works!')
            return likedDoc.update({
                liked: !likeValue.liked
            })
        })
        .catch(function(error) {
            console.log("Error liking/disliking doc: ", error);
        });
    }

    return (
    <div className="activeChatMessage">
        {isLocalMessage() === true ? (
            <div className="activeChatMessage__content" onClick={likeMessage}>
                <div/>
                    <div>
                        {message === '<3' ? (
                            <div className="activeChatMessage__heart">
                                <div>
                                    <BsFillHeartFill size={50} className="activeChatMessage__inner__heart__svg"/>
                                </div>
                            </div>
                        ):(
                            <div>
                                <div>
                                    <p>{message}</p>
                                </div>
                            </div>
                        )}

                        {liked === true ? (
                            <div>
                                <BsFillHeartFill size={15} className="activeChatMessage__heart__liked"/>
                            </div>
                        ):(
                            <></>
                        )}
                    </div>
            </div>
        ):(
            <div className="activeChatMessage__content__remoteUser" onClick={likeMessage}>
                <img src={noAvatar} alt='user avatar' />
                <div/>
                
                <div>
                    {message === '<3' ? (
                        <div className="activeChatMessage__heart__remoteUser">
                            <div className="activeChatMessage__inner__heart__remoteUser">
                                <BsFillHeartFill size={50} className="activeChatMessage__inner__heart__remoteUser_svg"/>
                            </div>
                        </div>
                    ):(
                        <div>
                            <div>
                                <p>{message}</p>
                            </div>
                        </div>
                    )}

                    {liked === true ? (
                        <div className="activeChatMessage__heart__liked__div">
                            <BsFillHeartFill size={15} className="activeChatMessage__heart__liked__remoteUser"/>
                        </div>
                    ):(
                        <></>
                    )}
                </div>

            </div>
        )}
    </div>
    )
}

export default ActiveChatMessage

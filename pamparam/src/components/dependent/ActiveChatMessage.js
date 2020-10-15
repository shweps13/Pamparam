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

    // const likeMessage = () => {
    //     let likeValue
    //     db.collection('rooms').doc(openedRoom).collection('messages').where("localId", "==", localId).get()
    //     .then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data().liked);
    //         });
    //     })
    //     .catch(function(error) {
    //         console.log("Error getting documents: ", error);
    //     });
    // }
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
                console.log('likeValue', likeValue);
            });
        })
        .then(function() {
            let likedDoc = db.collection('rooms').doc(openedRoom).collection('messages').doc(likeValue.id)
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
                {message === '<3' ? (
                    <div className="activeChatMessage__heart">
                        <BsFillHeartFill size={50} />
                    </div>
                ):(
                    <div>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        ):(
            <div className="activeChatMessage__content__remoteUser">
                <img src={noAvatar} alt='user avatar' />
                <div/>
                {message === '<3' ? (
                    <div className="activeChatMessage__heart__remoteUser">
                        <BsFillHeartFill size={50}/>
                    </div>
                ):(
                    <div>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        )}
    </div>
    )
}

export default ActiveChatMessage

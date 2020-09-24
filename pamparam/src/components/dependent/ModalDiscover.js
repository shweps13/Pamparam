import React, { useState } from 'react';
import '../../styles/Modal.css';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import noAvatar from '../../materials/noAvatar.jpg';


function ModalDiscover({ user, openPost, setOpenPost, modalStyle, classesStyle, modalID }) {

    const lorum = 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng]velit, sed quia non-numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum[d] exercitationem ullam corporis suscipitlaboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui inea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non-provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non-recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat…'

    const [comment, setComment] = useState('');

    const dateFrom = (modalID) => {
        let timeStamp = Math.floor(Date.now() / 1000);
        let result = timeStamp - modalID.post.timestamp.seconds // in seconds

        let days = result/86400
        let hours = result/3600
        let minutes = result/60

        if (days > 1) {
            let showDays = Math.floor(days)
                if (showDays === 1) {
                    return (`${showDays} day ago`)
                } else {
                    return (`${showDays} days ago`)
                }
        } else 
        if (days < 1 && hours > 1) {
            let showHours = Math.floor(hours)
                if (showHours === 1) {
                    return (`${showHours} hour ago`)
                } else {
                    return (`${showHours} hours ago`)
                }
        } else 
        if (hours < 1 && minutes > 1){
            let showMinutes = Math.floor(minutes)
                if (showMinutes === 1) {
                    return (`${showMinutes} minute ago`)
                } else {
                    return (`${showMinutes} minutes ago`)
                }
        } else
        if (minutes < 1){
            return (`A few seconds ago`)
        }
    }

    const postComment = (event) => {
        event.preventDefault();

        // db.collection('posts').doc(postId).collection('comments').add({
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     text: comment,
        //     username: user.displayName
        // });
        setComment('');
    }


    return (
    <Modal open={openPost} onClose={() => setOpenPost(false)}>
        <div style={modalStyle} className={classesStyle}>
        {modalID === null ? (
                <div className="discover__loading">
                    <CircularProgress size={100} />
                </div>
            ): (
                <div className='discover__modal'>
                    <div className="discover__modalItem">
                        <div className="discover__modalImage">
                            <img src={modalID.post.imageUrl} alt={`${modalID.post.username}'s post`} />
                        </div>
                    </div>
                    <div className='discover__modalContent'>
                        <div className='discover__modalContent__header'>
                            <div className='discover__modalContent__headerContent'>
                                <img src={noAvatar} alt='User avatar' />
                                <strong>{modalID.post.username}</strong>
                            </div>
                        </div>
                        <div className='discover__modalContent__comments'>
                            <h3>{modalID.post.username}</h3>
                            <h3>{lorum}</h3>
                        </div>
                        <div className='discover__modalContent__buttons'>
                            <h3>{dateFrom(modalID)}</h3>
                            
                        </div>
                        
                        <div className='discover__modalContent__footer'>
                            {user && (
                            <form className="post__commentBox">
                                <input 
                                    className="post__input"
                                    type="text"
                                    placeholder="Add a comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button 
                                    className="post__button"
                                    type="submit"
                                    disabled={!comment}
                                    onClick={postComment}
                                >Post</button>
                            </form>
                            )}
                        </div>
                        
                    </div>
            </div>
         )}
            
            
        </div>
    </Modal>
    )
}

export default ModalDiscover

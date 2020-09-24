import React, { useEffect } from 'react';
import '../../styles/Modal.css';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';


function ModalDiscover({ openPost, setOpenPost, modalStyle, classesStyle, modalID }) {

    const lorum = 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng]velit, sed quia non-numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum[d] exercitationem ullam corporis suscipitlaboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui inea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non-provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non-recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat…'

    useEffect(() => {
        console.log('modalID', modalID)
        console.log('modalID', modalID.id)
        console.log('modalID', modalID.post)
    }, [modalID])

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
                            <h3>{modalID.post.username}</h3>
                        </div>
                        <div className='discover__modalContent__comments'>
                            <h3>{modalID.post.username}</h3>
                            <h3>{lorum}</h3>
                        </div>
                        <div className='discover__modalContent__buttons'>
                            <h3>{modalID.post.username}</h3>
                        </div>
                        <div className='discover__modalContent__footer'>
                            <h3>{modalID.post.username}</h3>
                        </div>
                        
                    </div>
            </div>
         )}
            
            
        </div>
    </Modal>
    )
}

export default ModalDiscover

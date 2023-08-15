import './LikeECommentContainer.css';
import styles from './LikeECommentContainer.module.css';

import Message from './Message';

//Hooks
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

// Icons
import {FaTrashAlt,FaRegComment} from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs';

//Redux
import { like,deslike, getPhotoLikes, commentHome } from '../slices/photoSlice'
import { followUserContainer,unFollowUserContainer } from '../slices/userSlice';
import { useResetComponentMessage} from '../hooks/useResetComponentMessage'
//React-router-dom
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Icons
import {BsComment,BsCommentFill} from 'react-icons/bs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { uploads } from '../utils/config';
import Loading from './Loading';



const LikeECommentContainer = ({ photo,user,comment,removeComment,loadingPequeno,handleLike,handleDeslike}) => {
  
  //console.log(photo.likes)
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch)

  let {currentUser,loading, error, message} = useSelector((state) => state.photo)
  const {user: userAuth} = useSelector((state) => state.auth)
  
  let {id} = useParams()

  const token = useSelector((state) => state.auth.token)
  //const liked = useSelector((state) => state.photo.liked) 
  const [showComments,setShowComments] = useState(false)
  const [commentText,setCommentText] = useState('')
  const [showHeart, setShowHeart] = useState(false);
  const [showLikes,setShowLikes] = useState(false)

  useEffect(() => {
    if (error) {
    setTimeout(() => {
    resetMessage();
    }, 2000);
    }
   }, [error]);
 
  
  const handleComment = (e) =>{
    e.preventDefault()

    const commentData = {
      comment: commentText,
      id: photo._id
    }
    
   dispatch(comment(commentData))

   setCommentText('')

   resetMessage()

 }

 if(loading){
  return <Loading />
 }


 const handleRemoveComment = (CommentId) => {

  if(loadingPequeno){
    return
  }

  const commentData = {
     CommentId,
     id,
     token
  }

  dispatch(removeComment(commentData))
  
  resetMessage()
    
};


const showOrHideComments = () => {
  if(showComments === true){
    setShowComments(false)
    console.log('fechou')
    console.log(showComments)
  } else{
    setShowComments(true)
    console.log('abriu')
    console.log(showComments)

  }
}

const handleShowLikes = (photo) => {
  let photoUser = photo.userId
  let photoId = photo._id

  setShowLikes(true)

 dispatch(getPhotoLikes(photoId))


}

const closeLikes = () => {
  setShowLikes(false)
}
if(photo.likes){
  var userIds = photo.likes.map(like => like.id)
}

const handleFollow = (like) => {
  
  const followData = {
    userId: like._id,
    token: userAuth.token
  }

  dispatch(followUserContainer(followData)).then(() => {
    dispatch(getPhotoLikes(photo._id));
  });
  
}

const handleUnFollow = (like) => {

  const unFollowData = {
    userId: like._id ,
    token: userAuth.token
  }

  dispatch(unFollowUserContainer(unFollowData)).then(() => {
    dispatch(getPhotoLikes(photo._id));
  });

}

  return (
    <>
      <div className="like">
        {photo.likes && user && (
          <>
            {photo.likes.includes(user._id) ? (
              <BsHeartFill
                id="deslike"
                disabled={loadingPequeno}
                onClick={handleDeslike}
              />
            ) : (
              <BsHeart
                id="like"
                disabled={loadingPequeno}
                onClick={handleLike}
              />
            )}
            <p onClick={() => handleShowLikes(photo)} className={styles.likeP}>
              {photo.likes.length} {photo.likes.length === 1 ? "like" : "likes"}
            </p>
            {showLikes && (
              <div className={styles.showLikes}>
                {console.log(currentUser)}
                <div className={styles.header}>
                  <div className={styles.likeTitle}>Likes</div>
                  <div className={styles.xIcon}>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={closeLikes}
                      style={{
                        color: "#262626",
                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
                <div className={styles.likes_container}>
                  {photo.likesInfo &&
                    photo.likesInfo.map((like) => (
                      <div key={like._id} className={styles.like_item}>
                        <div className={styles.marco0}>
                          <img
                            className={styles.like_profile_image}
                            src={`${uploads}/users/${like.profileImage}`}
                            alt={like.name}
                          />
                          <Link to={`/users/${like._id}`}>
                            <p className={styles.like_name}>{like.name}</p>
                          </Link>
                        </div>
                        {!(user._id == like._id) ? (
                          currentUser.following.some((follower) => {
                            
                            return follower._id === like._id;
                          }) ? (
                            <button
                              className={styles.btn_seguir}
                              onClick={() => handleUnFollow(like)}
                            >
                              Following
                            </button>
                          ) : (
                            <button
                              className={styles.btn_seguir}
                              onClick={() => handleFollow(like)}
                            >
                              Follow
                            </button>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            <FaRegComment
              className="comment-icon"
              onClick={showOrHideComments}
            />
          </>
        )}
      </div>
      {showComments && (
        <div className={showComments ? styles.comments : console.log("Falso")}>
          {photo.comments && (
            <>
              <h3>Comentários {photo.comments.length}</h3>
              <form onSubmit={handleComment}>
                <input
                  type="text"
                  placeholder="Insira seu comentário..."
                  onChange={(e) => setCommentText(e.target.value)}
                  value={commentText || ""}
                />
                <input type="submit" value="Enviar" disabled={loadingPequeno} />
              </form>
              {photo.comments.length === 0 && <p>Não há comentários</p>}
              {photo.comments.map((comment) => (
                <div key={comment.CommentId} className={styles.comment}>
                  <div className={styles.author}>
                    {comment?.userImage && (
                      <img
                        className={styles.photo_comment}
                        src={`${uploads}/users/${comment.userImage}`}
                        alt={comment.userName}
                      />
                    )}
                    {comment && (
                      <Link to={`/users/${comment.userId}`}>
                        <p className={styles.user_name}>{comment.userName}</p>
                      </Link>
                    )}
                  </div>
                  <p className={styles.comment_comment}>{comment.comment}</p>
                  {user._id === photo.userId || comment.userId === user._id ? (
                    <FaTrashAlt
                      onClick={() => handleRemoveComment(comment.CommentId)}
                      className={styles.trash}
                    />
                  ) : null}
                </div>
              ))}
            </>
          )}
          {error && <Message msg={error} type="error" />}
          {message && (
            <Message
              style={{ marginBottom: "12px" }}
              msg={message}
              type="success"
            />
          )}
        </div>
      )}
    </>
  );
};


export default LikeECommentContainer;

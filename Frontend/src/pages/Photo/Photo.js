import styles from './Photo.module.css'

import {uploads} from '../../utils/config'

// components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import PhotoItem from '../../components/PhotoItem'
// hooks
import { useEffect,useState,useRef } from 'react'
import { useSelector, useDispatch}  from 'react-redux'
import { useParams } from 'react-router-dom'

import {FaTrashAlt, FaComment} from 'react-icons/fa'

import { BsHeart, BsHeartFill } from "react-icons/bs";
// Redux
import { getPhoto, like,deslike,comment, resetMessage, removeComment } from '../../slices/photoSlice'
import LikeECommentContainer from '../../components/LikeECommentContainer'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import LikeCommmentHome from '../../components/LikeCommentHome'

const Photo = () => {

   let {id,CommentId} = useParams()

  
   const token = useSelector((state) => state.auth.token)
   const dispatch = useDispatch()
   const resetMessage = useResetComponentMessage(dispatch)

   const {user} = useSelector((state) => state.auth)
   const {currentUser} = useSelector((state) => state.user)
   const {photo,photos, loading,loadingPequeno, error, message} = useSelector((state) => state.photo)
   const [commentText,setCommentText] = useState('')
   const [showComments,setShowComments] = useState(false)
   const [divMessage, setDivMessage] = useState(true)
   const [liked,setLiked] = useState(false)
   const [likes, setLikes] = useState(photo.likes);
   const [showHeart, setShowHeart] = useState(false);
   const [likeDisabled, setLikeDisabled] = useState(false);


   const handleDoubleClick = () => {
    dispatch(like(photo._id));
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 1500);

  }
   

   // Load photo data
   useEffect(() => {
    dispatch(getPhoto(id))
 }, [dispatch, id])

 const handleLike = () => {
 
  const LikeData = {
    photoId: photo._id,

  }
  dispatch(like(LikeData));
  setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 1500);

};


const handleDeslike = () => {

  const DeslikeData = {
    id: photo._id,
    userIdLiked: user._id
  }

  dispatch(deslike(DeslikeData));
  resetMessage()
};

   if(loading){
     return (
      <Loading />
     )  
   }


  return (
    <div id="photo">
      <PhotoItem photo={photo} handleDoubleClick={handleDoubleClick} />
    
      {showHeart && (
        <div className={styles.heart_like}>
          <BsHeartFill />
        </div>
      )}
       <LikeECommentContainer
        photo={photo}
        user={user}
        currentUser = {currentUser}
        comment={comment}
        removeComment={removeComment}
        handleLike={handleLike}
        handleDeslike={handleDeslike}
        loadingPequeno={loadingPequeno}

      /> 
      <div className={styles.div_icon}>
      </div>
    </div>
  );
}

export default Photo
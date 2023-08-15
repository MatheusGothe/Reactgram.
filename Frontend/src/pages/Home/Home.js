import React, { useState } from "react";

import "./Home.css";
import styles from './Home.module.css'
// Componets
import LikeCommentHome from "../../components/LikeCommentHome";
import PhotoItemHome from "../../components/PhotoItemHome";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Icons 
import { BsHeartFill} from 'react-icons/bs'

// Redux
import {
  getPhotos,
  removeCommentHome,
  commentHome,
  like,
  deslike,
  getPhotoLikes
} from "../../slices/photoSlice";
import StoriesContainer from "../../components/StoriesContainer";
import { getStories } from "../../slices/storeSlice";

const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos,photo, loading } = useSelector((state) => state.photo);
  const { stories} = useSelector((state) => state.stories)
  const { comments, setComments } = useState("");
  const [showHeart, setShowHeart] = useState({});
  const [clicked,setCliked] = useState(false)
  
  // Load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch, commentHome, removeCommentHome]);
  
  if (loading) {
    return <Loading />;
  }
  
  const handleDoubleClick = (photo) => {
    const LikeData = {
      photoId: photo._id,
    };
    dispatch(like(LikeData));
    setShowHeart((prevShowHeart) => ({
      ...prevShowHeart,
      [photo._id]: true,
    }));
    setTimeout(() => {
      setShowHeart((prevShowHeart) => ({
        ...prevShowHeart,
        [photo._id]: false,
      }));
    }, 1500);
  };

  const handleLike = (photo) => {
    const LikeData = {
      photoId: photo._id,
    };
    dispatch(like(LikeData));
    setShowHeart((prevShowHeart) => ({
      ...prevShowHeart,
      [photo._id]: true,
    }));
    setTimeout(() => {
      setShowHeart((prevShowHeart) => ({
        ...prevShowHeart,
        [photo._id]: false,
      }));
    }, 1500);
  };

 const handleClick = (photo) => {
  
    setCliked(true)
    setTimeout(() => {
      setCliked(false)
    },1500)
 }


  return (
    <div id="home">
      <StoriesContainer stories={stories} />
      {photos.map((photo) => (
        <div className="teste" key={photo._id}>
          <PhotoItemHome
            photo={photo}
            handleDoubleClick={handleDoubleClick}
            showHeart={showHeart[photo._id]}
            clicked={clicked}
          />
          <LikeCommentHome
            photo={photo}
            user={user}
            commentHome={commentHome}
            removeCommentHome={removeCommentHome}
            handleLike={handleLike}
          />
          <div className={styles.btn_Link}>
          <Link className={styles.btnLink} to={`/photos/${photo._id}`}>
            Ver mais
          </Link>
          </div>
        </div>
      ))}

      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user._id}`}>clique aqui</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;

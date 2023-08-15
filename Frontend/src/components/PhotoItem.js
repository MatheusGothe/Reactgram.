//import "./PhotoItem.css";
import styles from './PhotoItem.module.css'
import { uploads } from "../utils/config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { like } from "../slices/photoSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const PhotoItem = ({ photo, }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [likes, setLikes] = useState(photo.likes);
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleClick = () => {
    console.log(photo._id);
    const LikeData = {
      photoId: photo._id
    }
  
    dispatch(like(LikeData));

  setShowHeart(true);
  setTimeout(() => {
  setShowHeart(false);
  }, 1500);
}
  


  return (
    <div className={styles.photo_item}>
      {showHeart && (
        <div className={styles.heart_like}>
          <BsHeartFill />
        </div>
      )}
      <div className={styles.photo_author}>
        {photo.profileImage ? (
          <div className={styles.author_info}>
            <img
              className={styles.photo_pequena}
              src={`${uploads}/users/${photo.profileImage}`}
              alt={user.name}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <span className={styles.nome}>
              <Link to={`/users/${photo.userId}`}> {photo.userName}</Link>{" "}
            </span>
          </div>
        ) : (
          <div className={styles.author_info}>
            <img
              className={styles.photo_pequena}
              src={`${uploads}/users/${user.profileImage}`}
              alt={user.name}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <span className={styles.nome}>{photo.userName}</span>
          </div>
        )}
      </div>
      {photo.image && (
        <>
          <img
            className={styles.img}
            id={styles.imgPhoto}
            onDoubleClick={() => handleDoubleClick(photo._id)}
            src={`${uploads}/photos/${photo.image}`}
            alt={photo.title}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </>
      )}
    </div>
  );
};
export default PhotoItem;

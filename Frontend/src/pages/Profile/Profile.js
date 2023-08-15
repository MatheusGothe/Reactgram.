import './Profile.css'

import { uploads } from '../../utils/config'

// components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

// hooks
import { useState,useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// redux
import {
  followUser,
  followUserContainer,
  unFollowUserContainer,
  getUserDetails,
  getUserFollowers,
  unFollowUser,
  getUserFollowing,
  profile,
} from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";
import Loading from '../../components/Loading'

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LoadingBall from '../../components/LoadingBall'

const Profile = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const {user,currentUser, loading,loadingPequeno} = useSelector((state) => state.user)
    const {user: userAuth} = useSelector((state) => state.auth)

    const {
      photos,
      loading: loadingPhoto,
      message: messagePhoto,
      error: errorPhoto,
    } = useSelector((state) => state.photo);

    const [title,setTitle] = useState('')
    const [image,setImage] = useState('')
    const [dragLink, setDragLink] = useState(null);
    const [editId, setEditId] = useState('')
    const [editImage,setEditImage] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [showFollowers,setShowFollowers] = useState(false)
    const [showFollowing,setShowFollowing] = useState(false)
  

    // New form and edit forms ref
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()



    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id))
        dispatch(getUserPhotos(id))
    }, [dispatch,id])

  

    const handleFile = (e) => {
        const image = e.target.files[0];
        setImage(image)
      };

      const resetComponentMessage = () => {
        setTimeout(() => {
          dispatch(resetMessage());
        }, 2000);
      }
  

   const submitHandle = (e) =>{
     e.preventDefault()

     const photoData = {
        title,
        image,
     }

     // build form data
     const formData = new FormData()

     const photoFormData = Object.keys(photoData).forEach((key) =>
       formData.append(key, photoData[key])
     );

     formData.append("photo", photoFormData)

     dispatch(publishPhoto(formData))
     setTitle('')
     setImage('')
     resetComponentMessage()
   }

   // Delete a photo
   const handleDelete = (id) => {

    dispatch(deletePhoto(id))

    resetComponentMessage()

   }
   // show or hide forms
   const hideOrShowForms = () => {
      newPhotoForm.current.classList.toggle("hide")
      editPhotoForm.current.classList.toggle("hide")
   }

   // Update a photo 
   const handleUpdate = (e) => {
      e.preventDefault()

      const photoData = {
         title: editTitle,
         id: editId
      }

      dispatch(updatePhoto(photoData))

      resetComponentMessage()

   }

   // Open edit form
   const handleEdit = (photo) => {
      if(editPhotoForm.current.classList.contains("hide")){
          hideOrShowForms()
      }

      setEditId(photo._id)
      setEditTitle(photo.title)
      setEditImage(photo.image)
   }
  
   const handleCancelEdit = () => {
      hideOrShowForms()
 
   }
   const handleMenu = () => {

   }

    if (loading) {
      return (
        <Loading />
      )
    }
    
    // SHOW FOLLOWERS
    const handleShowFollowers = () => {

      const getData = {
        userId: user._id, 
        token: userAuth.token,
        currentUserId : userAuth._id
      }

   
      dispatch(getUserFollowers(getData))
      
      setShowFollowers(true)
    }

    // SHOW FOLLOWING
    const handleShowFollowing = () => {

      const getData = {
        userId: user._id, 
        token: userAuth.token
      }
   
      dispatch(getUserFollowing(getData))

      setShowFollowing(true)
      
    }

    const isFollowing = user.followers && user.followers.some((follower) => {
     return follower._id === userAuth._id;
   });

    const handleFollow = (user) => {
      const followData = {
        userId: user._id,
        token: userAuth.token
      }
      
      dispatch(followUser(followData))
    }
    const handleUnFollow = (user) => {

      const unFollowData = {
        userId: user._id ,
        token: userAuth.token
      }
      dispatch(unFollowUser(unFollowData))

    }
    const handleFollowContainer = (user) => {

      const followData = {
        userId: user._id,
        token: userAuth.token
      }
  
      dispatch(followUserContainer(followData))
    }
    const handleUnFollowContainer = (user) => {
      
      const unFollowData = {
        userId: user._id ,
        token: userAuth.token
      }
      dispatch(unFollowUserContainer(unFollowData))

    }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        )}
        <div className="profile-description">
          <h2> {user.name} </h2>
          <p>{user.bio}</p>
          {console.log(userAuth)}
          {console.log(user)}
          {console.log(userAuth._id, "===", user._id)}
          {userAuth._id !== user._id &&
            (isFollowing ? (
              <button
                className="btn-foll"
                disabled={loadingPequeno || showFollowers || showFollowing}
                onClick={() => handleUnFollow(user)}
              >
                Following
              </button>
            ) : (
              <button
                disabled={loadingPequeno || showFollowers || showFollowing}
                onClick={() => handleFollow(user)}
                className="btn-foll"
              >
                Follow
              </button>
            ))}

          <p onClick={handleShowFollowers} className="p-foll">
            {" "}
            {user.followers?.length} Followers
          </p>
          <p onClick={handleShowFollowing} className="p-foll">
            {" "}
            {user.following?.length} Following
          </p>
          {loadingPequeno ? <LoadingBall /> : ""}
          {showFollowers && (
            <div className="container_followers">
              <div className="cont">
                <div
                  className="follow_title"
                  style={{ color: "black", fontWeight: "500" }}
                >
                  Followers
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => setShowFollowers(false)}
                    style={{
                      color: "#262626",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="followers">
                  {user.followers.map((follower) => (
                    <div className="follower" key={follower._id}>
                      <div className="img_name">
                        <img
                          src={`${uploads}/users/${follower.profileImage}`}
                          alt={follower.userName}
                        />
                        <span>
                          <Link
                            className="ltf"
                            to={`/users/${follower._id}`}
                            onClick={() => setShowFollowers(false)}
                          >
                            @{follower.userName}
                          </Link>
                        </span>
                      </div>
                      <div className="btn_seguir_followers">
                        {currentUser &&
                          currentUser.following &&
                          !(follower._id === currentUser._id) && (
                            <>
                              {currentUser.following.some(
                                (following) => following._id === follower._id
                              ) ? (
                                <button
                                  onClick={() =>
                                    handleUnFollowContainer(follower)
                                  }
                                >
                                  Following
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleFollowContainer(follower)
                                  }
                                >
                                  Follow
                                </button>
                              )}
                            </>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showFollowing && (
            <div className="container_followers">
              <div className="cont">
                <div
                  className="follow_title"
                  style={{ color: "black", fontWeight: "500" }}
                >
                  Following
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => setShowFollowing(false)}
                    style={{
                      color: "#262626",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="followers">
                  {user.following.map((following) => (
                    <div className="follower" key={following._id}>
                      <div className="img_name">
                        <img
                          src={`${uploads}/users/${following.profileImage}`}
                          alt={following.userName}
                        />
                        <span>
                          <Link
                            className="ltf"
                            to={`/users/${following._id}`}
                            onClick={() => setShowFollowing(false)}
                          >
                            @{following.userName}
                          </Link>
                        </span>
                      </div>
                      <div className="btn_seguir_followers">
                        {currentUser &&
                          currentUser.following &&
                          !(following._id === currentUser._id) && (
                            <>
                              {currentUser.following.some(
                                (follower) => follower._id === following._id
                              ) ? (
                                <button
                                  onClick={() =>
                                    handleUnFollowContainer(following)
                                  }
                                >
                                  Following
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleFollowContainer(following)
                                  }
                                >
                                  Follow
                                </button>
                              )}
                            </>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {userAuth._id === user._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loading && <input type="submit" disabled value="Aguarde..." />}
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img
                src={`${uploads}/photos/${editImage}`}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                alt={editTitle}
              />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Insira o novo titulo"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />
              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                {" "}
                Cancelar edição
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <Link to={`/photos/${photo._id}`}>
                    <img
                      className="img-t"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      src={`${uploads}/photos/${photo.image}`}
                      alt={photo.title}
                    />
                  </Link>
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn btn-ver" to={`/photos/${photo._id}`}>
                    <BsFillEyeFill />
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas</p>}
        </div>
      </div>
    </div>
  );

}

export default Profile
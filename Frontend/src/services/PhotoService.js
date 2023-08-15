import {api, requestConfig} from '../utils/config'


// Publish a user photo
const publishPhoto = async(data,token) => {

    const config = requestConfig("POST",data, token, true)

    try {

        const res = await fetch(api + "/photos",config)
            .then((res) => res.json())
            .catch((err) => err )

            return res
        
    } catch (error) {
        console.log(error)
    }   
}
// Get user photos
const getUserPhotos = async(id, token) => {
    
    const config = requestConfig("GET", null, token)

    try {
        
        const res = await fetch(api + "/photos/user/" + id, config )
                .then((res) => res.json())
                .catch((err) => err)


        return res        

    } catch (error) {
        console.log(error)
    }

}

// Delete a photo
const deletePhoto = async(id,token) => {

    const config = requestConfig("DELETE", null, token)
    
    try {

        const res = await fetch(api + "/photos/" + id,config)
                    .then((res) => res.json())
                    .catch((err) => err)    
        
        return res
    } catch (error) {
        console.log(error)
    }
    
}

// Update a photo
const updatePhoto = async(data, id, token) => {

    const config = requestConfig("PUT", data, token)

    try {

        const res = await fetch(api + "/photos/" + id, config)
                .then((res) => res.json())
                .catch((err) => err)

        return res        

        
    } catch (error) {
        console.log(error)
    }

}

// Get a photo by id
const getPhoto = async(id, token) => {

    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res    
    } catch (error) {
        console.log(error)
    }

}

// Like a photo 
const like = async(LikeData, token) => {

    const {photoId} = LikeData
    const config = requestConfig("PUT",null, token)

    try {

        const res = await fetch(api + "/photos/like/" + photoId,config)
            .then((res) => res.json())
            .catch((err) => err)

        return res  

        
    } catch (error) {
        console.log(error)
    }

}

const deslike = async(id, token,userIdLiked) => {

    const config = requestConfig("DELETE",null, token)
    console.log("userIdLiked",userIdLiked)
    try {

        const res = await fetch(api + "/photos/deslike/" + id,config)
            .then((res) => res.json())
            .catch((err) => err)

        return [res,userIdLiked] 

        
    } catch (error) {
        console.log(error)
    }

}

// Add coment to photo
const comment = async(data, id, token) => {

    const config = requestConfig('PUT',data,token)

    
    try {
        const res = await fetch(api + "/photos/comment/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)
                    
        return res            

    } catch (error) {
        console.log(error)
    }

}
// Add coment to photo
const commentHome = async(data, id, token) => {

    const config = requestConfig('PUT',data,token)


    try {
        const res = await fetch(api + "/photos/comment/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)
       
        return res            

    } catch (error) {
        console.log(error)
    }

}

// Remove coment to photo
const removeComment = async(id, CommentId, token) => {

    const config = requestConfig('DELETE',id,token)

    try {
        const res = await fetch(api + `/photos/remove/${id}/${CommentId}`, config)
                    .then((res) => res.json())
                    .catch((err) => err)

                    console.log(res)
      /*  if(res.errors){
            return res.errors[0]
        }   */     
        return [res, CommentId]        

    } catch (error) {
        console.log(error)
    }
}
// Remove coment to photo
const removeCommentHome = async(photoId, CommentId, token) => {

    const config = requestConfig('DELETE',photoId,token)

    try {
        const res = await fetch(api + `/photos/remove/${photoId}/${CommentId}`, config)
                    .then((res) => res.json())
                    .catch((err) => err)

                    console.log(res)
      /*  if(res.errors){
            return res.errors[0]
        }   */     
        return [res, CommentId]        

    } catch (error) {
        console.log(error)
    }
}

// Get all photos
const getPhotos = async(token) => {

    const config = requestConfig("GET",null,token)

    try {

        const res = await fetch(api + "/photos", config)
                    .then((res) => res.json())
                    .catch((err) => err)
        
        return res

        
    } catch (error) {
        console.log(error)
    }
}


// Get users who liked a photo
const getPhotoLikes = async(photoId,token) => {

    const config = requestConfig("GET",null,token);
  
    try {
      const res = await fetch(api + "/photos/likes/" + photoId, config)
        .then((res) => res.json())
        .catch((err) => err);
        

      return res;
    } catch (error) {
      console.log(error);
    }
  }

// Search photo by title
const searchPhotos = async(query,token) => {


    const config = requestConfig("GET",null, token)

    try {

        const res = await fetch(api + "/photos/search?q=" + query,config)
                    .then((res) => res.json())
                    .catch((err) => err)

        return res

        
    } catch (error) {
        console.log(error)
    }

}
  

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    deslike,
    comment,
    removeComment,
    getPhotos,
    commentHome,    
    removeCommentHome,
    getPhotoLikes,
    searchPhotos
}

export default photoService
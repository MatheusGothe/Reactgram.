import {api, requestConfig} from '../utils/config'

// Get user details
const profile = async(data, token) => {
    const config = requestConfig("GET", data, token)


    try{

        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err )

        return res

    } catch(error){
        console.log(error)
    }
}

// Update user and details
const updateProfile = async(data, token) => {

    const config = requestConfig("PUT",data, token, true)

    try {

        const res = await fetch(api + "/users/",config)
            .then((res) => res.json())
            .catch((err) => err);
  
      return res;

    } catch (error) {
        console.log(error)
    }

}

// Get user details
const getUserDetails = async(id) => {
    
    const config = requestConfig("GET")

    try {
        
        const res = await fetch(api + "/users/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res

    } catch (error) {
        console.log(error)
    }


}
// Reset Password
const resetPassword = async(email) => {
    const config = requestConfig("PUT", { email: email })

    try {
        const res = await fetch(api + '/users/reset-password', config)
                .then((res) => res.json())
                .catch((err) => err)

        return res    
    }catch(error) {
        console.log(error)
    }
}
// Follow a user 
const followUser = async(userId,token) => {
    
    const config = requestConfig("POST",null,token)
    console.log(userId)
    try{
        
        const res = await fetch(api + "/users/follow/" + userId,config)
            .then((res) => res.json())
            .catch((err) => err)


        return res     
    }catch(error){
        console.log(error)
    }

}
// UnFollow a user 
const unFollowUser = async(userId,token) => {

    const config = requestConfig("DELETE",userId,token)

    try{
        const res = await fetch(api + '/users/unfollow/' + userId,config)
            .then((res) => res.json())
            .catch((err) => err)
            
        return res    
    }catch(error){
        console.log(error)
    }

}
// Follow a user 
const followUserContainer = async(userId,token) => {
    
    const config = requestConfig("POST",null,token)
    console.log(userId)
    try{
        
        const res = await fetch(api + "/users/follow/" + userId,config)
            .then((res) => res.json())
            .catch((err) => err)


        return res     
    }catch(error){
        console.log(error)
    }

}
// UnFollow a user 
const unFollowUserContainer = async(userId,token) => {

    const config = requestConfig("DELETE",userId,token)

    try{
        const res = await fetch(api + '/users/unfollow/' + userId,config)
            .then((res) => res.json())
            .catch((err) => err)
            
        return res    
    }catch(error){
        console.log(error)
    }

}
// Get user Followers
const getUserFollowers = async (userId, token,currentUserId) => {

    const config = requestConfig("GET", null, token);
    console.log(currentUserId)
    try {
      const res = await fetch(api + '/users/followers/' + userId , config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

// Get user Followers
const getUserFollowing = async (userId, token) => {
    const config = requestConfig("GET", null, token);
  
    try {
      const res = await fetch(api + '/users/following/' + userId , config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const searchUsers = async(query,token) => {


    const config = requestConfig("GET",null, token)

    try {

        const res = await fetch(api + "/users/search?q=" + query,config)
                    .then((res) => res.json())
                    .catch((err) => err)

        return res

        
    } catch (error) {
        console.log(error)
    }

}
  



const userService = {
    profile,
    updateProfile,
    getUserDetails,
    resetPassword,
    followUser,
    unFollowUser,
    getUserFollowers,
    getUserFollowing,
    searchUsers
}

export default userService
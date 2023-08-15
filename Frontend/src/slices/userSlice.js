import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  user: {},
  currentUser: {},
  users: [],
  error: false,
  success: false,
  loading: false,
  message: null,
  loadingPequeno: false,
};

// Get user details, for edit data
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user, token);

    console.log(data);

    return data;
  }
);

// Update user details
export const updateProfile = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);
    
    // Check for errors
    if(data.errors) {
      console.log('Error veio userslice')
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

 

    return data;
  }
);

// Get user details
export const getUserDetails = createAsyncThunk(
  "user/get",
  async(id, thunkAPI) => {

    const data = await userService.getUserDetails(id)
    
    
    return data;



  }
)

export const resetPassword = createAsyncThunk(
    "user/password",
    async(email, thunkAPI) =>{
      try {
        const res = await userService.resetPassword(email);

         // Verificar se houve erro na resposta
        if(res.errors) {
        return thunkAPI.rejectWithValue(res.errors[0]);

      }

      } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue("Ocorreu um erro ao redefinir a senha")
      }
    }
)
export const followUser = createAsyncThunk(
  "user/follow",
  async( followData, thunkAPI) =>{

    const {userId} = followData
    const {token} = followData
    
    console.log('follow user slice executado')
    try {
      const res = await userService.followUser(userId,token);

       // Verificar se houve erro na resposta
      if(res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
      return res

    } catch (error) {
      console.log(error)
      
    }
  }
)
export const unFollowUser = createAsyncThunk(
  "user/unFollow",
  async( followData, thunkAPI) =>{

    const {userId} = followData
    const {token} = followData
    
    
    try {
      const res = await userService.unFollowUser(userId,token);

       // Verificar se houve erro na resposta
      if(res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
      return res

    } catch (error) {
      console.log(error)
      
    }
  }
)
export const followUserContainer = createAsyncThunk(
  "user/followContainer",
  async( followData, thunkAPI) =>{

    const {userId} = followData
    const {token} = followData
    
    console.log('follow user slice executado')
    try {
      const res = await userService.followUser(userId,token);

       // Verificar se houve erro na resposta
      if(res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
      return res

    } catch (error) {
      console.log(error)
      
    }
  }
)
export const unFollowUserContainer = createAsyncThunk(
  "user/unFollowContainer",
  async( followData, thunkAPI) =>{

    const {userId} = followData
    const {token} = followData
    
    
    try {
      const res = await userService.unFollowUser(userId,token);

       // Verificar se houve erro na resposta
      if(res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
      return res

    } catch (error) {
      console.log(error)
      
    }
  }
)

export const getUserFollowers = createAsyncThunk(
  "user/getFollowers",
  async (getData, thunkAPI) => {

    const {userId} = getData
    const {token} = getData
    const {currentUserId} = getData



    try {
      const res = await userService.getUserFollowers(userId, token,currentUserId);

      // Verificar se houve erro na resposta
      if (res.errors) {
        return thunkAPI.rejectWithValue(res.errors[0]);
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserFollowing = createAsyncThunk(
  "user/getFollowing",
  async (getData, thunkAPI) => {

    const {userId} = getData
    const {token} = getData


    try {
      const res = await userService.getUserFollowing(userId, token);

      // Verificar se houve erro na resposta
      if (res.errors) {
        return thunkAPI.rejectWithValue(res.errors[0]);
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "photo/search",
  async(query,thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.searchUsers(query,token);

    return data;
  }
)



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
    resetError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.loadingPequeno = false
        console.log(action.payload)
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log(state,action)
        state.loading = false;
        state.error = action.payload;
      //  state.user = {};
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.loadingPequeno = true
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.loadingPequeno = false
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = "E-mail de recuperação enviado"
        console.log('fulfilled')
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload
          : "Ocorreu um erro ao redefinir a senha";
      //  state.message = action.payload
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false
        state.success = true;
        state.error = false;
        console.log(action.payload)
        
        state.user.followers.push(action.payload.userAtual)
        state.currentUser = action.payload.userAtual
        
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(followUser.pending, (state, action) => {
        state.loadingPequeno = true;
        state.error = action.payload
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false
        state.success = true;
        state.error = false;
        console.log(action.payload)

        // preciso remover o _id actyon.payload.userAtual do array de state.user.followers
        const index = state.user.followers.findIndex(follower => follower._id === action.payload.userAtual._id);
        if (index > -1) {
          state.user.followers.splice(index, 1);
        }
        // preciso remover o _id actyon.payload.userAtual do array de state.user.followers
        if (state.currentUser !== null && Array.isArray(state.currentUser) && state.currentUser.length > 0) {
          const index2 = state.currentUser.followers.findIndex(follower => follower._id === action.payload.userAtual._id);
          if (index2 > -1) {
            state.currentUser.following.splice(index2, 1);
          }
        }
        
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(unFollowUser.pending, (state, action) => {
        state.loading = false;
        state.loadingPequeno = true
        state.error = action.payload
      })
      .addCase(followUserContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false
        state.success = true;
        state.error = false;

        console.log(action.payload)
        console.log("userslice")

        state.currentUser = action.payload.userAtual
        //state.user.following = action.payload.user.following

        
      })
      .addCase(followUserContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(followUserContainer.pending, (state, action) => {
        state.loadingPequeno = true;
        state.error = action.payload
      })
      .addCase(unFollowUserContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false
        state.success = true;
        state.error = false;


        console.log(action.payload)

        if(state.user.followers){
          console.log('teste  ')
          // preciso remover o _id action.payload.userAtual do array de state.user.followers
          state.user.followers = state.user.followers.filter(
          (follower) => follower._id !== action.payload.userAtual
        )
        
        state.currentUser.following = action.payload.userAtual.following
        
        } else {

          state.user = action.payload.user
          
          // preciso remover o _id action.payload.userAtual do array de state.user.followers
          state.user.followers = state.user.followers.filter(
            (follower) => follower._id !== action.payload.userAtual
            );
          }

        state.currentUser.following = action.payload.userAtual.following

      })
      .addCase(unFollowUserContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(unFollowUserContainer.pending, (state, action) => {
        state.loading = false;
        state.loadingPequeno = true
        state.error = action.payload
      })
      .addCase(getUserFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        
        state.currentUser = action.payload.currentUser

        state.user.followers = action.payload.followersData.map((follower) => ({
          _id: follower.userId,
          userName: follower.userName,
          profileImage: follower.profileImage,
        }));
      })
      .addCase(getUserFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserFollowers.pending, (state, action) => {
        state.loadingPequeno = true;
        state.error = action.payload;
        
      })
      .addCase(getUserFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false
        state.success = true;
        state.error = false;

        state.currentUser = action.payload.currentUser

        state.user.following = action.payload.following.map((follower) => ({
          _id: follower.userId,
          userName: follower.userName,
          profileImage: follower.profileImage,
        }));
      })
      .addCase(getUserFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchUsers.pending, (state, action) => {
        state.loadingPequeno = true;
        state.error = action.payload;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false
        state.success = true;
        state.error = false;

        state.users = action.payload
      })
  },
});

export const { resetMessage,resetError } = userSlice.actions;
export default userSlice.reducer;
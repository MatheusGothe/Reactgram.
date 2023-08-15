import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/PhotoService";
import userService from "../services/userService";
import produce from "immer";

const initialState = {
  photos: [],
  photo: {},
  currentUser: {},
  error: false,
  success: false,
  loading: false,
  message: null,
  loadingPequeno: false,
};

// Publish user photo
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    // Check for erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);
// Get photo likes
export const getPhotoLikes = createAsyncThunk(
  "photo/getPhotoLikes",
  async (photoId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      const data = await photoService.getPhotoLikes(photoId, token);


      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }

      // Get user info for each like
      const likeInfo = data.users
    
      // Return likes with user info
      return [likeInfo,data.user] ;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Erro interno do servidor");
    }
  }
);

// Get user photos
export const getUserPhotos = createAsyncThunk(
  "photo/userphotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id, token);

    return data;
  }
);
// Delete a photo
export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    // Check for erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Update a photo
export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );
      
    // Check for erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);
// Get photo by id
export const getPhoto = createAsyncThunk(
  "photo/getphoto",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const like = createAsyncThunk("photo/like", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.like(id, token);

  // Check for erros
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  console.log(data);
  return data;
});
// Deslike a photo
export const deslike = createAsyncThunk(
  "photo/deslike",
  async (DeslikeData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const {id} = DeslikeData
    const {userIdLiked} = DeslikeData

    const data = await photoService.deslike(id, token,userIdLiked);

    // Check for erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return { data, id };
  }
);

// Add Comment to a photo
export const comment = createAsyncThunk(
  "photo/comment",
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.comment(
      { comment: commentData.comment },
      commentData.id,
      token,
      commentData.commentId
    );

    // Check for erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    console.log(data);
    return data;
  }
);

// Add Comment to a photo
export const commentHome = createAsyncThunk(
  "photo/commentHome",
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.commentHome(
      { comment: commentData.comment },
      commentData.id,
      token,
      commentData.commentId
    );

    // Check for erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return { ...data, photoId: commentData.id };
  }
);

// Remove Comment to a photo
export const removeComment = createAsyncThunk(
  "photo/remove",
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.removeComment(
      commentData.id,
      commentData.CommentId,
      token
    );

    // Check for erros
    if (data[0].errors) {
      console.log("erro");
      return thunkAPI.rejectWithValue(data[0].errors);
    }

    return data;
  }
);

// Remove Comment to a photo
export const removeCommentHome = createAsyncThunk(
  "photo/removeHome",
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.removeCommentHome(
      commentData.photoId,
      commentData.CommentId,
      token
    );

    // Check for erros
    if (data[0].errors) {
      console.log("erro");
      return thunkAPI.rejectWithValue(data[0].errors);
    }

    return { ...data, photoId: commentData.photoId };
  }
);

export const getPhotos = createAsyncThunk(
  "photo/getall",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotos(token);

    return data;
  }
);

// Search photo by title
export const searchPhotos = createAsyncThunk(
  "photo/search",
  async(query,thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.searchPhotos(query,token);

    return data;
  }
)

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false;
        state.success = true;
        state.error = null;

        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId);
        }

        state.photos.forEach((photo) => {
          if (photo._id === action.payload.photoId) {
            photo.likes.push(action.payload.userId);
            photo.clicked = true
          }
        });
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       state.photos.forEach((photo) => {
        if (photo._id === action.payload.photoId) {
          photo.clicked.push(true)
        }
      })
      })
      .addCase(like.pending, (state) => {
        state.loadingPequeno = true
        state.error = false;
      })
      .addCase(deslike.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false;
        state.success = true;
        state.error = null;
  

        const { photo } = action.payload.data[0];
        const userId  = action.payload.data[1];
        
        // Atualiza o estado da foto individual
        if (state.photo._id === photo._id) {
          console.log("caio primeiro if");
          console.log(photo)
          console.log(userId)
          const newLikes = state.photo.likes.filter((id) => id !== userId);
          state.photo.likes = newLikes;
        }

        // Atualiza o estado das fotos na página inicial
        state.photos.forEach((photo) => {
          if (photo._id === action.payload.id) {
            const newLikes = photo.likes.filter((id) => id !== userId);
            photo.likes = newLikes;
          }
        });
      })
      .addCase(deslike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deslike.pending, (state) => {
        state.loadingPequeno = true
        state.error = false;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.loadingPequeno = false


        if (state.photo.comments) {
          console.log("if");
          state.photo.comments.push(action.payload.comment);
        } else {
          console.log("else");
          state.photo.comments = [action.payload.comment];
        }

        //   state.message = action.payload.message
      })
      .addCase(comment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loadingPequeno = false


      })
      .addCase(comment.pending, (state, action) => {
        state.loadingPequeno = true;
        state.error = null

      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload[0];
        state.loadingPequeno = false
      })
      .addCase(removeComment.pending, (state, action) => {
        state.loading = false;
        state.error = null
        state.loadingPequeno = true
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null; 
        state.loadingPequeno = false

        const deletedCommentId = action.payload[1];

        state.photo.comments = state.photo.comments.filter(
          (comment) => comment.CommentId !== deletedCommentId
        );
        state.message = "Comentário Removido";
      })
      .addCase(getPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(commentHome.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.loadingPequeno = false
        // Encontre o índice da foto no array state.photos
        const photoIndex = state.photos.findIndex(
          (photo) => photo._id === action.payload.photoId
        );

        // Adicione o comentário ao array de comentários da foto
        state.photos[photoIndex].comments.push(action.payload.comment);

        // Registre o valor do estado depois de atualizá-lo
        console.log("State after updating:", state);
      })
      .addCase(commentHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loadingPequeno = false
      })
      .addCase(commentHome.pending, (state, action) => {
        state.loadingPequeno = true;
        state.error = null;
      })
      .addCase(removeCommentHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload[0];
        state.loadingPequeno = false
      })
      .addCase(removeCommentHome.pending, (state, action) => {
        state.error = null
        state.loadingPequeno = true
        console.log(state.loadingPequeno)
      })
      .addCase(removeCommentHome.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingPequeno = false
        state.success = true;
        state.error = null;

        const photoIndex = state.photos.findIndex(
          (photo) => photo._id === action.payload.photoId
        );

        // Verifique se o índice da foto foi encontrado
        if (photoIndex === -1) {
          console.error(
            `Photo with ID ${action.payload.photoId} not found in state.photos`
          );
          return;
        }

        // Verifique se a foto tem uma propriedade comments
        if (!state.photos[photoIndex].hasOwnProperty("comments")) {
          console.error(
            `Photo with ID ${action.payload.photoId} does not have a comments property`
          );
          return;
        }

        // Remova o comentário do array de comentários da foto
        const deletedCommentId = action.payload[1];
        state.photos[photoIndex].comments = state.photos[
          photoIndex
        ].comments.filter((comment) => comment.CommentId !== deletedCommentId);

        state.message = "Comentário removido";
      })
      .addCase(getPhotoLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.loadingPequeno = false
        state.photo.likesInfo = action.payload[0]
        state.currentUser = action.payload[1]


        state.photos.forEach((photo) => {
          photo.likesInfo = action.payload[0]
        });

      })
      .addCase(getPhotoLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.payload;

      })
      .addCase(getPhotoLikes.pending, (state, action) => {
        state.likesInfo = []
        state.loadingPequeno = true
        console.log('chegou pending')
      })
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

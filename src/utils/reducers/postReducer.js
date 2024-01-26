import { createSlice } from "@reduxjs/toolkit";


const posts =[];
let newPost, editPost;

const postSlice = createSlice({
  name: "userPosts",
  initialState: {
    posts: posts,
    newPost: newPost,
    loadedPosts: [],
    lastPost: false,
    editPost:editPost,
  },
  reducers: {
    setUserPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updateUserPosts: (state, action) => {
        state.posts.unshift(action.payload.post);
    },
    addNewPost: (state, action) => {
      state.newPost = action.payload;
    },
    removeNewPost: (state, action) => {
      state.newPost = null;
    },
    removeUserPosts: (state, action) => {
        state.posts = [];
    },
    setEditPost:(state,action)=>{
      state.editPost = action.payload.editPost;
    },
    removeEditPost:(state,action)=>{
      state.editPost = '';
    },


// related to common posts
    setLoadedPosts: (state, action) => {
      state.loadedPosts = [...state.loadedPosts, ...action.payload];

      if(action.payload.length < 5){
        state.lastPost = true;
      }
    },
    addCreatedPost: (state, action) => {
      state.loadedPosts = [action.payload, ...state.loadedPosts];
    },
    clearLoadedPosts: (state, action) => {
      state.loadedPosts = [];
      state.lastPost = false;
    }


  },
});

export const {
  setUserPosts,
  removeUserPosts,
  updateUserPosts,
  addNewPost,
  removeNewPost,
  setLoadedPosts,
  addCreatedPost,
  clearLoadedPosts,
  setEditPost,
  removeEditPost,
} = postSlice.actions;

export default postSlice.reducer;
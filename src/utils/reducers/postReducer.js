import { createSlice } from "@reduxjs/toolkit";

const posts = [];
let newPost, editPost;

const postSlice = createSlice({
  name: "userPosts",
  initialState: {
    posts: posts,
    newPost: newPost,
    loadedPosts: [],
    lastPost: false,
    editPost: editPost,
  },
  reducers: {
    setUserPosts: (state, action) => {
      state.posts = action.payload;
    },
    updateUserPosts: (state, action) => {
      state.posts.unshift(action.payload.post);
    },
    addNewPost: (state, action) => {
      state.newPost = action.payload;
      state.loadedPosts.unshift(action.payload);
    },
    removeNewPost: (state, action) => {
      state.newPost = null;
    },
    removeUserPosts: (state, action) => {
      state.posts = [];
    },
    setEditPost: (state, action) => {
      state.editPost = action.payload.editPost;
    },
    removeEditPost: (state, action) => {
      state.editPost = "";
    },
    editUserPost: (state, action) => {
      // Ensure state.posts is initialized as an array if it's undefined or null
      state.posts = state.posts || [];

      // Check if state.posts is an array before calling map
      if (Array.isArray(state.posts)) {
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload?._id) {
            return action.payload;
          }
          return post;
        });
      } else {
        console.error("state.posts is not an array:", state.posts);
      }
    },

    removeDeletedPost: (state, action) => {
      const posts = state.posts;
      const postId = action.payload;

      const foundPost = posts.find((obj) => obj._id === postId);

      if (foundPost) {
        const indexToDelete = posts.indexOf(foundPost);
        posts.splice(indexToDelete, 1);
      } else {
        console.log("Post Not Found");
      }
    },

    // related to common posts
    setLoadedPosts: (state, action) => {
      state.loadedPosts = [...state?.loadedPosts, ...action?.payload];

      if (action?.payload?.length < 5) {
        state.lastPost = true;
      }
    },
    editLoadedPost: (state, action) => {
      state.loadedPosts = state?.loadedPosts?.map((post) => {
        if (post._id === action.payload?._id) {
          return action.payload;
        }
        return post;
      });
    },

    addCreatedPost: (state, action) => {
      state.loadedPosts = [action.payload, ...state.loadedPosts];
    },
    clearLoadedPosts: (state, action) => {
      state.loadedPosts = [];
      state.lastPost = false;
    },
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
  editUserPost,
  editLoadedPost,
  removeDeletedPost,
} = postSlice.actions;

export default postSlice.reducer;

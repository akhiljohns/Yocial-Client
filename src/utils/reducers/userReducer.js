import { createSlice } from "@reduxjs/toolkit";
import { refreshToken, userAuth } from "../../const/localStorage";
import { authUrl } from "../../const/routes";
import { apiCall } from "../../services/User/apiCalls";

let token, isValidUser, userData, currentRoom;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: userData,
    validUser: isValidUser,
    following: [],
    followers: [],
  },
  reducers: {
    setReduxUser: (state, action) => {
      state.userData = action.payload.userData;
      state.validUser = action.payload.validUser;
    },
    updateReduxUser: (state, action) => {
      state.userData.name =
        action.payload?.userData?.name || state?.userData?.name;
      state.userData.username =
        action.payload?.userData?.username || state?.userData?.username;
      state.userData.bio =
        action.payload?.userData?.bio || state?.userData?.bio;
      state.userData.email =
        action.payload?.userData?.email || state?.userData?.email;
    },
    removeReduxUser: (state, action) => {
      state.userData = null;
      state.validUser = false;
      localStorage.removeItem(userAuth);
    },
    updateSavedPosts: (state, action) => {
      if (state?.userData?.savedPosts?.includes(action.payload)) {
        state.userData.savedPosts = state.userData.savedPosts.filter(
          (postId) => postId !== action.payload
        );
      } else {
        state.userData.savedPosts.push(action.payload);
      }
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },

    setFollowers: (state, action) => {
      state.followers = action.payload;
    },

    logOut: (state, action) => {
      state.userData = null;
      state.validUser = false;
      localStorage.removeItem(userAuth);
      localStorage.removeItem(refreshToken);
    },
  },
});

export const userAuthenticator = () => async (dispatch) => {
  try {
    token = localStorage.getItem(userAuth);
    if (token) {
      const data = {
        headers: {
          Authorization: token,
        },
      };
      apiCall("get", authUrl.authUser, data)
        .then((response) => {
          isValidUser = response.valid;
          userData = response.user;
          dispatch(setReduxUser({ userData, validUser: isValidUser }));
        })
        .catch((error) => {
          dispatch(setReduxUser({ userData: null, validUser: false }));
        });
    } else {
      dispatch(removeReduxUser());
    }
  } catch (e) {
    dispatch(removeReduxUser());
  }
};

export const removeUser = () => async (dispatch) => {
  dispatch(removeReduxUser());
};

export const {
  setReduxUser,
  updateReduxUser,
  removeReduxUser,
  setReduxChatRoom,
  updateReduxChatRoom,
  setCurrentRoom,
  updateCurrentRoom,
  setFollowing,
  setFollowers,
  updateSavedPosts,
  logOut,
} = userSlice.actions;

export default userSlice.reducer;

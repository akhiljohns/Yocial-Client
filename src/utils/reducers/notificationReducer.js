import { createSlice } from "@reduxjs/toolkit";

const notifications = [];

const notificationSlice = createSlice({
  name: "userNotifications",
  initialState: {
    notifications: notifications,
  },
  reducers: {
    setReduxNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
    addNewReduxNotification: (state, action) => {
      state.notifications = action.payload;
    },
    clearReduxNotifications: (state, action) => {
      state.notifications = [];
    },
  },
});

export const {
  setReduxNotifications,
  addNewReduxNotification,
  clearReduxNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;

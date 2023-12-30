import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import userSlice from "./reducers/userReducer";
import adminSlice from "./reducers/adminReducer";
// import postSlice from "./reducers/postReducer";
// import notificationSlice from "./reducers/notificationReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  transforms: [], // Apply any transforms if needed
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  user: userSlice,
  admin: adminSlice,
//   userPosts: postSlice,
//   notification: notificationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);




export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

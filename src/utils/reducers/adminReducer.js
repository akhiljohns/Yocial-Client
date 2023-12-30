import { createSlice } from "@reduxjs/toolkit";
import { adminAuth } from "../../const/localStorage";
import { authUrl } from "../../const/routes";
import adminApiCalls from "../../services/Admin/apiCalls";




let token, isValidAdmin, adminData;


const adminSlice = createSlice({
  name: "admin",
  initialState:{
    adminData: adminData,
    validAdmin: isValidAdmin
  },
  reducers: {
    setReduxAdmin: (state, action) => {
      state.adminData = action.payload.adminData;
      state.validAdmin = action.payload.validAdmin;
    },
    removeReduxAdmin: (state) => {
      state.adminData = null;
      state.validAdmin = false;
      localStorage.removeItem(adminAuth);
    },
  },
});


export const adminAuthenticator = () => async (dispatch) => {
  try {
    token = localStorage.getItem(adminAuth);

    if (token) {
      const data = {
        headers: {
          Authorization: token,
        },
      };
      const response = await adminApiCalls("get", authUrl.authAdmin, data).catch((error)=> {
        dispatch(removeReduxAdmin())
      })
      isValidAdmin = response.valid;
      adminData = response.admin;
      dispatch(setReduxAdmin({adminData: adminData, validAdmin: isValidAdmin}))
    } else {
      dispatch(removeReduxAdmin())
    }
  } catch (e) {
    dispatch(removeReduxAdmin())
  }
}




export const { setReduxAdmin, removeReduxAdmin } = adminSlice.actions;

export default adminSlice.reducer;

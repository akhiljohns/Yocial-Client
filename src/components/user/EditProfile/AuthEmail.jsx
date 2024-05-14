import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUserEmail } from "../../../services/User/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { updateReduxUser } from "../../../utils/reducers/userReducer";
import { errorToast, successToast } from "../../../hooks/toast";
import { emitSocketEvent } from "../../../services/User/SocketHandler";
import { motion } from 'framer-motion'; 
function AuthEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);
  const user = useSelector((state) => state?.user);
  const { id, token, type } = useParams();

  useEffect(() => {
    verifyUserEmail({ id, token, type })
      .then((response) => {
        emitSocketEvent('emailupdate', id, (res) => {
        });
        if (user) {
          console.log(response,user)
          dispatch(updateReduxUser(response?.user));
        }
        setVerified(true);
      })
      .catch((err) => {
        errorToast("INVALID TOKEN");
      });
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#212121]">
      <div className="max-w-md w-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white text-center font-semibold text-2xl mb-4"
        >
          {verified ? "Email has been verified" : "Token Expired Or Already Verified"}
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigate("/login")}
          className="bg-[#yourBrandColor] text-white py-2 px-4 rounded-md hover:bg-[#yourBrandColorDarker] transition duration-300 ease-in-out"
        >
          Continue to Login
        </motion.button>
      </div>
    </div>
  );
}

export default AuthEmail;
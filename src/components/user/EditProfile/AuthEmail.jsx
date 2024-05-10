import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUserEmail } from "../../../services/User/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { updateReduxUser } from "../../../utils/reducers/userReducer";
import { errorToast, successToast } from "../../../hooks/toast";
import { emitSocketEvent } from "../../../services/User/SocketHandler";

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
    <>
      <div>
        {verified && (
          <div className="w-full h-screen flex gap-5 justify-center items-center bg-[#212121]">
            <h1 className="text-white text-center font-semibold text-xl">
              Email has been verified
            </h1>
            <button
              onClick={() => navigate("/login")}
              className="text-[#888] hover:text-[#dddcdc] font-light "
            >
              ---- Go to home
            </button>
          </div>
        )}

        {!verified && (
          <div className="w-full h-screen flex gap-5 justify-center items-center bg-[#212121]">
            <h1 className="text-white text-center font-semibold text-xl">
              Token Expired Or Already Verified
            </h1>
            <button
              onClick={() => navigate("/login")}
              className="text-[#888] hover:text-[#dddcdc] font-light "
            >
              ---- Go home
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AuthEmail;

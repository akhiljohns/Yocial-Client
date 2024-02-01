import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserEmail } from "../../../services/User/apiMethods";
import { updateReduxUser } from "../../../utils/reducers/userReducer";
import { Spinner } from "flowbite-react";
import { errorToast, infoToast, successToast } from "../../../hooks/toast";
import { checkEmail } from "../../../hooks/regValidation";

function Email() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const userData = useSelector((state) => state?.user?.userData);

  useEffect(() => {
    if (userData) {
      setEmail(userData?.email);
    }
  }, [userData]);

  const handleSubmit = async () => {
    setLoading(true);
    const emailValid = await checkEmail(email);
    
    if(!emailValid){
      setLoading(false);
      errorToast("Enter A Valid Email Address");
    }else{
      const userDetails = {
      newEmail:email,
      userId: userData?._id,
      username: userData?.username,
      email: userData?.email,
    }
      updateUserEmail(userDetails)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          successToast(response?.message);
        } else {
          setLoading(false);
          infoToast(response?.message);
        }
      })
      .catch((err) => {        
        setLoading(false);
        errorToast(err.message);
      });
  };
  };

  return (
    <div className="flex items-center justify-center h-screen dark">
      <div className="flex items-center justify-center w-full max-w-lg bg-black rounded-lg shadow-md p-8 text-orange-500">
        <div>
          <input
            required
            type="text"
            id="fullname"
            name="fullname"
            onChange={(e) => {
              setEmail(e.target.value.trim());
            }}
            className="bg-gray-700  text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
            placeholder="Full Name"
            defaultValue={userData?.email ? userData?.email : ""}
            disabled={loading}
          />
         
          {loading && (
            <div className="w-full flex justify-center items-center">
              <Spinner
                color="info"
                aria-label="Large spinner example"
                size="lg"
              />
            </div>
          )}
          {!loading ? (
            <button
              disabled={loading}
              onClick={handleSubmit}
              type="submit"
              className="bg-gradient-to-r w-[100%] from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Submit
            </button>
          ) : null}

          {/* Response Message */}
          {responseMessage && (
            <div className={`mt-4 opacity-80`}>
              <p className="text-xl text-center text-orange-500">
                {responseMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Email;

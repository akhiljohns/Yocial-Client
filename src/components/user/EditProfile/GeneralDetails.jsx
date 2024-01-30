import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function GeneralDetails() {
  const [fName, setFname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const userData = useSelector((state) => state?.user?.userData);

useEffect(() => {

  if (userData) {
    setFname(userData?.name);
    setUsername(userData?.username);
    setBio(userData?.bio);
  }
},[userData])

  const handleSubmit = async (e) => {
      setResponseMessage("Profile updated successfully!");
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
              setFname(e.target.value.trim());
            }}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
            placeholder="Full Name"
            defaultValue={userData?.name ? userData?.name : ""}
          />
          <input
            required
            id="username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value.trim());
            }}
            type="text"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
            placeholder="User Name"
            defaultValue={userData?.username}
            />

          <textarea
            name="bio"
            id="bio"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-auto md:mb-auto md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-md:focus:outline-none:focus:ring-blue-md:focus:border-transparent transition ease-in-out duration-fastest"
            placeholder="Bio"
            defaultValue={userData?.bio ? userData?.bio : ""}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          ></textarea>

          <button
          onClick={handleSubmit}
            type="submit"
            className="bg-gradient-to-r w-[100%] from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Submit
          </button>

        {/* Response Message */}
        {responseMessage && (
          <div className={`mt-4 opacity-80`}>
            <p className="text-xl text-center text-orange-500">{responseMessage}</p>
          </div>
        )}
        </div>

      </div>
    </div>
  );
}

export default GeneralDetails;

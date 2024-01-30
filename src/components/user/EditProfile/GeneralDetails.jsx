
import React, { useState } from "react";

function GeneralDetails() {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating a success response
    setTimeout(() => {
      setLoading(false);
      setResponseMessage('Profile updated successfully!');
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen dark">
      <div className="flex items-center justify-center w-full max-w-lg bg-black rounded-lg shadow-md p-8 text-orange-500">
        <form className="flex flex-wrap w-full" onSubmit={handleSubmit}>
        <input
              type="text"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
              placeholder="Full Name"
            />
            <input
              type="email"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
              placeholder="Email"
            />
            <input
              type="number"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
              placeholder="Company Name"
            />
            <input
              type="text"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
              placeholder="Job Title"
            />
            <input
              type="date"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
              placeholder="Date of Birth"
            />
            <textarea
              name="message"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-auto md:mb-auto md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-md:focus:outline-none:focus:ring-blue-md:focus:border-transparent transition ease-in-out duration-fastest"
              placeholder="Message"
            ></textarea>
          
          
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Submit
          </button>
        </form>

        {/* Response Message */}
        {responseMessage && (
          <div className={`mt-4 ${loading ? "opacity-50" : "opacity-100"}`}>
            <p className="text-sm text-green-500">{responseMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneralDetails;

import React from "react";

function SenderText({ message }) {
  const isCloudinaryImage = message?.textMessage.includes(
    "https://res.cloudinary.com/"
  );

  return (
    <>
      {isCloudinaryImage ? (
        <div className="flex justify-end">
          <div className="bg-gray-200 p-2 rounded-md w-[18%] max-w-xs h-auto">
            <img src={message.textMessage} alt="Cloudinary Image" />
          </div>
        </div>
      ) : (
        <div className="bg-white w-fit p-3 grid grid-cols-1 max-w-lg rounded-b-lg relative rounded-r-lg pr-12">
          <span className="">{message?.textMessage}</span>
          <span className="text-[10px] font-thin absolute right-2 bottom-0">
            12:20 pm
          </span>
        </div>
      )}
    </>
  );
}

export default SenderText;

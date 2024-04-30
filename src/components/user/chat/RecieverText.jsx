import React from 'react'

function RecieverText({message}) {
  return (
    <>
      <div className="bg-purple-400 relative w-fit p-3 grid grid-cols-1 max-w-lg rounded-b-lg ml-auto rounded-l-lg pr-12">
        <span className="">{message?.textMessage}</span>
        <span className="text-[10px] font-thin absolute right-2 bottom-0">
          12:20 pm
        </span>
      </div>
    </>
  );
}

export default RecieverText
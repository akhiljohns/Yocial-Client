import React from "react";

function ReportIcon({doFunction}) {
  return (
    <>
      <div className="text-gray-500 hover:text-red-500 cursor-pointer">
        <button
          className="hover:bg-gray-50 rounded-full p-1"
          onClick={doFunction}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default ReportIcon;

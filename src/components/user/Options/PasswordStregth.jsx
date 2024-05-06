import React from "react";

function StrengthMeter({
  poorPassword,
  weakPassword,
  strongPassword,
  passwordError,
}) {
  return (
    <>
      <div className="w-full">
        <div className="flex">
          {poorPassword ? (
            <div className="bg-gradient-to-r from-red-700 via-yellow-500 to-amber-600 w-full h-1" />
          ) : null}
          {weakPassword ? (
            <div className="bg-gradient-to-r  from-amber-600 to-amber-700 w-full h-1" />
          ) : null}
          {strongPassword ? (
            <div className="bg-gradient-to-r  from-amber-700 to-green-400 w-full h-1" />
          ) : null}
        </div>
        <div className="flex justify-center items-center">
          {passwordError.toLowerCase().includes("whitespaces") ? (
            <p className="text-xs text-white mt-1">{passwordError}</p>
          ) : (
            <p className="text-xs text-white">
              Password Strength : {passwordError}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default StrengthMeter;


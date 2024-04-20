import React from 'react';

const CharacterCountIndicator = ({ value, maxLength }) => {
  const remainingChars = maxLength - value.length;

  return (
    <div className="text-gray-500 text-sm mt-1">
      {remainingChars} / {maxLength} characters remaining
    </div>
  );
};

export default CharacterCountIndicator;

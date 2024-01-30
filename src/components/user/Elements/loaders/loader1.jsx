import React from 'react';
import './loader1.css'; // Import the CSS file

function loader1({type}) {
  return (
    <div className="spinner">
      {[...Array(10)].map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
}

export default loader1;

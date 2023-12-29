import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white select-none">
      <div className="text-center animate-fadeInUp">
        <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
        <p className="text-lg mb-8 animate-slideIn">Oops! Page not found.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default Error;

import React, { useEffect, useState } from 'react'


function ErrorBoundary({children}) {

    const [hasError, setHasError] = useState(false)


    useEffect(() => {
      const handleError = (error, errorInfo) => {
        setHasError(true);
        // You can log the error to an error reporting service
        console.error("Error caught by error boundary:", error, errorInfo);
      };

      // Set up the error boundary
      window.addEventListener("error", handleError);

      return () => {
        // Clean up the error boundary
        window.removeEventListener("error", handleError);
      };
    }, []);


  if (hasError) {
    // You can render a fallback UI here
    return  <div className="h-screen flex items-center justify-center bg-gray-900 text-white select-none">
    <div className="text-center animate-fadeInUp">
      <h1 className="text-6xl font-bold mb-4 animate-bounce">502</h1>
      <p className="text-lg mb-8 animate-slideIn">Oops! Something Went Wrong | Try Again After Sometime</p>
      <button
        onClick={() => window.location.reload("/login")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out"
      >
        Go Home
      </button>
    </div>
  </div>
  } else {
    // Render children if there's no error
    return children;
  }


}

export default ErrorBoundary
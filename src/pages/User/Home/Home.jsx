import React from 'react';
import { useSelector } from 'react-redux';
import { clearUser } from '../../../services/User/apiCalls';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto">
        {/* Navbar content goes here */}
        Navbar
      </div>
    </nav>
  );
};

const Header = ({ onLogout }) => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>Welcome, User!</div>
        <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
};

const Home = () => {
const userData = useSelector((state)=> state?.user?.userData)

  return (
    <div>
      <Navbar />
      <Header onLogout={() => clearUser()}  />
      <div className="container mx-auto p-4">
        {/* Page content goes here */}
        <div>Home</div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import {clearUser} from '../../../services/User/apiCalls.js'
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-blac">
      <div className="container mx-auto">
        {/* Navbar content goes here */}
        Navbar
      </div>
    </nav>
  );
};

const Header = ({ onLogout,name }) => {
  return (
    <header className="bg-orange-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>Welcome, {name}</div>
        <button onClick={onLogout} className="bg-black px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

const Home = () => {

  return (
    <div>
      <Header onLogout={() =>clearUser()} />
      <div className="container mx-auto p-4">
        {/* Page content goes here */}
        <div>Home</div>
      </div>
    </div>
  );
};

export default Home;

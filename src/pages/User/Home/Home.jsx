import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/user/Header/Header';


// export const Header = ({ onLogout, userData }) => {
//   const navigate = useNavigate()
//   return (
//     <header className="bg-orange-500 p-4 text-white">
//       <div className="container mx-auto flex justify-between items-center">
//         <div onClick={()=> navigate(`/profile/${userData.username}`)} >Welcome, {userData.name}</div>
//         <button onClick={onLogout} className="bg-black px-4 py-2 rounded">
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

const Home = () => {
  const userData = useSelector((state) => state?.user?.userData);

  return (
    <div>
      {userData && (
        <>
          <Header />
          <div className="container mx-auto p-4">
            {/* Page content goes here */}
            <div id='homediv' className='flex flex-col items-center justify-center h-screen'>

            <div className='text-white font-extrabold'>Home</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

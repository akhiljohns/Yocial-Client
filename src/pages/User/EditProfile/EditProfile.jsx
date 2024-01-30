import React, { useState } from 'react';
import GeneralDetails from '../../../components/user/EditProfile/GeneralDetails';
import '../EditProfile/EditProfile.css'
import Header from '../../../components/user/Header/Header';

function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('general');

  const renderContent = () => {
    switch (selectedOption) {
      case 'general':
        return <GeneralDetails />;
      case 'security':
        return <div><GeneralDetails /></div>;
      case 'preferences':
        return <div><GeneralDetails /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen dark overflow-hidden">
      <Header choice={"home"} />
      
      {/* Left Sidebar with Options */}
      <div className="bg-[rgb(55,65,81)] w-[15%] h-screen ove p-4 text-white flex flex-col items-center justify-center">
        <h2 className="text-3xl mb-4 font-black text-orange-500">Edit Details</h2>
        <ul>
          <li onClick={() => setSelectedOption('general')} className="ed-btn cursor-pointer mb-2">
            General Info
          </li>
          <li onClick={() => setSelectedOption('security')} className="ed-btn cursor-pointer mb-2">
            Security
          </li>
          <li onClick={() => setSelectedOption('preferences')} className="ed-btn cursor-pointer mb-2">
            Preferences
          </li>
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="flex items-center justify-center w-3/4 p-8 text-orange-500">
        <div className="w-full max-w-lg bg-black rounded-lg shadow-md p-8 text-orange-500">

          {/* Render Content based on selected option */}
          {renderContent()}

          
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

import React from 'react';

const Profile = () => {
  return (
    <div className="gradient-custom-2 bg-blue-500 text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto py-5">
        <div className="flex items-center justify-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            alt="User Profile"
            className="rounded-full h-20 w-20 mr-4 img-thumbnail"
          />
          <div className="ms-3">
            <h5 className="text-white">Andy Horwitz</h5>
            <p className="text-white">New York</p>
          </div>
        </div>

        <div className="mt-6 text-black bg-gray-200 p-4">
          <div className="d-flex justify-content-end text-center py-1">
            <div>
              <p className="mb-1 h5">253</p>
              <p className="small text-muted mb-0">Photos</p>
            </div>
            <div className="px-3">
              <p className="mb-1 h5">1026</p>
              <p className="small text-muted mb-0">Followers</p>
            </div>
            <div>
              <p className="mb-1 h5">478</p>
              <p className="small text-muted mb-0">Following</p>
            </div>
          </div>
        </div>

        <div className="text-black p-4">
          <div className="mb-5">
            <p className="lead fw-normal mb-1 text-white">About</p>
            <div className="p-4 bg-gray-200">
              <p className="font-italic mb-1">Web Developer</p>
              <p className="font-italic mb-1">Lives in New York</p>
              <p className="font-italic mb-0">Photographer</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="lead fw-normal mb-0 text-white">Recent photos</p>
            <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
              alt="image 1"
              className="w-full rounded-3"
            />
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
              alt="image 1"
              className="w-full rounded-3"
            />
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
              alt="image 1"
              className="w-full rounded-3"
            />
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
              alt="image 1"
              className="w-full rounded-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

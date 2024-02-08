import React, { useEffect, useState } from "react";
import Header from "../../../components/user/Header/Header";
import { useSelector } from "react-redux";
import { fetchSavedPosts } from "../../../services/User/apiMethods";
function SavedPosts() {

const [savedPosts, setSavedPosts] = useState([]);
const {userData} = useSelector((state) => state?.user);

useEffect(()=>{
  fetchSavedPosts(userData?._id).then((response)=>{
    setSavedPosts(response.posts)
  })
},[userData._id])

  return (
    <>
      <div className="fixed z-40">
        <Header />
      </div>
      <div className="absolute mt-20  text-white p-4 bg-black">
        <div className="bg-black mt-6 w-full">
          <div className="grid grid-cols-5 gap-6">
            {savedPosts?.map((post) => (
            <img
              key={post?._id}
              src={post?.image}
              alt={post?.caption}
              className="w-full"
            />
            ))}
           
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedPosts;

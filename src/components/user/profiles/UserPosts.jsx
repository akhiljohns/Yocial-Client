import React from 'react'
import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom';

function UserPosts({post, admin}) {

  const navigate = useNavigate();


  const clickFun = () => {
    if(!admin){
      navigate(`/post/${post._id}`)
    }
  }

  return (
    <>
      <div
        className="aspect-square rounded border-y-2 border-x-2 lg:w-64 w-fit bg-slate-600"
        onClick={clickFun}
      >
        <LazyLoad offset={300} >
          <img
            src={post?.image}
            alt=""
            className="aspect-square w-full h-full rounded"
          />
        </LazyLoad>
      </div>
    </>
  );
}

export default UserPosts
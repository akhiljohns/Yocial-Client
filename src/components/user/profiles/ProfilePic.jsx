import React from 'react'

function ProfilePic({styleProp, image}) {
  return (
    <>
        <img src={image} alt="" className={`${styleProp}`} />
    </>
  )
}

export default ProfilePic
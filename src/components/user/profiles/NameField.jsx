import React from 'react'

function NameField({name, styleProp, doFunction}) {
  return (
    <>
        <span onClick={doFunction} className={`${styleProp}`}>{name}</span>
    </>
  )
}

export default NameField
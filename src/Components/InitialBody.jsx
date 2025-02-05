import React from 'react'
import bg1 from './Images/BodyBg.png'
import lock from './Images/lock.png'

export default function InitialBody() {
  return (
    <div className="InitialBody">
      <img src={bg1} alt="background pic" />
      <h1>Pocket Notes</h1><br/>
      <p style={{fontSize:'large'}}>Send and receive messages without keeping your phone online. <br/> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
      <div className='lock'>
        <img src={lock} alt="lock" /> <span style={{fontSize:'1rem'}} >end-to-end encrypted</span> 
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import './Profile.css'
import Myprofile from './Myprofile'
import Order from './Order'
const Profile = () => {
  const [value, setvalue] = useState(true);
  return (
    <>
      <div className='profile_main'>
        <div className='profile_header'>
          <button id="profile_header_1" onClick={() => { setvalue(true) }}>MyProfile</button>
          <button id="profile_header_1" onClick={() => { setvalue(false) }}>OrderHistory</button>

        </div>
        {
          value === true ? <Myprofile /> : <Order />
        }
      </div>

    </>

  )
}

export default Profile
import React, { useState } from 'react'
import './Profile.css'
import ProfileAddition from './ProfileAddition'
import BasicProfile from './BasicProfile'
const Profile = () => {
  const [value, setvalue] = useState(false);
  var divstyle = {
    background: "#f28e23",
    color: "white"
  }
  return (
    <>
      <div className='profile_main'>
        <div className='profile_header'>
          <button id="profile_header_1" >MyProfile</button>
          <button id="profile_header_1" >OrderHistory</button>

        </div>
        <div className='profile_header2'>
          <button id="profile_header_2" onClick={() => { setvalue(false) }} style={value === false ? divstyle : { background: "rgb(223, 223, 223)" }}>Basic Profile</button>
          <button id="profile_header_2" onClick={() => { setvalue(true); }} style={value === true ? divstyle : { background: "rgb(223, 223, 223)" }}>Friends and Family</button>

        </div>
        {
          value === true ? <ProfileAddition /> : <BasicProfile />
        }
      </div>

    </>

  )
}

export default Profile
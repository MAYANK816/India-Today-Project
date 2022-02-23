import React, { useEffect, useState } from 'react'
import ProfileComponent from './ProfileComponent';
import './AddMember.css'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
const Myprofile = () => {
  const [birthDetails, setbirthDetails] = useState([]);
  const [loginCred, setloginCred] = useState({ name: '', city: '', hour: '', minute: '', day: '', month: '', year: '', relation: '', gender: '', meridiem: '', state: '' });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://staging-api.astrotak.com/api/relative/all', {
        method: "GET",
        Accept: 'application/json',
        headers: { "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODA5NzY1MTkxIiwiUm9sZXMiOltdLCJleHAiOjE2NzY0NjE0NzEsImlhdCI6MTY0NDkyNTQ3MX0.EVAhZLNeuKd7e7BstsGW5lYEtggbSfLD_aKqGFLpidgL7UHZTBues0MUQR8sqMD1267V4Y_VheBHpxwKWKA3lQ" }
      });
      const apidata = await response.json();
      setbirthDetails(apidata.data.allRelatives);

    }
    fetchData();
  }, [])
  const loginCreds = (e) => {
    console.log(e.target.value);
    setloginCred({
      ...loginCred,
      [e.target.name]: e.target.value
    });
  }
  const postData = async () => {
    const locationUrl = 'https://staging-api.astrotak.com/api/location/place?inputPlace=' + loginCred.city + "," + loginCred.state;

    let fsname = loginCred.name.split(" ")[0];
    let lsname = loginCred.name.split(" ")[1];
    const arearesponse = await fetch(locationUrl);
    const location = await arearesponse.json();
    let Id = "0";
    let main_relation = "";
    if (loginCred.relation === "Brother" || loginCred.relation === "brother") {
      Id = "3";
      main_relation = "Brother";
    }
    else if (loginCred.relation === "Father" || loginCred.relation === "father") {
      Id = "1";
      main_relation = "Father";
    }
    else if (loginCred.relation === "Mother" || loginCred.relation === "mother") {
      Id = "2";
      main_relation = "Mother";
    }
    var obj = {
      birthDetails: {
        dobDay: loginCred.day,
        dobMonth: loginCred.month,
        dobYear: loginCred.year,
        tobHour: loginCred.hour,
        tobMin: loginCred.minute,
        meridiem: loginCred.meridiem
      },
      birthPlace: {
        placeName: location.data[0].placeName,
        placeId: location.data[0].placeId,
      },
      dateAndTimeOfBirth: loginCred.year + "-" + loginCred.month + "-" + loginCred.day + "T" + loginCred.hour + ":" + loginCred.minute + ":00",
      firstName: fsname,
      fullName: loginCred.name,
      middleName: null,
      lastName: lsname,
      relationId: Id,
      relation: main_relation,
      gender: loginCred.gender
    }


    await fetch('https://staging-api.astrotak.com/api/relative', {
      method: 'POST', mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      Accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODA5NzY1MTkxIiwiUm9sZXMiOltdLCJleHAiOjE2NzY0NjE0NzEsImlhdCI6MTY0NDkyNTQ3MX0.EVAhZLNeuKd7e7BstsGW5lYEtggbSfLD_aKqGFLpidgL7UHZTBues0MUQR8sqMD1267V4Y_VheBHpxwKWKA3lQ"
      },
      body: JSON.stringify(obj)
    }).then(function (response) {
      swal("Good job!", "Member Added Successful !", "success");
    })
      .catch((err) => {
        swal("Failed job!", "Member Not Added Successful !", "error");
      });

    navigate('/profile');
  }

  return (
    <>
      <div id="Myprofile_titles"> <p>Name</p>
        <p>DOB</p>
        <p>TOB</p>
        <p>Relation</p>
        <span></span>
        <span></span>
      </div>
      {
        birthDetails.map((item) => {
          return <ProfileComponent key={item.uuid} details={item} />
        })
      }
      <button style={{ border: "none", outline: "none", padding: "8px", marginTop: "10px", background: "#f28e23", color: "white", borderRadius: "8px" }} type="button" data-toggle="modal" data-target="#exampleModal">+ Add New Member</button>


      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">

              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className='login_component'>
                <h2>Add member </h2>
                <div className='login_form'>
                  <label>Name</label>
                  <input name='name' type="text" onChange={loginCreds} required />
                </div>
                <div className='login_form_fields'>
                  <label>Date of Birth</label>
                  <div className='login_form_fields_dob'>
                    <input placeholder='DD' name='day' maxlength="2" onChange={loginCreds} required />
                    <input placeholder='MM' name='month' maxlength="2" onChange={loginCreds} required />
                    <input placeholder='YY' name='year' maxlength="4" onChange={loginCreds} required />
                  </div>
                  <label>Time of Birth</label>
                  <div className='login_form_fields_dob' >
                    <input placeholder='HH' name='hour' onChange={loginCreds} maxlength="2" required />
                    <input placeholder='MM' name='minute' onChange={loginCreds} maxlength="2" required />
                    <input placeholder='AM' type="submit" value="AM" onClick={() => { loginCred.meridiem = 'AM' }} />
                    <input placeholder='PM' type="submit" value="PM" onClick={() => { loginCred.meridiem = 'PM' }} />
                  </div>
                </div>
                <div className='login_form'>
                  <label>City</label>
                  <input name='city' onChange={loginCreds} required />
                  <label>State</label>
                  <input name='state' onChange={loginCreds} required />
                </div>
                <div className='login_gd_rl'>

                  <label>Gender</label>
                  <label>Relation</label>
                </div>
                <div className='login_gd_rl'>
                  <select name="gender" id="gender" onChange={loginCreds}>
                    <option value="" ></option>
                    <option value="MALE" name="gender" >Male</option>
                    <option value="FEMALE" name="gender">Female</option>
                  </select>
                  <input name='relation' onChange={loginCreds} required />
                </div>
                <button value="Login" id="login_btn" data-dismiss="modal" onClick={postData}>Add Now</button>
              </div >
            </div>

          </div>
        </div>
      </div>
    </>

  )
}

export default Myprofile
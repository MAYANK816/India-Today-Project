import React, { useState } from 'react'
import './profilecmp.css'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
const ProfileComponent = ({ details }) => {
  const [loginCred, setloginCred] = useState({ name: details.fullName, city: details.birthPlace.placeName.split(",")[0], hour: details.birthDetails.tobHour, minute: details.birthDetails.tobMin, day: details.birthDetails.dobDay, month: details.birthDetails.dobMonth, year: details.birthDetails.dobYear, relation: details.relation, gender: details.gender, meridiem: details.birthDetails.meridiem, state: details.birthPlace.placeName.split(",")[1] });
  const [first, setfirst] = useState(false)
  const navigate = useNavigate();
  const deleteData = async () => {
    const response = await fetch(`https://staging-api.astrotak.com/api/relative/delete/${details.uuid}`, {
      method: 'POST',
      Accept: 'application/json',
      headers: { "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODA5NzY1MTkxIiwiUm9sZXMiOltdLCJleHAiOjE2NzY0NjE0NzEsImlhdCI6MTY0NDkyNTQ3MX0.EVAhZLNeuKd7e7BstsGW5lYEtggbSfLD_aKqGFLpidgL7UHZTBues0MUQR8sqMD1267V4Y_VheBHpxwKWKA3lQ" }
    })
    swal("Good job!", "Member Deleted Successful !", "success");
    navigate('/');
    return response.status;
  }
  let dob = details.birthDetails.dobDay + "-" + details.birthDetails.dobMonth + "-" + details.birthDetails.dobYear;
  let tob = details.birthDetails.tobHour + ":" + details.birthDetails.tobMin + "" + details.birthDetails.meridiem;
  const editUser = () => {
    console.log(loginCred);
    setfirst(!first)
  }


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
    let lsname = loginCred.name.split(" ")[1] || " ";
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
    else if (loginCred.relation === "Sister" || loginCred.relation === "sister") {
      Id = "4";
      main_relation = "Sister";
    }
    else if (loginCred.relation === "Spouse" || loginCred.relation === "spouse") {
      Id = "5";
      main_relation = "Spouse";
    }
    else if (loginCred.relation === "Son" || loginCred.relation === "son") {
      Id = "6";
      main_relation = "Son";
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
      gender: loginCred.gender,
      uuid: details.uuid
    }



    await fetch(`https://staging-api.astrotak.com/api/relative/update/${details.uuid}`, {
      method: 'POST',
      mode: 'cors',
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
      return response.json()
    })
      .catch((err) => {
        swal("Failed job!", "Member Not Added Successful !", err);
      });

    navigate('/');
    setfirst(!first)
  }
  return (
    <>
      <div className='profilecmp_main'>
        <div className='profilecmp_details'>
          <p>{details.fullName}</p>
          <p>{dob}</p>
          <p>{tob}</p>
          <p>{details.relation}</p>
          <img src="/images/pencil.png" alt="_editimage" onClick={editUser} ></img>
          <img src="/images/delete.png" alt="_delimage" onClick={deleteData}></img>
        </div>
      </div>
      {first &&
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Update User</h3>
            </div>
            <div class="modal-body">
              <div className='login_component'>
                <div className='login_form'>
                  <label>Name</label>
                  <input name='name' defaultValue={details.fullName} onChange={loginCreds} />
                </div>
                <div className='login_form_fields'>
                  <label>Date of Birth</label>
                  <div className='login_form_fields_dob'>
                    <input placeholder='DD' name='day' maxlength="2" defaultValue={details.birthDetails.dobDay} onChange={loginCreds} required />
                    <input placeholder='MM' name='month' maxlength="2" defaultValue={details.birthDetails.dobMonth} onChange={loginCreds} required />
                    <input placeholder='YY' name='year' maxlength="4" defaultValue={details.birthDetails.dobYear} onChange={loginCreds} required />
                  </div>
                  <label>Time of Birth</label>
                  <div className='login_form_fields_dob' >
                    <input placeholder='HH' maxlength="2" name='hour' defaultValue={details.birthDetails.tobHour} onChange={loginCreds} required />
                    <input placeholder='MM' maxlength="2" name='minute' defaultValue={details.birthDetails.tobMin} onChange={loginCreds} required />
                    <input placeholder='AM' maxlength="2" defaultValue={details.birthDetails.meridiem} onClick={() => { loginCred.meridiem = 'AM' }} required />
                  </div>
                </div>
                <div className='login_form'>
                  <label>City</label>
                  <input name='city' defaultValue={details.birthPlace.placeName.split(",")[0]} onChange={loginCreds} required />
                  <label>State</label>
                  <input name='state' defaultValue={details.birthPlace.placeName.split(",")[1]} onChange={loginCreds} required />
                </div>
                <div className='login_gd_rl'>

                  <label>Gender</label>
                  <label>Relation</label>
                </div>
                <div className='login_gd_rl'>
                  <input name='gender' defaultValue={details.gender} onChange={loginCreds} required />
                  <input name='relation' defaultValue={details.relation} onChange={loginCreds} required />
                </div>

              </div >
            </div>

          </div>

        </div>}
    </>
  )
}

export default ProfileComponent;
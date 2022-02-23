import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Component/Home';
import Profile from './Component/Profile';
import NavbarComponent from './Component/NavbarComponent';
import ProfileComponent from './Component/ProfileComponent';
const App = () => {
  return (
    <Router>
      <>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profilecmp" element={<ProfileComponent />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
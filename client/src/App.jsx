import React, { useState } from 'react';
import Admin from './Admin';
import Login from './Login';
import Forgotpassword from './Forgotpassword';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState("");


  console.log(admin)
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && <Route path="/Admin" element={<Admin admin={admin} />} />}
        <Route
          path="/"
          element={<Login setLoggedIn={setIsLoggedIn} setAdmin={setAdmin} />} 
        />
        <Route path="/Forgotpassword" element={<Forgotpassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Forgotpassword = () => {
  const [username, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpass, setNewpass] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://accwizztest.onrender.com/Forgot_password", {
        username,

      });
      alert(response.data.message);
      if(response.data.status){
        setOtpSent(true);
      }
      

    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://accwizztest.onrender.com/SetNewpassword", {
        username,
        otp,
        newpass,


      });
      alert(response.data.message);

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StyledForget>
      <div className="container">
        <div className="box">
          <h1>Forget Password</h1>
          <br />
          <h3 className="Email_label" htmlFor="Email">
            Email:
          </h3>
          <input
            type="text"
            placeholder="Your username here"
            className="forget-inputs"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="forget_btn"
            type="submit"
            value="Send OTP"
            onClick={handleSubmit}
          />
          <br />
          <br />
          <label htmlFor="Reset password">
            <h3> Reset Password: </h3>
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            className="forget-otp"
            disabled={!otpSent}
            required
            onChange={(e) => setOtp(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="New Password"
            className="new-password"
            disabled={!otpSent}
            required
            onChange={(e) => setNewpass(e.target.value)}
          />
          <input
            type="button"
            value="Submit"
            className="Submit-btn"
            disabled={!otpSent}
            onClick={handleSubmit1}
          />
          <br />
          <br />
          <NavLink to={"/"}>Back to login</NavLink>
          <br />
        </div>
      </div>
    </StyledForget>
  );
};
const StyledForget = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .container {
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
  }
  .box {
    padding-left: 2.5%;
    padding-top: 5vh;
    border: 1px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 25%;
    height: 75vh;
    
  }
  .Email_label{
    margin-bottom: 1vh;
  }
  .forget-inputs {
    width: 90%;
    height: 6vh;
    padding: 2%;
    border: 1px solid gray;
    border-radius: 3px;
    margin-bottom: 2vh;

  }
  .forget_btn {
    width: 90%;
    height: 6vh;
    border: 1px solid gray;
    background-color: green;
    color: white;
    border-radius: 3px;
  }
  .forget-otp{
    padding: 2%;
    width: 90%;
    height: 6vh;
    margin-bottom: 2vh;
    margin-top: 2vh;

  }
  .new-password{
    padding: 2%;
    width: 90%;
    height: 6vh;
    margin-bottom: 2vh;

  }
  .Submit-btn{
    width: 90%;
    height: 6vh;
    border: 1px solid gray;
    background-color: green;
    color: white;
    border-radius: 3px;
  }
  
`;

export default Forgotpassword;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Login = ({ setLoggedIn, setAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://accwizztest.onrender.com/login", {
        username: username,
        password: password
      });
      setAdmin(response.data.admin);
      if (response.data.status) {
        setLoggedIn(true);
        navigate('/Admin');
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <LoginBox>
        <h2 style={{textAlign:'center'}}>Login</h2><br />
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div><br />
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div><br />
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
        </FormContainer>
        <NavLink to={'/Forgotpassword'}>
          <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
        </NavLink>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
`;


const ForgotPasswordLink = styled.p`
  text-decoration: none;
  color: blue;
  cursor: pointer;
`;

export default Login;

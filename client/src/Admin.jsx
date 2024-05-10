import React from 'react'
import styled from 'styled-components';
import Mainpage from './components/Mainpage';
import Sidebar from './components/Sidebar';

const Admin = ({admin}) => {
    return (
        <StyledAdmin>
            <Sidebar />
            <Mainpage admin={admin} />
        </StyledAdmin>
    )
}

const StyledAdmin = styled.div`
  
margin: 0;
padding: 0;
box-sizing: border-box;
display: flex;
width: 100%;
min-height: 100vh;
background-color: yellow;
    


`

export default Admin
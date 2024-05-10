import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubCategories = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StyledSidebar>
            <section id='logo_section'>
                <img src="./resources/accwizz_logo.png" alt="logo" id='logo' />
            </section>
            <section id='navigation'>
                <div className="category">
                    <div className="categories" >
                        <p>Financial Management</p>
                        <FontAwesomeIcon className='drop' icon={faAngleDown} onClick={toggleSubCategories} />


                    </div>
                    {isOpen && (
                        <ul className="sub-categories">
                            <li>Manage Groups</li>
                            <li>Manage Ledgers</li>
                            <li>Display Vouchers</li>
                            <li>Link debtors ledgers</li>
                        </ul>
                    )}

                </div>

                <div className="categories">
                    <p>Revenue Management</p>
                    <FontAwesomeIcon className='drop' icon={faAngleDown} />

                </div>
                <div className="categories">
                    <p>Resource Management</p>
                    <FontAwesomeIcon className='drop' icon={faAngleDown} />

                </div>

            </section>
        </StyledSidebar>
    );
}

const StyledSidebar = styled.div`
    width: 20vw;
    height: 100vh;
    background-color: #D7C6C0;
    position: fixed;
    top: 0;
    left: 0;

    #logo_section {
        height: 8vh;
        padding: 2px;
    }

    #logo {
        width: 50px;
    }

    #navigation {
        margin-top: 10vh;
        margin-left: 15%;
    }

    .categories {
        width: 80%;
        min-height: 5vh;
        /* background-color: aqua; */
        cursor: pointer;
        display: flex;
        justify-content: space-around;
    }

    .sub-categories{
        margin-left: 15%;
    }



`;

export default Sidebar;

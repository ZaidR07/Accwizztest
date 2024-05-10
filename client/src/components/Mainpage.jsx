
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const Mainpage = ({admin}) => {
    const [Groupname, setName] = useState("");
    const [Groupcode, setGroupcode] = useState("");
    const [Parentgroup, setParentgroup] = useState("");
    const [responsegroupdata, setResponsegroupdata] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [updateid, setUpdateid] = useState(null);
    const [dltid, setdltid] = useState(null);
    

    const [addclicked, setAddclicked] = useState(false);
    const [updateclicked, setUpdatedclicked] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");




    const openOverlaybox = () => {
        setIsOpen(true);
    };

    const closeoverlaybox = () => {
        setIsOpen(false);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const addresponse = await axios.post("http://localhost:4000/Groupadd", {
                Groupname,
                Groupcode,
                Parentgroup,
                Creator : admin
            });
            if (addresponse.status) {
                handleLoad();
                alert("Group Added Succesfully")



            }


        } catch (error) {
            console.log(error);
        }
    };

    const handleupdate = async () => {

        const updateresponse = await axios.post("http://localhost:4000/update", {
            updateid,
            Groupname,
            Groupcode,
            Parentgroup
        });
        if (updateresponse.status) {
            handleLoad();
            alert("Group Updated Succesfully")



        }

    }


    const handleLoad = async () => {
        try {
            const loadresponse = await axios.get("http://localhost:4000/getdata");
            setResponsegroupdata(loadresponse.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleLoad();
    }, []);

    const handleRowsPerPageChange = (event) => {
        const value = event.target.value;
        setRowsPerPage(value === "all" ? responsegroupdata.length : parseInt(value));
    };



    const handledelete = async () => {
        if (dltid) {
            const dltresponse = await axios.post("http://localhost:4000/dlt", {
                dltid
            });
            if (dltresponse.status) {
                alert("Group Deleted")
                window.location.reload();


            }
        }

    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = responsegroupdata.filter((item) => {
        return (
            item.Groupname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Groupcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Parentgroup.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });





    const rowsToShow = filteredData.slice(0, rowsPerPage);


    return (
        <StyledMainpage>
            <section id='table'>
                <div id="table-header">
                    <h1>Manage Groups</h1>
                    <div id="table-header-buttons">
                        <button className='header-btn' onClick={() => {
                            openOverlaybox();
                            setUpdatedclicked(false);
                            setAddclicked(true);
                        }}>Add Group</button>

                        <button className='header-btn'>Download</button>
                    </div>
                </div>
                <div id="table-sub-header">
                    <h3>List of Groups</h3>
                </div>
                <div id="table-search" style={{ justifyContent: 'space-between', marginBottom: '1vh' }}>
                    <div className="display" style={{ display: 'flex' }}>
                        <p>Display</p>
                        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                            <option value="all">All</option>
                            {[5, 10, 15, 20].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>

                        <p>records</p>
                    </div>



                    <div id="search-input">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                        />
                    </div>

                </div>
                <div id="table-data">
                    <table>
                        <thead>
                            <tr>
                                <th>Group Name</th>
                                <th>Group Code</th>
                                <th>Parent Group</th>
                                <th>Action</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowsToShow.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Groupname}</td>
                                    <td>{item.Groupcode}</td>
                                    <td>{item.Parentgroup}</td>
                                    <td></td>
                                    <td>
                                        <button
                                            style={{
                                                width: '2.5vw',
                                                height: '2.5vw',
                                                backgroundColor: '#50C878',
                                                border: 'none',
                                                color: '#fff',
                                                fontSize: '1.2rem'
                                            }}
                                            onClick={() => {
                                                setAddclicked(false);
                                                setUpdatedclicked(true);
                                                setUpdateid(item.group_id);
                                                setIsOpen(true);

                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCheck} className='awesomeicons' id='update' />
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            style={{
                                                width: '2.5vw',
                                                height: '2.5vw',
                                                backgroundColor: 'red',
                                                border: 'none',
                                                color: '#fff',
                                                fontSize: '1.2rem'
                                            }}
                                            onClick={(event) => {
                                                event.preventDefault();

                                                setdltid(item.group_id);


                                                handledelete();


                                            }}
                                        >
                                            <FontAwesomeIcon icon={faXmark} className='awesomeicons' id='delete' />
                                        </button>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            {isOpen && (
                <section id='overlay-box'>
                    <button id='cross-btn' onClick={closeoverlaybox}>
                        <FontAwesomeIcon icon={faXmark}  />

                    </button>
                    {addclicked && (
                        <h2 style={{ textAlign: 'center' }}>Add Group</h2>
                    )}
                    {updateclicked && (
                        <h2 style={{ textAlign: 'center' }}>Update Group</h2>
                    )}
                    <form action="">
                        <input
                            type="text"
                            className="form-inputs"
                            name="group_name"
                            placeholder="Enter Group Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <br /><br />
                        <input
                            type="text"
                            className="form-inputs"
                            name="group_code"
                            placeholder="Enter Group Code"
                            onChange={(e) => setGroupcode(e.target.value)}
                            required
                        />
                        <br /><br />
                        <input
                            type="text"
                            className="form-inputs"
                            name="parent_group"
                            placeholder="Enter Parent Group"
                            onChange={(e) => setParentgroup(e.target.value)}
                            required
                        /> <br /><br />
                        {addclicked && (
                            <button className='submit-btns' onClick={handleSubmit}>Submit</button>

                        )}
                        {updateclicked && (
                            <button className='submit-btns' onClick={handleupdate}>Update</button>

                        )}
                    </form>
                </section>
            )}
        </StyledMainpage>
    );
};

const StyledMainpage = styled.div`
    width: 80vw;
    min-height: 100vh;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 20vw;
    padding: 2.5vw;

    #table-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1vh;
    }

    #table-sub-header {
        margin-bottom: 1vh;
        background-color: #D7C6C0;
    }

    #table-search {
        display: flex;
    }

    #overlay-box {
        top: 25vh;
        left: 30%;
        width: 30%;
        height: 40vh;
        position: absolute;
        z-index: 1;
        background-color: #D7C6C0;
        display: grid;
        place-items: center;


    }

    #cross-btn {
        position: relative;
        left: 40%;
        top: 1.5vh;
    }

    table,tr,td,th{
    border: 1px solid black;
    border-collapse: collapse;
  }
  th,td{
    font-size: 1rem;
    min-width: 8vw;
    max-width: 20vw;
    text-align: center;
    padding: 0.5%;
    
    
  }

  .header-btn{
    width: 100px;
    height: 4vh;
    color: white;
    background-color: #50C878;
    border: none;
    margin-right: 1vw;
  }

  table{
    width: 100%;
  }

  submit-btns{
    margin-left: 20%;
  }

`;

export default Mainpage;
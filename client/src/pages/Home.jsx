import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Home({ listId }) {
    const [lists, setLists] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');
  
    useEffect(() => {
        const fetchLists = async () => {
            try {
            let response;
            if(searchQuery){
                response = await axios.get(`/lists/search?q=${searchQuery}`);
            } else{
                response = await axios.get('/lists/home');
            }
            setLists(response.data);
            } catch (error) {
            console.error(error);
            }
        };
    
        fetchLists();
    }, [searchQuery]);

    //normal
    // useEffect(() => {
    //     // Fetch lists when the component mounts
    //     const fetchLists = async () => {
    //         try {
    //             const response = await axios.get('/lists/home');
    //             setLists(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchLists();
    // }, []);


    const handleDelete = async (listId, userId) => {
        try {

            const response = await axios.delete(`/lists/delete-list/${userId}/${listId}`);
    
            if(response.data.error){
                console.error(response.data.error);
            } else{
                //update the state to remove the deleted list
                setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
                
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <br />
            <br />
            <br />
            <div className="container mt-4">
                <h2>Account Collection List</h2>
                <Link to="/create-list" className="btn btn-success">
                    Add +
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Application</th>
                            <th>Account</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(lists) && lists.length > 0 ? (
                            lists.map((list) => (
                                <tr key={list._id}>
                                <td>{list.application}</td>
                                <td>{list.account}</td>
                                <td>{list.password}</td>
                                <td>
                                    <Link to={`/update-list/${list.user}/${list._id}`} className="btn btn-warning btn-sm">
                                        Update
                                    </Link>
                                    {' '}
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(list._id)}>
                                        Delete
                                    </button>
                                </td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="4">No lists found</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;

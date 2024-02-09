import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../../contexts/authContext';
import toast from 'react-hot-toast';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSignout = async () => {
        try {
            const response = await axios.post('/signout', {}, { withCredentials: true });
            setUser(null);
            toast.success(response.data.message);
            navigate('/signin')
        
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/lists/search?q=${searchQuery}`);
            console.log(response.data);
          
            navigate(`/home?q=${searchQuery}`);
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link to='/home' className="navbar-brand">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/home' className="nav-link mx-2">Home</Link>
                </li>
                <li className="nav-item">
                    <button className='btn btn-light mx-2' onClick={handleSignout}>Sign out</button>
                </li>
                <li className='nav-item'>
                    {
                        !!user && (
                            <Link className="nav-link mx-2"> {user.name}</Link>
                        )
                    }
                </li>
            </ul>
        </div>
        <form className="collapse navbar-collapse input-group ml-auto" style={{ width: '300px' }}
        onSubmit={handleSearch}>
            <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ marginRight: '10px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="input-group-append">
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </div>
        </form>
    </nav>
  )
}

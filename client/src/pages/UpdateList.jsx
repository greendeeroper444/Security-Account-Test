import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateList() {
    const navigate = useNavigate();
    const {listId, userId} = useParams()

    const [data, setData] = useState({
        application: '',
        account: '',
        password: '',
    });


    useEffect(() => {
        // Fetch list data when the component mounts
        const fetchListData = async () => {
            try {
                const response = await axios.get(`/lists/home-update-list/${userId}/${listId}`);
                const { application, account, password } = response.data;
          
                setData({ 
                    application: application || '', 
                    account: account || '',
                    password: password || ''
                });
            } catch (error) {
              console.error(error);
            }
        };
      
        fetchListData();
    }, [userId, listId]);
  

    const handleUpdate = async (e) => {
        e.preventDefault();
        const {application, account, password} = data;

        if(!application || !account || !password){
            toast.error('Please input all fields');
            return;
        }

        try {
            const response = await axios.put(`/lists/update-list/${userId}/${listId}`, {
                application,
                account,
                password,
            });

            if(response.data.error){
                toast.error(response.data.error);
            } else{
                toast.success(response.data.message);
                navigate('/home');
            }
        } catch (error) {
          console.log(error);
        }
    };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="card w-50 bg-white rounded p-3">
            <h2>Update Account List</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="application" className="form-label">
                        Application
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="application"
                    value={data.application} 
                    onChange={(e) => setData({...data, application: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="account" className="form-label">
                        Account
                    </label>
                    <input
                    type="account"
                    className="form-control"
                    id="account"
                    value={data.account} 
                    onChange={(e) => setData({...data, account: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={data.password} 
                    onChange={(e) => setData({...data, password: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-success"> Add List </button>
            </form>
        </div>
    </div>
  )
}

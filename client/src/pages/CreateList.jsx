import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CreateList() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        application: '',
        account: '',
        password: ''
    })

    // const [validationError, setValidationError] = useState('');

    const handleAddList = async(e) => {
        e.preventDefault();
        const {application, account, password} = data;

        if(!application || !account || !password){
            toast.error('Please input all fields');
            return;
        }

        //  if (!application || !account || !password) {
        //     setValidationError('Please input all fields');
        //     return;
        // }
      
        try {
            const response = await axios.post('/lists/create-list', {
                application,
                account,
                password,
            })
            if(response.data.error){
                toast.error(response.data.error)
            } else{
                setData({})
                toast.success(response.data.message)
                navigate('/home')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="card w-50 bg-white rounded p-3">
            <h2>Create Account List</h2>
            <form onSubmit={handleAddList}>
                {/* {validationError && (
                  <div className="text-danger mb-3">{validationError}</div>
                )} */}
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
                    onChange={(e) => setData({...data, account: e.target.value})} />
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
  );
}

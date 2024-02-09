import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {

  return (
    <div className="container mt-5">
        <div className="text-center">
            <h1>Welcome to Our Website</h1>
            <p className="lead">Discover amazing things and connect with others.</p>
        </div>

        <div className="row mt-5 text-center">
            <div className="col-md-6 mb-3">
                <Link to="/signin" className="btn btn-primary btn-lg btn-block">
                    Sign In
                </Link>
            </div>
            <div className="col-md-6">
                <Link to="/signup" className="btn btn-success btn-lg btn-block">
                    Sign Up
                </Link>
            </div>
        </div>
    </div>
  )
}

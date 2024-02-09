import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast';
import axios from 'axios'
import Home from './pages/Home'
import { UserContextProvider } from '../contexts/authContext'
import CreateList from './pages/CreateList'
import UpdateList from './pages/UpdateList'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  
  return (
    <UserContextProvider>
      <Toaster position='top-center' toastOptions={{ 
        // duration: 2000,
        className: '',
        style: {
          border: '1px solid #713200',
          padding: '10px',
          color: '#713200',
        },
        }}
        containerStyle={{
          top: 100,
        }} 
        />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-list" element={<CreateList />} />
        <Route path="/update-list/:userId/:listId" element={<UpdateList />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App

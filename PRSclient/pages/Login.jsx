import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import CheckerDashboard from '../pages/CheckerDashboard'

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const redirectToDash = () =>{
    navigate('/dashboard')
    // navigate('/dash')
}

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

      const handleChange =  (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      //handle login 
      const handleSubmit = async(e) => {
        e.preventDefault();
       
        try{
            const res = await axios.post('https://localhost:7057/api/user/login', formData);
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("userName", res.data.userName);
            localStorage.setItem("userType", res.data.userType);
            
           {res.data.userType ==0 || res.data.userType ==1? redirectToDash(res.data.name, res.data.userType):"Invalid User type"}
           
        }catch(error){
          return(
            alert("Invalid user type")
          )
            // console.log(error.message)
        }
      };


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className='p-10'>
        <p className='text-4xl underline'>PERSON REGISTRATION SYSTEM</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        
        <h1 className="text-2xl font-semibold mb-4 text-black">Login</h1>
        <div className='flex justify-center items center'>
          {loading? <div className='loader animate-ping border-4 border-t-4 border-gray-950 rounded-full  w-12 h-12 ease-linear'></div>:""}
        </div>
        
        <form  onSubmit={handleSubmit} className="space-y-4 flex-grow">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Type your username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Type your password"
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600">
              {loading? "Laoding":"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

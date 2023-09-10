import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import CheckerDashboard from '../pages/CheckerDashboard'

export default function Login() {
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const redirectToCheckerDash = () =>{
    navigate('/checker')
}
const redirectToMakerDash = () =>{
    navigate('/maker')
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
        setLoading(true);
        
        try{
            const res = await axios.post('https://localhost:7057/api/user/login', formData);
            console.log(res.data);
            localStorage.setItem("userId", res.data.id);
           {res.data.userType == 0? redirectToMakerDash():redirectToCheckerDash()}
           setLoading(false);
        }catch(error){
            console.log(error.message)
        }
      };


  return (
    <div className="flex justify-center items-center h-screen">
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

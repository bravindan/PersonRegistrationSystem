import React,{useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../components/Loader'

export default function CheckerDashboard(props) {
  const [people, setPeople]=useState([]);
  const [rejectedId, setRejectedId] = useState(null);
  const [approvedId, setApprovedId] = useState([]);
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate();
  const {id}= useParams();

  const navigateToLogin = () =>{navigate('/')}

  const getData = async ()=>{
    setLoading(true)
    const {data} = await axios.get("https://localhost:7057/api/PersonManager/people");
    setPeople(data)
    console.log(people);
    setLoading(false)
   } 
  
  useEffect(()=>{
    getData()
  }, [])
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  }
  const resolveStatus = (status) => {
    if(status ==0 ){
      return "Pending"
    }else if(status==1){
      return "Approved"
    }else if(status == 2){
      return "Rejected"
    }
  }

  // handle approval
  const handleApproval = async (id)=>{
    try{
      const personDTO = {
        personId:id,
        supervisedById: localStorage.getItem("userId")
      }
      await axios.post(`https://localhost:7057/api/Person/approve`, personDTO );
      setApprovedId(id)
      getData();
     
    }catch(error){
      console.log("failed to approve:", error)
    }
  }
//handle rejection
const handleRejection = async (id)=>{
  const personDTO = {
    personId:id,
    supervisedById: localStorage.getItem("userId")
  }
 await axios.post(`https://localhost:7057/api/Person/reject`, personDTO );
    setRejectedId(id)
    getData()
}
  return (
    <div className="p-3">
      {loading? (<Loader/>):
      <>
      <div className='flex justify-between mb-4'>
        <h1 className="text-2xl font-semibold mb-4">Person Data</h1>
        <button onClick={navigateToLogin} className="bg-blue-800 text-white px-3 rounded hover:bg-blue-600">Logout</button>
      </div>
      <div className='overflow-x-auto'>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-2">ID</th>
            <th className="p-2">First Name</th>
            <th className="p-2">Middle Name</th>
            <th className="p-2">Surname</th>
            <th className="p-2">Gender ID</th>
            <th className="p-2">Marital Status ID</th>
            <th className="p-2">Mobile Number</th>
            <th className="p-2">Email Address</th>
            <th className="p-2">Image</th>
            <th className="p-2">Signature</th>
            <th className="p-2">CrudType</th>
            <th className="p-2">Created By ID</th>
            <th className="p-2">Created On</th>
            {/* <th className="p-2">Status</th> */}
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => {

            const isRejected = rejectedId === person.id;
            const isApproved = person.approved;
            return(
            <tr key={person.id} className={(person.id % 2 === 0) ? 'bg-gray-100 text-gray-700' : 'bg-white text-gray-700'}>
              <td className="p-2">{person.id}</td>
                <td className="p-2">{person.firstName}</td>
                <td className="p-2">{person.middleName}</td>
                <td className="p-2">{person.surName}</td>
                <td className="p-2">{person.genderId==11? "Male":"Female"}</td>
                <td className="p-2">{person.maritalStatusId==32?"Single":"Married"}</td>
                <td className="p-2">{person.phoneNumber}</td>
                <td className="p-2">{person.emailAddress}</td>
                <td className="p-2">{person.image==94? "Passport": "National ID"}</td>
                <td className="p-2">{person.signature}</td>
                <td className="p-2">{person.crudTypeId==53?"Add":"Edit"}</td>
                <td className="p-2">{person.createdById}</td>
                <td className="p-2">{formatDate(person.createdOn)}</td>
                {/* <td className="p-2">{resolveStatus(person.approvalStatus)}</td> */}

              <td className="p-2">
                <div className='flex justify-between'>
                <button onClick={()=>handleApproval(person.id)} className={`${person.approvalStatus ==1 ? 'bg-green-500':'bg-blue-500'} text-white px-2 py-1 rounded hover:bg-green-600`}>{person.approvalStatus ==1 ? "Approved":"Approve"}</button>
                <button onClick={()=>handleRejection(person.id)} className={`${person.approvalStatus ==2 ? 'bg-red-500' : 'bg-black'} text-white px-2 py-1 rounded hover:bg-red-600 ml-2`}>{person.approvalStatus ==2 ? "Rejected":"Reject"}</button>
                </div>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
      </div>
      </>}
    </div>
  )
}

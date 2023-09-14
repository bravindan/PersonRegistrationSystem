import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'

export default function Dashboard() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams();
//   const {userTypeid} =useParams()

    const userName = localStorage.getItem("userName");
    const userType = localStorage.getItem("userType");
    console.log(userName, userType)

  const navigateToForm = () => {
    navigate("/PRForm")
  }

  const navigateToLogin = () => {
    navigate("/")
  }

  const navigateToEdit = (id) => {
    setLoading(true)
    navigate(`/edit/${id}`)
    setLoading(false)
  }

  const getData = async () => {
    setLoading(true);
    const res = await axios.get("https://localhost:7057/api/PersonManager/people");
    setPeople(res.data.reverse());
    console.log(res.data)
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  // Delete user
  const DeletePerson = async (id) => {
    try {
      await axios.delete(`https://localhost:7057/api/PersonManager/${id}`);
      setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
      console.log(`Person with id: ${id} removed`);
    } catch (error) {
      console.log("Could not delete person", error);
    }
  }

  // Handle approval
  const handleApproval = async (id) => {
    try {
      const personDTO = {
        personId: id,
        supervisedById: localStorage.getItem("userId")
      }
      await axios.post(`https://localhost:7057/api/Person/approve`, personDTO);
      getData();
    } catch (error) {
      console.log("Failed to approve:", error)
    }
  }

  // Handle rejection
  const handleRejection = async (id) => {
    const personDTO = {
      personId: id,
      supervisedById: localStorage.getItem("userId")
    }
    await axios.post(`https://localhost:7057/api/Person/reject`, personDTO);
    getData();
  }

  // approval status
  const resolveStatus = (status) => {
    if(status ==0 ){
      return "Pending"
    }else if(status==1){
      return "Approved"
    }else if(status == 2){
      return "Rejected"
    }
  }

  return (
    <div className="p-3">
      {loading ? (<Loader />) :
        <>
          <div className='flex justify-between mb-4'>
            <h1 className="text-2xl font-semibold mb-4">Person Data</h1>
            {userType === "1" ? (
                <div className='flex justify-between space-x-4'>
                    <p className='mt-3'>Welcome {userName}</p>
                    <button onClick={navigateToLogin} className="bg-blue-800 text-white px-3 rounded hover:bg-blue-600">Logout</button>
                    
                </div>
            ) : (
              <div className='flex justify-between space-x-2'>
                <p className='mr-3'>Welcome {userName}</p>
                <button onClick={navigateToForm} className="bg-blue-500 text-white px-5 rounded hover:bg-blue-600">AddNew</button>
                <button onClick={navigateToLogin} className="bg-blue-800 text-white px-3 rounded hover:bg-blue-600">Logout</button>
              </div>
            )}
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
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr key={person.id} className={(person.id % 2 === 0) ? 'bg-gray-100 text-gray-700' : 'bg-white text-gray-700'}>
                    <td className="p-2">{person.id}</td>
                    <td className="p-2">{person.firstName}</td>
                    <td className="p-2">{person.middleName}</td>
                    <td className="p-2">{person.surName}</td>
                    <td className="p-2">{person.genderId == 11 ? "Male" : "Female"}</td>
                    <td className="p-2">{person.maritalStatusId == 32 ? "Single" : "Married"}</td>
                    <td className="p-2">{person.phoneNumber}</td>
                    <td className="p-2">{person.emailAddress}</td>
                    <td className="p-2">{person.image == 94 ? "Passport" : "National ID"}</td>
                    <td className="p-2">{person.signature}</td>
                    <td className="p-2">{person.crudTypeId == 53 ? "Add" : "Edit"}</td>
                    <td className="p-2">{person.createdById}</td>
                    <td className="p-2">{formatDate(person.createdOn)}</td>
                    <td className="p-2">{resolveStatus(person.approvalStatus)}</td> 
                    {/* {userType ==1 && <td className="p-2">{resolveStatus(person.approvalStatus)}</td>} */}
                    <td className="p-2">
                      <div className='flex justify-between'>
                        {userType == "1" && (

                          <div className='flex'>
                            {person.approvalStatus ==1 &&  <button onClick={() => navigateToEdit(person.id)} className="text-white px-2 py-1 rounded bg-blue-600"> Edit</button> }
                            {person.approvalStatus == 0 && <button onClick={() => handleApproval(person.id)} className=" text-white px-2 py-1 rounded bg-green-600">Approve</button>}
                            {person.approvalStatus ==0 && <button onClick={() => handleRejection(person.id)} className="text-white px-2 py-1 rounded bg-red-600 ml-2">Reject</button> }
                            
                          </div>
                        )}
                        {
                          userType =="0" && (
                            <div className='flex'>
                              {person.approvalStatus == 1 && <p className='bg-green-500 '>Approved</p> }
                              {person.approvalStatus == 0 && <button onClick={() => navigateToEdit(person.id)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>}
                              {person.approvalStatus ==0 && <button onClick={() => DeletePerson(person.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">Delete</button> }
                            </div>
                          )
                        }
                      
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
    </div>
  )
}

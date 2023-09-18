import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faSignOut, faUserAlt, faUserEdit, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [people, setPeople] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  //   const {userTypeid} =useParams()

  const userName = localStorage.getItem("userName");
  const userType = localStorage.getItem("userType");
  // console.log(userName, userType)

  const navigateToForm = () => {
    navigate("/PRForm");
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  const navigateToEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  //edit approved person
  const navigateToEditApproved = (id) => {
    navigate(`/update/${id}`);
  };

  const getData = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://localhost:7057/api/PersonManager/people"
    );
    setPeople(res.data.reverse());
    // console.log(res.data)
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  //getting the approved person list
  const getApproved = async () => {
    try {
      const res = await axios.get("https://localhost:7057/api/Person/people");
      setApproved(res.data.reverse());
      // console.log(approved);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApproved();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Delete user
  const DeletePerson = async (id) => {
    try {
      await axios.delete(`https://localhost:7057/api/PersonManager/${id}`);
      setPeople((prevPeople) =>
        prevPeople.filter((person) => person.id !== id)
      );
      console.log(`Person with id: ${id} removed`);
    } catch (error) {
      console.log("Could not delete person", error);
    }
  };

  // Handle approval
  const handleApproval = async (id) => {
    try {
      const personDTO = {
        personId: id,
        supervisedById: localStorage.getItem("userId"),
      };
      await axios.post(`https://localhost:7057/api/Person/approve`, personDTO);
      getData();
      getApproved();
    } catch (error) {
      console.log("Failed to approve:", error);
    }
  };

  // Handle rejection
  const handleRejection = async (id) => {
    const personDTO = {
      personId: id,
      supervisedById: localStorage.getItem("userId"),
    };
    await axios.post(`https://localhost:7057/api/Person/reject`, personDTO);
    getData();
  };

  // approval status
  const resolveStatus = (status) => {
    if (status == 0) {
      return "Pending";
    } else if (status == 1) {
      return "Approved";
    } else if (status == 2) {
      return "Rejected";
    }
  };

  return (
    <div className="p-3">
      {loading ? (
        <Loader />
      ) : (
        <>
        <div className=''>
        <p className='text-xl underline text-center'>PRS DASHBOARD</p>
      </div>
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-semibold mb-4">New Person Data</h1>
            {userType === "1" ? (
              <div className="flex justify-between space-x-4">
                <p className="mt-3"><FontAwesomeIcon icon={faUserAlt} /> {" "}{userName} </p>
                <button
                  onClick={navigateToLogin}
                  className="bg-red-300 px-3 rounded hover:bg-red-600"
                >
                  <FontAwesomeIcon icon={faSignOut} />
                
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center space-x-2">
                  
                <p className="mr-3"><FontAwesomeIcon icon={faUserAlt} />{" "}{userName}  </p>
                <button
                  onClick={navigateToForm}
                  className="bg-blue-500 text-white px-5 rounded hover:bg-blue-600"
                >                  
                  <FontAwesomeIcon icon={faPlus} /> {" "}
                  New
                </button>
                <button
                  onClick={navigateToLogin}
                  className="bg-white text-white px-3 rounded hover:bg-red-200"
                >
                  <FontAwesomeIcon icon={faSignOut} className="text-red-700"/>
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th>S.N</th>
                  <th className="p-2">PID</th>
                  <th className="p-2">First Name</th>
                  <th className="p-2">Middle Name</th>
                  <th className="p-2">Surname</th>
                  <th className="p-2">Gender</th>
                  <th className="p-2">Marital Status</th>
                  <th className="p-2">Mobile Number</th>
                  <th className="p-2">Email Address</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Doc No.</th>
                  <th className="p-2">Signature</th>
                  <th className="p-2">CrudType</th>
                  <th className="p-2">CreatedBy</th>
                  <th className="p-2">CreatedOn</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {people.length == 0 ? (
                  <tr className="">
                    <td
                      colSpan={15}
                      className="text-xl text-red-600 text-center"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  people.map((person, index) => (
                    <tr
                      key={person.id}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 text-gray-700"
                          : "bg-white text-gray-700"
                      }
                    >
                      <td>{index + 1}</td>
                      <td className="p-2">{person.id}</td>
                      <td className="p-2">{person.firstName}</td>
                      <td className="p-2">{person.middleName}</td>
                      <td className="p-2">{person.surName}</td>
                      <td className="p-2">
                        {person.genderId == 11 ? "Male" : "Female"}
                      </td>
                      <td className="p-2">
                        {person.maritalStatusId == 32 ? "Single" : "Married"}
                      </td>
                      <td className="p-2">{person.phoneNumber}</td>
                      <td className="p-2">{person.emailAddress}</td>
                      <td className="p-2">
                        {person.image == 94 ? "Passport" : "National ID"}
                      </td>
                      <td className="p-2">
                        {person.documentNumber}
                      </td>
                      <td className="p-2">{person.signature}</td>
                      <td className="p-2">
                        {person.crudTypeId == 53 ? "Add" : "Edit"}
                      </td>
                      <td className="p-2">
                        {person.createdById == 1 ? "Bravin" : "Dante"}
                      </td>
                      <td className="p-2">{formatDate(person.createdOn)}</td>
                      <td className="p-2">
                        {resolveStatus(person.approvalStatus)}
                      </td>
                      {/* {userType ==1 && <td className="p-2">{resolveStatus(person.approvalStatus)}</td>} */}
                      <td className="p-2">
                        <div className="flex justify-between">
                          {userType == "1" && (
                            <div className="flex">
                              {person.approvalStatus == 1 && (
                                <button
                                  onClick={() => navigateToEdit(person.id)}
                                  className="text-white px-2 py-1 rounded bg-blue-600"
                                >
                                  <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                              )}
                              {person.approvalStatus == 0 && (
                                <button
                                  onClick={() => handleApproval(person.id)}
                                  className=" text-white px-2 py-1 rounded bg-green-600"
                                >
                                  <FontAwesomeIcon icon={faCheck}/>
                                  {/* Approve */}
                                </button>
                              )}
                              {person.approvalStatus == 0 && (
                                <button
                                  onClick={() => handleRejection(person.id)}
                                  className="text-white px-2 py-1 rounded bg-red-600 ml-2"
                                >
                                  <FontAwesomeIcon icon={faTimes}/>
                                  {/* Reject */}
                                </button>
                              )}
                            </div>
                          )}
                          {userType == "0" && (
                            <div className="flex">
                              {person.approvalStatus == 1 && (
                                <p className="bg-green-500 ">Approved</p>
                              )}
                              {person.approvalStatus == 0 && (
                                <button
                                  onClick={() => navigateToEdit(person.id)}
                                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                  <FontAwesomeIcon icon={faUserEdit}/>
                                </button>
                              )}
                              {person.approvalStatus == 0 && (
                                <button
                                  onClick={() => DeletePerson(person.id)}
                                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                  
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {/* supervised list */}
      <p className="text-2xl font-semibold">Supervised Person Data</p>
      {approved.length == 0 ? (
      <p className="flex justify-center items-center text-red-500 p-6">No records found</p>
      
      ) : (
        <>
          <div className="flex justify-between mb-4"></div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th>S.N</th>
                  <th className="p-2">PID</th>
                  <th className="p-2">First Name</th>
                  <th className="p-2">Middle Name</th>
                  <th className="p-2">Surname</th>
                  <th className="p-2">Gender</th>
                  <th className="p-2">Marital Status</th>
                  <th className="p-2">Mobile Number</th>
                  <th className="p-2">Email Address</th>
                  <th className="p-2">Image</th>
                  <th className="">Doc No.</th>
                  <th className="p-2">Signature</th>
                  {/* <th className="p-2">CrudType</th> */}
                  <th className="p-2">CreatedBy</th>
                  <th className="p-2">CreatedOn</th>
                  {/* <th className="p-2">Status</th> */}
                  <th className="p-2">SupervisedBy</th>
                  <th className="p-2">SupervsedOn</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {approved.map((person, index) => (
                  <tr
                    key={person.id}
                    className={
                      person.id % 2 === 0
                        ? "bg-gray-100 text-gray-700"
                        : "bg-white text-gray-700"
                    }
                  >
                    <td>{index + 1}</td>
                    <td className="p-2">{person.id}</td>
                    <td className="p-2">{person.firstName}</td>
                    <td className="p-2">{person.middleName}</td>
                    <td className="p-2">{person.surName}</td>
                    <td className="p-2">
                      {person.genderId == 11 ? "Male" : "Female"}
                    </td>
                    <td className="p-2">
                      {person.maritalStatusId == 32 ? "Single" : "Married"}
                    </td>
                    <td className="p-2">{person.phoneNumber}</td>
                    <td className="p-2">{person.emailAddress}</td>
                    <td className="p-2">
                      {person.image == 94 ? "Passport" : "National ID"}
                    </td>
                    <td className="p-2">
                      {person.documentNumber}
                    </td>
                    <td className="p-2">{person.signature}</td>
                    {/* <td className="p-2">{person.crudTypeId == 53 ? "Add" : "Edit"}</td> */}
                    <td className="p-2">
                      {person.createdById == 1 ? "Bravin" : "Dante"}
                    </td>
                    <td className="p-2">{formatDate(person.createdOn)}</td>
                    {/* <td className="p-2">{resolveStatus(person.approvalStatus)}</td>  */}
                    <td className="p-2">
                      {person.supervisedById == 3 ? "Kitush" : "Dave"}
                    </td>
                    <td className="p-2">{formatDate(person.supervisedOn)}</td>
                    {/* {userType ==1 && <td className="p-2">{resolveStatus(person.approvalStatus)}</td>} */}
                    <td className="p-2">
                      <div className="flex justify-between">
                        {userType == "1" && (
                          <div className="flex">
                            <button
                              onClick={() => navigateToEditApproved(person.id)}
                              className="text-white px-2 py-1 rounded bg-blue-600"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              
                            </button>
                          </div>
                        )}
                        {userType == "0" && (
                          <div className="flex">
                              
                            {/* <button onClick={() => navigateToEditApproved(person.id)} className="text-white px-2 py-1 rounded bg-blue-600"><FontAwesomeIcon icon={faEdit} /></button> */}
                            {/* <p className='px-1 bg-green-500 rounded-sm'>Approved</p> */}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

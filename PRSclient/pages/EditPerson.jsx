import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPerson() {
  const redirect =useNavigate();
    const {id} = useParams();
  // Define state variables to store form input values
  const [personData, setPersonData] = useState({
    FirstName: '',
    MiddleName: '',
    SurName: '',
    GenderId: '',
    MaritalStatusId: '',
    PhoneNumber: '',
    EmailAddress: '',
    Image: '',   
    Signature: '',
    CreatedById:localStorage.getItem("userId")
  });
  console.log(personData.CreatedById);

//   function for resetting the form
const resetForm = () => {
    setPersonData({
      FirstName: '',
      MiddleName: '',
      SurName: '',
      GenderId: '',
      MaritalStatusId: '',
      PhoneNumber: '',
      EmailAddress: '',
      Image: '',
      Signature: '',
      CreatedById: localStorage.getItem("userId")
    });
  };
  //get data from db
  useEffect(()=>{
    const getData = async () => {
        try {
          const response = await axios.get(`https://localhost:7057/api/PersonManager/people/${id}`);
          const person = response.data; 
          setPersonData(person);
          console.log(person)
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
    }
    getData()
  }, [id])
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonData({
      ...personData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', personData);
      try {
      const result = await axios.patch(`https://localhost:7057/api/personmanager/${id}`, personData);
      console.log(result.data);
      resetForm();
      redirect("/maker")
    } catch (error) {
      console.error('Error updating data:', error);
    }

  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
     
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Edit Person Details</h1>
      </div>
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-200">
            FirstName
          </label>
          <input
            type="text"
            name="FirstName"
            value={personData.FirstName}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            placeholder="Enter First Name"
          />
        </div>

        {/* Middle Name */}
        <div className="mb-4">
          <label htmlFor="middlename" className="block text-sm font-medium text-gray-200">
            MiddleName
          </label>
          <input
            type="text"
            name="MiddleName"
            value={personData.MiddleName}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            placeholder="Enter middlename"
          />
        </div>
        {/* {last name} */}
        <div className="mb-4">
          <label htmlFor="surname" className="block text-sm font-medium text-gray-200">
           SurName
          </label>
          <input
            type="text"
            name="SurName"
            value={personData.SurName}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            placeholder="Enter Surname"
          />
        </div>
        {/* Gender ID */}
        <div className="mb-4">
          <label htmlFor="genderid" className="block text-sm font-medium text-gray-200">
            Gender
          </label>
          <select
            name="GenderId"
            value={personData.GenderId}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
          >
            <option value="">Select Gender</option>
            <option value="11">Male</option>
            <option value="21">Female</option>
          </select>
        </div>

        {/* Marital Status ID */}
        <div className="mb-4">
          <label htmlFor="genderid" className="block text-sm font-medium text-gray-200">
            Marital Status
          </label>
          <select
            name="MaritalStatusId"
            value={personData.MaritalStatusId}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
          >
            <option value="">Select marital status</option>
            <option value="32">Single</option>
            <option value="42">Married</option>
          </select>
        </div>
         {/* {mobilenumber} */}
         <div className="mb-4">
          <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-200">
            Mobile Number
          </label>
          <input
            type="text"
            name="PhoneNumber"
            value={personData.PhoneNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            placeholder="Enter Mobile number"
          />
          </div>
        {/* {email address} */}
        <div className="mb-4">
          <label htmlFor="EmailAddress" className="block text-sm font-medium text-gray-200">
            Email Address
          </label>
          <input
            type="text"
            name="EmailAddress"
            value={personData.EmailAddress}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            placeholder="Enter email address"
          />
        </div>
        {/* {document type} */}
        <div className="mb-4">
          <label htmlFor="genderid" className="block text-sm font-medium text-gray-200">
            Image
          </label>
          <select
            name="Image"
            value={personData.Image}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
          >
            <option value="">Select DocumentType</option>
            <option value="84">National ID</option>
            <option value="94">Passport</option>
          </select>
        </div>
         
        {/* {signature} */}
        <div className="mb-4">
          <label htmlFor="mobilenumber" className="block text-sm font-medium text-gray-200">
            Signature
          </label>
          <input
            type="text"
            name="Signature"
            value={personData.Signature}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            placeholder="Enter signature"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

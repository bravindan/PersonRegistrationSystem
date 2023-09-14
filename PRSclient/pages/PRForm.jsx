import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PRForm() {
  const redirect =useNavigate();
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
    var result = await axios.post('https://localhost:7057/api/personmanager/create', personData)
    console.log(result.data);
    resetForm()
    redirect('/dashboard');

  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
     
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
      <div>
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">Register New Person</h1>
      </div>
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="middlename" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="genderid" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="genderid" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="EmailAddress" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="genderid" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="mobilenumber" className="block text-sm font-medium text-gray-700">
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

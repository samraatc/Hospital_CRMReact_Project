import React from 'react'
import Navbar from '../Componets/Navbar'
import staff_details from '../assets/staff_details.jpg'
import inventory from '../assets/inventory_details.jpg'
import revenue from '../assets/revenue.png'
import password_reset from '../assets/passoword_reset.png'
import systemAccessManagementlogo from '../assets/SystemAccessManagement.jpg'
import RemoveEmployeeRequests from '../assets/RemoveEmployeeRequests.png'
import SystemAccessDetailslogo from '../assets/SystemAccessDetails.png'
import logindata from '../server/login.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StaffDetails from '../server/employedata.json'
import InventoryDetails from '../server/inventory.json'
import SystemAccessDetails from '../server/SystemAccess.json'
import RemoveEmployeeRequestsData from '../server/RemoveEmployeeRequests.json'
import UpdateEmployeeRequestData from '../server/UpdateEmployeeRequests.json'
// import UpdateEmployeeReuestsLogo from '../assets/UpdateEmployeeRequests.png'
import UpdateEmployeeDetailsLogo from '../assets/updateEmployeeDetails.png'
// import axios from 'axios';

const Admin = () => {

  const [userId, setUserId] = useState('');
   const navigate = useNavigate();

    useEffect(() => {
    const receptionUser = logindata.find((user) => user.loginas === '/Admin');
    if (receptionUser) {
      setUserId(receptionUser.id);
    }
  }, []);

    const handleLogout = () => {
    // Delete data for user.loginas === "/Reception"
    const updatedLoginData = logindata.filter((user) => user.loginas !== '/Admin');
    console.log(updatedLoginData);
  
    // Send the updated login data to the backend
    axios.post('http://localhost:8080/logout', updatedLoginData)
      .then(response => {
        // Handle the response from the backend if needed
        console.log('Logout successful');
        navigate('/')
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Logout failed', error);
      });
  
    // You can perform any additional logout actions here
  };


/////Staff details ///////
 const [showStaffDetails, setShowStaffDetails] = useState(false);
 const [searchName, setSearchName] = useState('');

  const toggleStaffDetails = () => {
    setShowStaffDetails(!showStaffDetails);
  };

  const handleStaffClose=()=>{
    setShowStaffDetails(false);
  }

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const filteredStaffDetails = StaffDetails.filter((staff) =>
    staff.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const handleDeleteStaff = (id) => {
    // Make an API request to delete the staff data with the given ID
    axios
      .delete(`http://localhost:8080/api/staff/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // Data deleted successfully, perform any necessary actions (e.g., update state)
        } else {
          // Handle the error case
          console.error('Error deleting staff data');
        }
      })
      .catch((error) => {
        // Handle any network errors
        console.error('Error deleting staff data', error);
      });
  };
  
/////inventory DEtails /////

const [showInventoryDetails, setShowInventoryDetails] = useState(false);

const handleInventoryClick = () => {
  setShowInventoryDetails(!showInventoryDetails);
};

const handleCloseInventory=()=>{
  setShowInventoryDetails(false);
}



////

///////System Access Management////////////

const [showForm, setShowForm] = useState(false);
  const [loginAs, setLoginAs] = useState('');
  const [verificationNo, setVerificationNo] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleDivClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      loginAs,
      verificationNo,
      name,
      id,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/SystemAccess', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoginAs('');
    setVerificationNo('');
    setName('');
    setId('');
    setPassword('');
    setShowForm(false)
  };

  const closeSystemAcessForm = ()=>{
    setShowForm(false)
    setLoginAs('');
    setVerificationNo('');
    setName('');
    setId('');
    setPassword('');
  }




////////////////////////////////////
/////System access data/////////

const [showDetails, setShowDetails] = useState(false);
const [accessData, setAccessData] = useState([]);

const handleSystemAcessDataClick = () => {
  setShowDetails(!showDetails);
  setAccessData(SystemAccessDetails);
};

const closeAccessDetails = () => {
  setShowDetails(false)
}


const removeAccess = (id) => {
  // Send the access.id value to the backend
  fetch('http://localhost:8080/removeAccess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend if needed
      console.log(data);
      alert("successfully removed")
      setShowDetails(false);
      // setShowDetails(true);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });}




/////////////////////
/////Remove Emplyee requests/////////

const [showData, setShowData] = useState(false);

const toggleData = () => {
  setShowData(!showData);
};

const closeRemoveEmployeeRequest=()=>{
  setShowData(false);
}

const handleRemoveEmployee = (id) => {
    // Send a DELETE request to the backend API to delete the employee data
    axios.delete(`http://localhost:8080/api/employees/${id}`)
      .then(response => {
        // Handle the success response
        console.log('Employee data deleted successfully');
        // Perform any additional actions or update the UI as needed
      })
      .catch(error => {
        // Handle the error response
        console.error('Failed to delete employee data', error);
        // Display an error message or handle the error condition appropriately
      });
    };

//////////



///////////Update Employee Requests//////////
const [showDataUpdate, setShowDataUpdate] = useState(false);

const toggleDataUpdate = () => {
  setShowDataUpdate(!showDataUpdate);
};

const closeUpdateEmployeeRequest=()=>{
  setShowDataUpdate(false);
}






////////////////////////////////////




  return (

    <>
 
      <Navbar></Navbar>
<div className='bg-white mx-10 rounded-xl shadow-md shadow-white'>

      <div className='mt-10 w-full font-semibold flex items-center justify-center flex-col '>
        <div className='flex flex-row gap-10'>
            <h1 className='text-5xl mb-10 mt-7 w-3/4'>Admin Desk</h1>
            <button
              className='bg-blue-700 p-2 font-semibold rounded-3xl w-40 h-10 mt-8 hover:text-white hover:shadow-xl drop-shadow-xl hover:bg-blue-800'
              type='submit'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        <h1 className='text-xl mb-10'>Admin id:{userId}</h1>
      </div>
      <section className='mx-10 pb-10' >
      <div className="grid grid-cols-4 gap-6 grid-flow-row">
          <div  onClick={toggleStaffDetails}
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
        
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={staff_details} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Staff details</h3>
          </div>

          <div>
      <div
        className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
        onClick={handleInventoryClick}
      >
        <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
          <img src={inventory} alt="" className="h-20 w-20" />
        </div>
        <h3 className="text-xl font-semibold">Inventory details</h3>
      </div>

  
    </div>

          <div
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
          
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={revenue} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Revenue details</h3>
          </div>
          <div
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
          
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={password_reset} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Password Reset</h3>
          </div>
          <div  onClick={handleDivClick}
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
          
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={systemAccessManagementlogo} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">System Access Management</h3>
          </div>       {showForm && (
        <div className="fixed inset-0 flex items-center justify-center transition-all drop-shadow-2xl  ease-in-out">
          <div className=" w-1/4 p-6 rounded-lg shadow-lg bg-slate-800 ">
            <h2 className="text-3xl text-center font-bold mb-4 text-white">Grant Access</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="loginAs" className="block font-semibold mb-1 text-white">Login As:</label>
                <input
                  type="text"
                  id="loginAs"
                  value={loginAs}
                  onChange={(e) => setLoginAs(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="verificationNo" className="block font-semibold mb-1 text-white">Verification No:</label>
                <input
                  type="text"
                  id="verificationNo"
                  value={verificationNo}
                  onChange={(e) => setVerificationNo(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="name" className="block font-semibold mb-1 text-white">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="id" className="block font-semibold mb-1 text-white">ID:</label>
                <input
                  type="text"
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-semibold mb-1 text-white">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="font-semibold bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:shadow-lg hover:shadow-green-600"
              >
                Submit
              </button>
              <button onClick={closeSystemAcessForm} className=" font-semibold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600  hover:shadow-lg hover:shadow-red-400 ml-2">Close</button>
            </form>
          </div>
        </div>
      )}

          <div   onClick={handleSystemAcessDataClick}
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
          
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={SystemAccessDetailslogo} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">System Access Details</h3>
          </div>

          <div onClick={toggleData}
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
          
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={RemoveEmployeeRequests} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Remove Employee Requests</h3>
          </div> {showData && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className=" p-4 rounded-lg shadow-lg grid grid-cols-2 gap-4 bg-slate-800">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={toggleData}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-4 grid gap-2 ">
        <h1 className='text-3xl m-3 font-bold mb-5 '>Remove Emplyee Request</h1>
        {RemoveEmployeeRequestsData.map((employee) => (
  
          <div key={employee.id} className="border p-2 rounded-lg text-white w-40">
            <p className="text-lg font-semibold text-white"><span>Name:</span>{employee.name}</p>
            <p className="text-white" > <span>Id:</span>{employee.id}</p>
            <button className='p-3 rounded-lg bg-green-500 hover:bg-green-700 mt-5'onClick={() => handleRemoveEmployee(employee.id)}>Remove</button>
          </div>
          
        ))}
        
   <button onClick={closeRemoveEmployeeRequest} className='mt-3 font-semibold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600  hover:shadow-lg hover:shadow-red-400 ml-2 w-20'>Close</button>
      </div>
   
    </div>
  </div>
)}

          
          <div   onClick={toggleDataUpdate}
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
          
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={UpdateEmployeeDetailsLogo} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Update Employee Details Requests</h3>
          </div> {showDataUpdate && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className=" p-4 rounded-lg shadow-lg grid grid-cols-2 gap-4 bg-slate-800">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={toggleDataUpdate}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-4 grid gap-2 ">
        <h1 className='text-3xl m-3 font-bold mb-5 '>Update Emplyee Request</h1>
        {UpdateEmployeeRequestData.map((employee) => (
  
          <div key={employee.id} className="border p-2 rounded-lg text-white w-40">
            <p className="text-lg font-semibold text-white"><span>Name:</span>{employee.name}</p>
            <p className="text-white" > <span>Id:</span>{employee.id}</p>
            <button  className='p-3 rounded-lg bg-green-500 hover:bg-green-700 mt-5'>Update</button>
          </div>
          ))}
          
          
          
        
   <button onClick={closeUpdateEmployeeRequest} className='mt-3 font-semibold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600  hover:shadow-lg hover:shadow-red-400 ml-2 w-20'>Close</button>
      </div>
   
    </div>
  </div>
)}
         

        </div>
        
      
      </section>
     
</div>
<div>
{showStaffDetails && (
        <div className='bg-white rounded-2xl mx-9 mt-5'>
          <div className='flex justify-between'>
            <h1 className='text-4xl p-3 font-bold'>Staff Details</h1>
            <div className="flex items-center justify-center mx-3 mb-2">
            <h2 className="text-xl font-semibold">Search by Name:</h2>
            <input
              type="text"
              value={searchName}
              onChange={handleSearchChange}
              className="border border-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 ml-2 "
            />
          </div>
            <button
              onClick={handleStaffClose}
              className='m-4 p-3 font-bold text-black rounded-xl px-6 text-xl hover:bg-red-600 transition-all duration-300 ease-in-out bg-blue-700 shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-red-700 hover:text-white'
            >
              Close
            </button>
          </div>
        
          <div className="grid grid-cols-4 gap-6 mt-4 m-3 pb-3">
  {filteredStaffDetails.map((staff, index) => (
    <div
      key={index}
      className="p-4 rounded-lg transition-shadow duration-300 bg-slate-800 text-white hover:shadow-2xl hover:shadow-slate-500"
    >
      {Object.entries(staff).map(([key, value]) => (
        <div key={key}>
          <p className="font-semibold">
            <span className='text-xl capitalize mr-1'>{key}:</span> <span className='text-md  font-medium'> {value}</span> 
          </p>
        </div>
      ))}
      <button onClick={() => handleDeleteStaff(staff.id)} className='mt-4 rounded-xl bg-red-500 hover:bg-red-700 p-3 font-semibold hover:shadow-md hover:shadow-red-400 transition-all duration-150 ease-in'>Delete</button>
    </div>
  ))}
</div>
        </div>
      )}
    </div>

    {showInventoryDetails && (
        <div className='bg-white rounded-xl mx-9 my-5 p-2'> <h1 className='text-3xl font-bold m-3 '>Inventory Details</h1>
        <div className="mt-4">
          {InventoryDetails.map((item, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg bg-slate-800 text-white grid grid-cols-4">
             <p><span className='font-bold text-medium'>Type: </span> {item.type}</p>       
             <p> <span className='font-bold text-medium'>Amount:</span>  {item.amount}</p>
             <p> <span className='font-bold text-medium'>In Cost:</span> {item.inCost}</p>
             <p> <span className='font-bold text-medium'>Out Cost:</span> {item.outCost}</p>
            </div>
                  
          ))}
    
        </div>
        <button onClick={handleCloseInventory}  className='m-4 p-3 font-bold text-black rounded-xl px-6 text-xl hover:bg-red-600 transition-all duration-300 ease-in-out bg-blue-700 shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-red-700 hover:text-white'>Close</button>
        </div>
      )}

{showDetails && (
  <div className='bg-white  mt-5 rounded-xl mx-9 p-5'>
    <div className='flex justify-between'>
    <h1 className='text-3xl mb-3 font-semibold '>System Access Details</h1>
    <button onClick={closeAccessDetails}   className='m-4 p-3 font-bold text-black rounded-xl px-6 text-xl hover:bg-red-600 transition-all duration-300 ease-in-out bg-blue-700 shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-red-700 hover:text-white'>Close</button>
    </div>
   
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-2  text-white">
            {accessData.map((access, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md m-2 bg-slate-800"
              >
                <h4 className="text-lg font-semibold text-center p-2 mt-1"> <span>Details:</span> {index + 1}</h4>
                <p>Login As: {access.loginAs}</p>
                <p>Verification No: {access.verificationNo}</p>
                <p>Name: {access.name}</p>
                <p>ID: {access.id}</p>
                <p>Password: {access.password}</p>
                <button onClick={() => removeAccess(access.id)} className='mt-3 font-semibold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600  hover:shadow-lg hover:shadow-red-400 ml-2'>Remove</button>
                {/* <button className='mt-3 font-semibold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600  hover:shadow-lg hover:shadow-red-400 ml-2'>Update</button> */}
              
              </div>
               
            ))}
         
          </div>
       
         
      
        </div>
        </div>
      )}
    
    </>
  )
}

export default Admin;

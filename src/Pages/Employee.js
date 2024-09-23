import React, { useState, useEffect } from "react";
import Navbar from "../Componets/Navbar";
import add_employee from "../assets/add_employee.jpg";
import remove_employee from "../assets/remove_employee.png";
import update_employee from "../assets/update_employee.jpg";
import details from "../assets/employee_details.png";
import inventoryimg from "../assets/inventory_details.jpg";
import patientReport from "../assets/patientreport.jpg";
import inpatienentData from '../server/Inpatient.json'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Employeedata from "../server/employedata.json";
import PatientReportRecords from '../server/patientReport.json'
import ResourseUsedDetails from '../server/ResourceUsed.json'


// import patientReport from '../Componets/PatientReports'
// import PatientReports from '../Componets/PatientReports';

const Employee = () => {
  const [userId, setUserId] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const logindata = require("../server/login.json");
    const receptionUser = logindata.find(
      (user) => user.loginas === "/Employee"
    );
    if (receptionUser) {
      setUserId(receptionUser.id);
    }
  }, []);

  const handleLogout = () => {
    const logindata = require("../server/login.json");
    const updatedLoginData = logindata.filter(
      (user) => user.loginas !== "/Employee"
    );
    console.log(updatedLoginData);

    axios
      .post("http://localhost:8080/logout", updatedLoginData)
      .then((response) => {
        console.log("Logout successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send form data to the backend
    axios
      .post("http://localhost:8080/addEmployee", formData)
      .then((response) => {
        console.log("Employee added successfully");
        // Do something after successful form submission
      })
      .catch((error) => {
        console.error("Failed to add employee", error);
        // Handle error condition
      });

    handleFormClose();
  };

  const [showDetails, setShowDetails] = useState(false);
  const showDetail = () => {
    setShowDetails(true);
  };

  const hideDetails = () => {
    setShowDetails(false);
    // setSelectedPatient(null);
  };

  /////inventory management /////////////////////////////
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAddVisible, setAddVisible] = useState(false);
  const [inventoryData, setinventoryData] = useState({
    type: "",
    amount: "",
    inCost: "",
    outCost: "",
  });

  const handleMouseEnter = () => {
    setPopupVisible(true);
    setAddVisible(false);
  };

  const handleMouseLeave = () => {
    if (!isAddVisible) {
      setPopupVisible(false);
    }
  };

  const handleAddClick = () => {
    setAddVisible(true);
    setPopupVisible(true);
  };

  const closeAdd = () => {
    setAddVisible(false);
  };

  const handleChange = (e) => {
    setinventoryData({
      ...inventoryData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the server using Axios
    axios
      .post("http://localhost:8080/inventory", inventoryData)
      .then((response) => {
        console.log(response.data); // Handle the response from the server
        // Reset the form data and visibility state
        setinventoryData({
          type: "",
          amount: "",
          inCost: "",
          outCost: "",
        });
        setAddVisible(false);
        setPopupVisible(false);
      })
      .catch((error) => {
        console.error(error); // Handle any error that occurs during the request
      });
  };

  ///////////////////////////////////////////////////////////

  
  
  
  
  ////////////////patinet Report ////////////////////
  const [isPatientReportVisible, setPatientReportVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  // const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [showRecords, setShowRecords] = useState(false);
  const [matchedRecords, setMatchedRecords] = useState([]);
  const [showResourseForm , setshowResourseForm]=useState(false);


  const closeReportRecord =()=>{
    setShowRecords(false)
  }

  const closePateintDataList=()=>{
    setPatientReportVisible(false)
  }

  const togglePatientReport = () => {
    setPatientReportVisible(!isPatientReportVisible);
  };


  const handleCloseClick = () => {
    setShowForm(false);
  };

const handleResourseClick=(patient)=>{
 const patientIdResourseUpdate=  patient['adhar card'] || patient.pan || patient.passport;
  setSelectedPatientId(patientIdResourseUpdate);
  setshowResourseForm(true);
  console.log(selectedPatientId)
}


const closeResourseForm =()=>{
  setshowResourseForm(false)
}

  

  const handleUpdateClick = (patient) => {
    setSelectedPatientId(patient['adhar card'] || patient.pan || patient.passport);
    setShowForm(true);
  };



  const handleReportClick = (patient) => {
    const newSelectedPatientId = patient['adhar card'] || patient.pan || patient.passport;
    setSelectedPatientId(newSelectedPatientId);
  
    const matchedRecords = PatientReportRecords.filter(record => record.selectedPatientId === newSelectedPatientId);
    
    if (matchedRecords.length > 0) {
      setMatchedRecords(matchedRecords);
      setShowRecords(true);
      // Display the matched records in a container or perform any other desired action
      console.log(matchedRecords);
      // setShowForm(true);
    } else {
      alert('No record found');
    }
  };
  

  const [showResourseUsedDetails , setshowResourseUsedDetails] = useState(false);
  const close=()=>{
    setshowResourseUsedDetails(false);
  }


  const handleResourseDetailsClick = (patient) => {
    const newSelectedPatientId = patient['adhar card'] || patient.pan || patient.passport;
    setSelectedPatientId(newSelectedPatientId);
  
    const matchedRecords = ResourseUsedDetails.filter(record => record.selectedPatientId === newSelectedPatientId);
    
    if (matchedRecords.length > 0) {
      setMatchedRecords(matchedRecords);
      setshowResourseUsedDetails(true);
      // Display the matched records in a container or perform any other desired action
      console.log(matchedRecords);
      // setShowForm(true);
    } else {
      alert('No record found');
    }
  };
  

  

  const UpdataSubmitClick = () => {
    // Get the form data
    const formData = new FormData(document.getElementById('updatePatientForm'));
  
    // Convert the form data to an object
    const formDataObject = Object.fromEntries(formData.entries());
  
    // Add the selectedPatientId to the formDataObject
    formDataObject.selectedPatientId = selectedPatientId;
  
    // Send the form data to the backend using Axios
    axios.post('http://localhost:8080/PatientReports', formDataObject)
      .then(response => {
        // Handle the response from the backend if needed
      })
      .catch(error => {
        // Handle any errors that occurred during the request
      });
  
    // Close the form
    setShowForm(false);
    alert("Updated Sucessfully!");
  };


  const ResourseUpdateClick = () => {
    // Get the form data
    const formData = new FormData(document.getElementById('updatePatientForm'));
  
    // Convert the form data to an object
    const formDataObject = Object.fromEntries(formData.entries());
  
    // Add the selectedPatientId to the formDataObject
    formDataObject.selectedPatientId = selectedPatientId;
  
    // Send the form data to the backend using Axios
    axios.post('http://localhost:8080/ResourseUsed', formDataObject)
      .then(response => {
        // Handle the response from the backend if needed
      })
      .catch(error => {
        // Handle any errors that occurred during the request
      });
  
    // Close the form
    setShowForm(false);
    alert("Updated Sucessfully!");
  };



///////patient REports ////

// Filter the data where Designation is "Doctor"
const doctors = Employeedata.filter(employee => employee.Designation === "Doctor");

const [selectedDoctorId, setSelectedDoctorId] = useState('');

// Generate the options
const doctorOptions = doctors.map(doctor => (
  <option key={doctor.id} value={doctor.id}>
    {doctor.name}
  </option>
));


/////////////////


/////remove Employee////////////////



const [showFormRemove, setShowFormRemove] = useState(false);
const [name, setName] = useState('');
const [id, setId] = useState('');

const handleSubmitRemove = async (e) => {
  e.preventDefault();

  // Send the data to the backend using Axios
  try {
    const response = await axios.post('http://localhost:8080/removeEmployee', { name, id });
    console.log(response.data); // Handle the response from the backend
  } catch (error) {
    console.error(error);
  }

  // Clear the form and hide it
  setName('');
  setId('');
  setShowFormRemove(false);
  alert("Request sended to admin")
};

const handleClose = () => {
  // Clear the form and hide it
  setName('');
  setId('');
  setShowFormRemove(false);
};

const showFormRe =()=>{
  setShowFormRemove(true)
}
  
const [showFormUpdate, setShowFormUpdate] = useState(false);

const handleSubmitUpdate = async (e) => {
  e.preventDefault();

  // Send the data to the backend using Axios
  try {
    const response = await axios.post('http://localhost:8080/UpdateEmployee', { name, id });
    console.log(response.data); // Handle the response from the backend
  } catch (error) {
    console.error(error);
  }

  // Clear the form and hide it
  setName('');
  setId('');
  setShowFormUpdate(false);
  alert("Request sended to admin")
};

const handleCloseUpdate = () => {
  // Clear the form and hide it
  setName('');
  setId('');
  setShowFormUpdate(false);
};


const showUpdateForm=()=>{
  setShowFormUpdate(true)
}

  
////patient record downalod /////


const handleDownload = () => {
  // Create a new array to store the data to be sent to the backend
  const dataToSend = matchedRecords.map((record) => ({
    Body_Temperature: record.Body_Temperature,
    BP: record.BP,
    Test_Performed: record.Test_Performed,
    Test_Result: record.Test_Result,
    Custom_Test: record.Custom_Test,
    'Shift-Ward': record['Shift-Ward'],
    DoctorAssigned: record.DoctorAssigned,
    time: record.time,
    date: record.date,
  }));

  // Send the data to the backend using Axios
  axios.post('http://localhost:8080/DownloadReport', dataToSend)
    .then((response) => {
      // Handle the response from the backend
      console.log('Data sent successfully:', response);
    })
    .catch((error) => {
      // Handle errors, if any
      console.error('Error sending data:', error);
    });
};




////////////////////


  /////////////////////////

  return (
    <>
      <Navbar />
      <div className="bg-white mx-10 rounded-xl shadow-md shadow-white">
        <div className="mt-10 w-full font-semibold flex items-center justify-center flex-col ">
        <div className='flex flex-row gap-10'>
            <h1 className='text-5xl mb-10 mt-7 w-3/4'>Employee Desk</h1>
            <button
              className='bg-blue-700 p-2 font-semibold rounded-3xl w-40 h-10 mt-8 hover:text-white hover:shadow-xl drop-shadow-xl hover:bg-blue-800'
              type='submit'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <h1 className="text-4xl mb-10">Employee id: {userId}</h1>
        </div>
        <section className="mx-10 pb-10">
          <div className="grid grid-cols-4 gap-6 grid-flow-row">
            <div
              className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
              onClick={handleFormOpen}
            >
              <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
                <img src={add_employee} alt="" className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-semibold">Add employee</h3>
            </div>

            <div onClick={showFormRe} className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg">
              <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
                <img src={remove_employee} alt="" className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-semibold">Remove Employee</h3>
            </div> {showFormRemove && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Remove Employee</h2>
            <form onSubmit={handleSubmitRemove}>
              <input
                type="text"
                placeholder="Name"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Employee ID"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Submit
                </button>
                <button type="button" onClick={handleClose} className="px-4 py-2 bg-red-500 text-white rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

            <div onClick={showUpdateForm} className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg">
              <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
                <img src={update_employee} alt="" className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-semibold">Update Details</h3>
            </div>{showFormUpdate && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update Employee</h2>
            <form onSubmit={handleSubmitUpdate}>
              <input
                type="text"
                placeholder="Name"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Employee ID"
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Submit
                </button>
                <button type="button" onClick={handleCloseUpdate} className="px-4 py-2 bg-red-500 text-white rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            <div
              onClick={showDetail}
              className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
            >
              <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
                <img src={details} alt="" className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-semibold">Employee details</h3>
            </div>

            <div
              className={`flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg ${
                isPopupVisible ? "" : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
                <img src={inventoryimg} alt="" className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-semibold">Inventory Management</h3>
              {isPopupVisible && (
                <div className="absolute mt-2 py-2 px-4 bg-white border border-gray-300 rounded shadow">
                  <div
                    className="cursor-pointer hover:bg-gray-100 py-1 px-2"
                    onClick={handleAddClick}
                  >
                    Add
                  </div>
                  <div className="cursor-pointer hover:bg-gray-100 py-1 px-2">
                    Update
                  </div>
                </div>
              )}

              {/* Add Form */}
              {isAddVisible && (
                <div className="absolute mt-2 py-2 px-4 bg-white border border-gray-300 rounded shadow">
                  <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                      <label htmlFor="type">Type:</label>
                      <select
                        id="type"
                        className="ml-2"
                        onChange={handleChange}
                      >
                        <option value="Medicine">Medicine</option>
                        <option value="Medical Equipments">Medical Equipment</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="amount">Amount:</label>
                      <input
                        type="text"
                        id="amount"
                        className="ml-2"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-2">
                      <label htmlFor="inCost">InCost:</label>
                      <input
                        type="text"
                        id="inCost"
                        placeholder="In Rupees"
                        className="ml-2"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-2">
                      <label htmlFor="outCost">OutCost:</label>
                      <input
                        type="text"
                        id="outCost"
                        placeholder="In Rupees"
                        className="ml-2"
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </form>
                  <button
                    onClick={closeAdd}
                    className="bg-blue-600 mt-5 p-2 px-5 hover:bg-blue-800 hover:text-white font-bold rounded-2xl "
                  >
                    close
                  </button>
                </div>
              )}
            </div>

            <div
      onClick={togglePatientReport}
      className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
    >
      <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
        <img src={patientReport} alt="" className="h-20 w-20" />
      </div>
      <h3 className="text-xl font-semibold">Patient Reports</h3>
      
    
    </div>
          </div>
        </section>
      
      </div>
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center  ">
          <div className="absolute bg-gray-900 opacity-50 inset-0"></div>
          <div className="relative bg-white mx-10 my-5 p-5 rounded-xl shadow-4xl max-h-full overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">Update Patient</h2>
            {selectedPatientId && (
             <p className="font-bold mb-2">Identification No: {selectedPatientId}</p>
          )}
            <form id="updatePatientForm">
              <div className="flex flex-col mb-4 ">
                <label className="mb-2" htmlFor="Body_Temperature">Body Temperature</label>
                <input
                  type="text"
                  id="Body_Temperature"
                  name="Body_Temperature"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-2" htmlFor="Blood Pressure">Blood Pressure</label>
                <input
                  type="numbber"
                  id="BP"
                  name="BP"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-2" htmlFor="Test Performed">Test performed</label>
                <select
                  id="Test_Performed"
                  name="Test_Performed"
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="Blood_Test">Blood Test</option>
                  <option value="Urine_Test">Urine Test</option>
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-2" htmlFor="Test Result">Test Result</label>
                <input
                  type="text"
                  id="Test_Result"
                  name="Test_Result"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
               <div className="flex flex-col mb-4">
                <label className="mb-2" htmlFor="ward">Custom Test</label>
                <input
                  type="text"
                  id="Custom_Test"
                  name="Custom_Test"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
               <div className="flex flex-col mb-4">
                <label className="mb-2" htmlFor="ward">Custom Test Results</label>
                <input
                  type="text"
                  id="Custom_Test_Results"
                  name="Custom_Test_Results"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-2" htmlFor="ward">Shift Ward</label>
                <input
                  type="text"
                  id="Shift_Ward"
                  name="Shift-Ward"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col mb-4">
  <label className="mb-2" htmlFor="ward">Doctor Assigned</label>
  <select
  id="DoctorAssigned"
  name="DoctorAssigned"
  className="p-2 border border-gray-300 rounded"
  placeholder="Doctor Name"
  value={selectedDoctorId}
  onChange={event => setSelectedDoctorId(event.target.value)}
>
  {doctorOptions}
</select>

</div>


<input
    type="hidden"
    id="DocId"
    name="DocId"
    value={selectedDoctorId}
  />

    <div className="flex flex-col mb-4">
  <label className="mb-2" htmlFor="date">Date</label>
  <input
    type="date"
    id="date"
    name="date"
    className="p-2 border border-gray-300 rounded"
  />
</div>

<div className="flex flex-col mb-4">
  <label className="mb-2" htmlFor="time">Time</label>
  <input
    type="time"
    id="time"
    name="time"
    className="p-2 border border-gray-300 rounded"
  />
</div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-700 text-white p-3 m-1 rounded-xl"
                  onClick={UpdataSubmitClick}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-red-700 text-white p-3 m-1 rounded-xl"
                  onClick={handleCloseClick}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
{isPatientReportVisible && (
  <div className="mx-10 my-5 p-5 bg-white rounded-xl shadow-4xl ">
    <h2 className="text-2xl font-semibold mb-4">Patient Reports</h2>
    <div className="text-center">

    
    <table className="w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Reason</th>
          <th>Identification no.</th>
          {/* <th>Ward</th> */}
        </tr>
      </thead>
      <tbody>
        {inpatienentData.map((patient, index) => (
          <tr key={index} className="border">
            <td className="text-center py-2 px-4 border-b">
              {patient.name}
            </td>
            <td className="text-center py-2 px-4 border-b">
              {patient.age}
            </td>
            <td className="text-center py-2 px-4 border-b">
              {patient.gender}
            </td>
            <td className="text-center py-2 px-4 border-b">
              {patient.reason}
            </td>
            <td className="text-center py-2 px-4 border-b"  >
              {patient['adhar card'] || patient.pan || patient.passport}
            </td>
            {/* <td className="text-center py-2 px-4 border-b">
              {patient.ward}
            </td> */}
            <button
              className="bg-green-700 text-white p-3 m-1 rounded-xl hover:bg-green-400"
              onClick={() => handleUpdateClick(patient)} // Pass the patient data as an argument
            >
              Update
            </button>
            <button   onClick={() => handleResourseClick(patient)}   className="bg-blue-700 text-white p-3 m-1 rounded-xl hover:bg-blue-500">
              Resource Used
            </button>
            <button  onClick={() => handleReportClick(patient)} className="bg-yellow-700 text-white p-3 m-1 rounded-xl hover:bg-yellow-500">
              Report Record
            </button>
            <button  onClick={() => handleResourseDetailsClick(patient)} className="bg-yellow-700 text-white p-3 m-1 rounded-xl hover:bg-yellow-500">
              Resourse Record
            </button>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    <button className="mt-2 p-2 bg-blue-600 hover:bg-blue-800 hover:shadow-xl rounded-lg hover:text-white font=bold" onClick={closePateintDataList}>Close</button>
  </div>
)}

{showResourseForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg p-6 max-h-full overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">Add Reourse Used</h2>
            <form id="updatePatientForm">
              <div className="mb-4">
               <h3 className="font-semibold">
                 Patient_id: {selectedPatientId}
               </h3>          
               
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-1">
                  Medicine Names
                </label>
                <input
                  type="text"
                  id="Medicine"
                  name="Medicine"
                  value={formData.Medicine}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                 Quantity
                </label>
                <input
                  type="integer"
                  id="Quantity"
                  name="Quantity"
                  value={formData.Quantity}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Total Price
                </label>
                <input
                  type="Number"
                  id="Price"
                  name="Price"
                  value={formData.Price}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Medical equipment Used
                </label>
                <textarea
                  id="text"
                  name="Equipments"
                  value={formData.Equipments}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Equipment Cost
                </label>
                <input
                  id="EquipmentCost"
                  name="EquipmentCost"
                  value={formData.Equipmentcost}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></input>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Doctors Fees:
                </label>
                <input
                  id="DocFee"
                  type="numer"
                  name="DocFee"
                  value={formData.DocFee}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></input>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Date & Time:
                </label>
                <input
                  id="Date"
                  type="Date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></input>
                <input
                  id="Time"
                  type="Time"
                  name="Time"
                  value={formData.Time}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></input>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                  onClick={closeResourseForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded-md"
                  onClick={ResourseUpdateClick}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
{showRecords && matchedRecords.length > 0 && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
    <div className="bg-stone-700 p-8 rounded-lg shadow-2xl w-auto max-h-full overflow-auto">
      <h2 className="font-bold mb-4 text-white text-3xl">Patient Records</h2>
      <div>
        {/* Add a Download button */}
        <button onClick={handleDownload} className="bg-blue-700 p-4 m-3 font-bold hover:bg-blue-900 hover:shadow-xl hover:text-white rounded-2xl">
          Download
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {matchedRecords.map((record, index) => (

          <div key={index} className="bg-gray-100 p-4 my-2 rounded-lg">
            <p>Body Temperature: {record.Body_Temperature}</p>
            <p>BP: {record.BP}</p>
            <p>Test Performed: {record.Test_Performed}</p>
            <p>Test Result: {record.Test_Result}</p>
            <p>Custom_Test: {record.Custom_Test}</p>
            <p>Shift-Ward: {record['Shift-Ward']}</p>
            <p>Doctor Assigned: {record.DoctorAssigned}</p>
            <p>Time: {record.time}</p>
            <p className="text-xl font-bold mt-2">Date: {record.date}</p>
          </div>
        ))}
      </div>
      <button onClick={closeReportRecord} className="bg-blue-700 p-4 m-3 font-bold hover:bg-blue-900 hover:shadow-xl hover:text-white rounded-2xl">
        Close
      </button>
    </div>
  </div>
)}




{showResourseUsedDetails && matchedRecords.length > 0 && (
     
        <div className="fixed top-0 left-0 right-0 bottom-0 flex   items-center justify-center z-50 ">
        <div className="bg-stone-700 p-8 rounded-lg shadow-2xl w-auto max-h-full overflow-auto">
          <h2 className=" font-bold mb-4 text-white text-3xl">Resourse Used Records</h2>
    <div>
      
    </div>
    <div className="grid grid-cols-4 gap-3">

   
          {matchedRecords.map((record, index) => (
            <div key={index} className="bg-gray-100 p-4 my-2 rounded-lg">
              <p>Medicine: {record.Medicine}</p>
              <p>Quantity: {record.Quantity}</p>
              <p>Price: {record.Price}</p>
              <p>Equipments: {record.Equipments}</p>
              <p>EquipmentCost: {record.EquipmentCost}</p>
              <p>DocFee: {record.DocFee}</p>
              {/* <p>DocFee: {record['Shift-Ward']}</p> */}
              {/* <p>Doctor Assigned: {record.DoctorAssigned}</p> */}
              <p>Time: {record.Time}</p>
              <p className="text-xl font-bold mt-2">Date: {record.Date}</p>
              {/* <p>Date: {record.date}</p> */}
              {/* <p>: {record.date}</p> */}
              {/* Include additional fields you want to display */}
            </div>
          ))}
           </div>
            <button onClick={close} className="bg-blue-700 p-4 m-3 font-bold hover:bg-blue-900 hover:shadow-xl hover:text-white rounded-2xl ">close</button>
        </div>
      </div>
    
     

  
      )}





      
      

      {/* Add Employee Form */}
      
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg p-6 max-h-full overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Gender
                </label>
                <input
                  type="text"
                  id="Gender"
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Contact number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></input>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></input>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  ID number
                </label>
                <input
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></input>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Designation
                </label>
                <input
                  id="Designation"
                  name="Designation"
                  value={formData.Designation}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                ></input>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                  onClick={handleFormClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDetails && (
        <div className="mx-10 my-5 p-5 bg-white rounded-xl shadow-4xl">
          <h2 className="text-2xl font-semibold mb-4">Employee Details</h2>
          <table className="w-full">
            <thead>
              <tr>
                {/* <th className="py-2 px-4 border-b">Employee Id</th> */}
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Contact number</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">ID number</th>
                <th className="py-2 px-4 border-b">Designation</th>
              </tr>
            </thead>
            <tbody className="">
              {Employeedata.map((patient, index) => (
                <tr key={index}>
                  {/* <td className="text-center py-2 px-4 border-b">
                    {patient.Employeeid}
                  </td> */}
                  <td className="text-center py-2 px-4 border-b">
                    {patient.name}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {patient.email}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {patient.address}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {patient.phone}
                  </td>
                  {/* <td className='text-center py-2 px-4 border-b'>{ patient['adhar card']|| patient.pan ||patient.passport}</td> */}
                  <td className="text-center py-2 px-4 border-b">
                    {patient.Gender}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {patient.age}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {patient.id}
                  </td>
                  <td className="text-center py-2 px-4 border-b">
                    {patient.Designation}
                  </td>
                  <td>
                    {/* <button
                      className='px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-800 hover:shadow-xl'
                      onClick={() => selectPatient(patient)}
                    >
                      View
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 px-4 py-2 bg-blue-800 text-white font-bold hover:text-white hover:bg-gray-600 rounded-xl shadow-2xl"
            onClick={hideDetails}
          >
            Close
          </button>
        </div>
      )} 
      
    </>
  );
};

export default Employee;

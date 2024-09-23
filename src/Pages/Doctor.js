import React from 'react'
import Navbar from '../Componets/Navbar'
import patientreport_img from '../assets/patientreport.jpg'
import appointment_img from '../assets/appointment.png'
import patient_details from '../assets/patient_details.png'
import logindata from '../server/login.json';
import accessdata from '../data/logindata.json'
import Inpatientdetails from '../server/Inpatient.json'
import AppointmentData from '../server/AppointmentData.json'
import PatientReportData from '../server/patientReport.json'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Doctor = () => {

   
  
  
  const navigate = useNavigate();
   const [userId, setUserId] = useState('');
   const [Verification , setVerification] = useState();

    useEffect(() => {
    const receptionUser = logindata.find((user) => user.loginas === '/Doctor');
    if (receptionUser) {
      setUserId(receptionUser.id);
    }
  }, []);


  
// const Popup = ({ patientData, onClose }) => {
//   return (
//     <div className="popup">
//       <div className="popup-content">
//         <h3>Matched Patient Data:</h3>
//         <p>Doctor Assigned: {patientData.DoctorAssigned}</p>
//         <p>Body Temperature: {patientData.Body_Temperature}</p>
//         <p>BP: {patientData.BP}</p>
//         <p>Test Performed: {patientData.Test_Performed}</p>
//         {/* Add more patient data fields here */}
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };



 



  



    const handleLogout = () => {
    // Delete data for user.loginas === "/Reception"
    const updatedLoginData = logindata.filter((user) => user.loginas !== '/Doctor');
    console.log(updatedLoginData);
    setUserId('')
  
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
  

  /////appointment//////
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [type, settype] = useState("")
  const handleDivClick = () => {
    const currentDate = new Date();

    // Filter appointments with dates and times ahead of the current date and time
    const upcomingAppointments = AppointmentData.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const appointmentTime = new Date(`${appointment.date}T${appointment.time}`);

      return (
        appointmentDate > currentDate ||
        (appointmentDate.getTime() === currentDate.getTime() && appointmentTime > currentDate)
      );
    });

    setSelectedAppointment(upcomingAppointments);
    settype('Upcoming');
    setShowPopup(true);
  };

  const handleHistoryClick = () => {
    const currentDate = new Date();

    // Filter appointments with dates and times passed from the current date and time
    const historyAppointments = AppointmentData.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const appointmentTime = new Date(`${appointment.date}T${appointment.time}`);

      return (
        appointmentDate < currentDate ||
        (appointmentDate.getTime() === currentDate.getTime() && appointmentTime < currentDate)
      );
    });

    setSelectedAppointment(historyAppointments);
    settype('History');
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };




  /////////////////////


  //////////////patient Report///////
  // const [showPatinetDetails, setShowPatientDetails] = useState(false);
  const [matchedPatientData, setMatchedPatientData] = useState(null);
  const [Details , setDetails] = useState(false);
  const Popup = ({ patientData, onClose }) => {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${Details ? 'visible' : 'hidden'}`}>
        <div className="bg-stone-700 rounded-lg p-8">
          <h3 className="text-xl mb-4">Patient Details:</h3>
          {PatientReportData.map((patient, index) => {
            const matchedPatient = Inpatientdetails.find((inpatient) => inpatient['adhar card'] || inpatient.pan || inpatient.passport === patient.selectedPatientId);
            const patientName = matchedPatient ? matchedPatient.name : '';
            return (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4 rounded-xl p-3 bg-white">
                <p className="col-span-2">Patient ID: {patient.selectedPatientId}</p>
                <h5 className="col-span-2">Patient Name: {patientName}</h5>
                <p>Body Temperature: {patient.Body_Temperature}</p>
                <p>BP: {patient.BP}</p>
                <p>Test Performed: {patient.Test_Performed}</p>
                {/* Add more patient data fields here */}
              </div>
            );
          })}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  

  const handleMatch = () => {
    const receptionUser = accessdata['/Doctor'].find((user) => user.id === userId);
    if (receptionUser) {
      const Verification_noMatched = receptionUser.Verification_no;
      setVerification(Verification_noMatched);
  
      // Check if the Verification value matches with DoctorAssigned in PatientReportData
      const matchedPatient = PatientReportData.find(
        (patient) => patient.DoctorAssigned === Verification_noMatched
      );
      if (matchedPatient) {
        setMatchedPatientData(matchedPatient);
        // console.log("This is matched patie"+ [matchedPatient]);
        setDetails(true);
      }
    }
  };


  const closeReport = () => {
    setDetails(false);
    setMatchedPatientData(null);
  };

  
  // useEffect to log the updated value of Verification
  useEffect(() => {
    console.log(Verification);
  }, [Verification]);



  ////Patient Details//////////
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [matchedPatients, setMatchedPatients] = useState([]);
  const [verificationNo, setVerificationNo] = useState('');

  const handlePatientDetails = () => {
    const receptionUser = accessdata['/Doctor'].find((user) => user.id === userId);
    if (receptionUser) {
      const verificationNoMatched = receptionUser.Verification_no;
      setVerificationNo(verificationNoMatched);

      // Check if the Verification value matches with DoctorAssigned in patientReportData
      const matchedPatientsData = PatientReportData.filter(
        (patient) => patient.DoctorAssigned === verificationNoMatched
      );
      if (matchedPatientsData.length > 0) {
        setMatchedPatients(matchedPatientsData);
        console.log('Matched data:', matchedPatientsData);
        setDetailsVisible(true);
        matchedPatientsData.forEach((patient) => {
          console.log("Selected Patient ID:", patient.selectedPatientId);
        });
      } else {
        console.log('No matched');
      }
    }
  };

  useEffect(() => {
    console.log('This is verification number: ' + verificationNo);
  }, [verificationNo]);

  const closePatientDetails=()=>{
    setDetailsVisible(false);
  }


  



  return (
    <>
   
      <Navbar></Navbar>
<div className='bg-white mx-10 rounded-xl shadow-md shadow-white'>

      <div className='mt-10 w-full font-semibold flex items-center justify-center flex-col '>
      <div className='flex flex-row gap-10'>
            <h1 className='text-5xl mb-10 mt-7 w-3/4'>Doctor Desk</h1>
            <button
              className='bg-blue-700 p-2 font-semibold rounded-3xl w-40 h-10 mt-8 hover:text-white hover:shadow-xl drop-shadow-xl hover:bg-blue-800'
              type='submit'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        <h1 className='text-4xl mb-10'>Doctor id:{userId}</h1>
      </div>
      <section className='mx-10 pb-10' >
      <div className="grid grid-cols-3 gap-6 grid-flow-row">
          <div  onClick={handleMatch}
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
        
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={patientreport_img} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Patient Reports</h3>
          </div>
          {Details && (
        <Popup patientData={matchedPatientData} onClose={closeReport} />
      )}

          <div>
      {/* Your other JSX code */}
      <div
        className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
        onClick={() => handleDivClick(AppointmentData)}
      >
        <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
          <img src={appointment_img} alt="" className="h-20 w-20" />
        </div>
        <h3 className="text-xl font-semibold">Appointments (Upcomming)</h3>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-stone-700 p-8 rounded-lg shadow-2xl w-auto max-h-full overflow-auto">
            <h2 className="text-4xl text-white font-semibold text-center mb-2">
              Appointment Details
            </h2>
            <p className="text-white text-center mb-3 text-2xl">{type}</p>
            <div className="grid grid-cols-4 gap-3">
              {selectedAppointment &&
                selectedAppointment.map((appointment, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-300 rounded-lg bg-white"
                  >
                    <p className="text-lg font-semibold mb-2">
                      Patient Name: {appointment.patientName}
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      Health Status:{" "}
                      <span className="font-light">
                        {appointment.healthStatus}
                      </span>
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      Date: {appointment.date}
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      Time: {appointment.time}
                    </p>
                  </div>
                ))}
            </div>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-700 hover:bg-blue-800 hover:shadow-xl rounded-xl w-full"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>


    <div
        className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
        
      >
        <div onClick={handleHistoryClick} className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
          <img src={appointment_img} alt="" className="h-20 w-20" />
        </div>
        <h3 className="text-xl font-semibold">Appointments (History)</h3>
      </div>

      <div
        onClick={handlePatientDetails}
        className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
      >
        <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
          <img src={patient_details} alt="" className="h-20 w-20" />
        </div>
        <h3 className="text-xl font-semibold">Patient Details</h3>
      </div>
   
        </div>
        


        
      
      </section>

</div>

<div className='bg-white m-6 mx-10 rounded-e-lg p-3'>


{detailsVisible && matchedPatients.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4"> Patients details:</h2>
    {matchedPatients.map((patient, index) => {
      // Find the matching record in Inpatientdetails based on adhar card value
      const matchedPatientData = Inpatientdetails.find(
        (data) => data['adhar card'] === patient.selectedPatientId
      );

      if (matchedPatientData) {
        return (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded bg-slate-700">
            <h3 className="text-lg font-semibold mb-2">Patient {index + 1}</h3>
            <p className="text-white">
              <span className="font-semibold">Name:</span> {matchedPatientData.name}
            </p>
            <p className="text-white">
              <span className="font-semibold">Age:</span> {matchedPatientData.age}
            </p>
            <p className="text-white">
              <span className="font-semibold">Gender:</span> {matchedPatientData.gender}
            </p>
            {/* Render other patient details here */}
          </div>
        );
      } 
      
      
      else {
        return null; // Ignore unmatched records
      }
    })}
    <button className='bg-blue-700 hover:bg-red-600 px-7 py-3 rounded-xl  font-bold '  onClick={closePatientDetails}>close</button>
  </div>
  
)}
</div>

    </>
  )
}

export default Doctor

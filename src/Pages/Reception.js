import React, { useEffect, useState } from 'react';
import Navbar from '../Componets/Navbar';
import admitlogo from '../assets/admit.png';
import releaselogo from '../assets/release.webp';
import allpatientlogo from '../assets/allpatient.webp';
import Billlogo from '../assets/bill.jpg'
import logindata from '../server/login.json';
import inpatientdata from '../server/Inpatient.json';
import EmployeeData from '../server/employedata.json'
import ResourceUsedData from '../server/ResourceUsed.json'
import PaymentDetailsData from '../server/payment.json'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Reception = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [showAdmitForm, setShowAdmitForm] = useState(false);
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    identification: '',
    contactNumber: '',
    reason: '',
    ward: '',
  });
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  // const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const receptionUser = logindata.find((user) => user.loginas === '/Reception');
    if (receptionUser) {
      setUserId(receptionUser.id);
    }
  }, []);

  const handleLogout = () => {
    const updatedLoginData = logindata.filter((user) => user.loginas !== '/Reception');
    axios
      .post('http://localhost:8080/logout', updatedLoginData)
      .then((response) => {
        console.log('Logout successful');
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  const openAdmitForm = () => {
    setShowAdmitForm(true);
  };

  const closeAdmitForm = () => {
    setShowAdmitForm(false);
  };

  const handleFormChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const submitAdmitForm = () => {
    axios
      .post('http://localhost:8080/admit', patientData)
      .then((response) => {
        alert('Admission successful');
        setPatientData({
          name: '',
          age: '',
          gender: '',
          identification: '',
          contactNumber: '',
          reason: '',
          ward: '',
        });
        closeAdmitForm();
      })
      .catch((error) => {
        console.error('Admission failed', error);
      });
  };

  const showPatientDetail = () => {
    setShowPatientDetails(true);
  };

  const hidePatientDetails = () => {
    setShowPatientDetails(false);
    // setSelectedPatient(null);
  };

  // const selectPatient = (patient) => {
  //   setSelectedPatient(patient);
  //   showPatientDetails();
  // };


////appointments////////////////////////////////////////
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    healthIssue: '',
    doctorName: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with the form data
    const appointmentData = {
      patientName: formData.patientName,
      healthStatus: formData.healthStatus,
      doctorName: formData.doctorName,
      date: formData.date,
      time: formData.time,
      // id: formData.id,
    };
  
    // Send the data to the endpoint using Axios
    axios.post('http://localhost:8080/Appointment', appointmentData)
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
        setShowForm(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
    }




    //////////////////////////////Release patient//////////
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [idNumber, setIdNumber] = useState('');
   const [name, setName] = useState('');
   const [matchingData, setMatchingData] = useState(null);
   const [showPaymentForm, setShowPaymentForm] = useState(false);

    const handleClick = () => {
      setIsFormVisible(true);
    };
  
    const handleSubmitRelease = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('ID Number:', idNumber);
      console.log('Name:', name);
      const matchingData = ResourceUsedData.find(data => data.selectedPatientId === idNumber);
  
      if (matchingData) {
        setMatchingData(matchingData);
        // Display the container with the matching data
        console.log(matchingData); // Replace this with your code to display the container
      }else{
        setMatchingData(null);
        console.log("not found"); // Replace this with your code to display
      }
      
    };
    const handleClose = () => {
      setIsFormVisible(false);
      setIdNumber();
      setName();
      setMatchingData(null);
     
    };

  

    const calculateTotalBill = (data) => {
      let total = 0;
      data.forEach((item) => {
        total += Number(item.Price) + Number(item.EquipmentCost) + Number(item.DocFee);
      });
      return total;
    };

    
    
    const [PaidtotalAmount, setPaidTotalAmount] = useState(0);
    
const calculateRemainingBill = (data, paidAmount) => {
  const totalBill = calculateTotalBill(data);
  const remainingAmount = totalBill - paidAmount;
  return remainingAmount;
};
    

useEffect(() => {
  const calculateTotalAmount = () => {
    if (matchingData && matchingData.selectedPatientId) {
      let sum = 0;

      PaymentDetailsData.forEach((payment) => {
        if (payment.patientId === matchingData.selectedPatientId) {
          sum += Number(payment.amount);
        }
      });

      setPaidTotalAmount(sum);
    }
  };

  calculateTotalAmount();
}, [matchingData]);





  

const handleConfirmPayment = () => {
  setShowPaymentForm(true);
};

const handleCloseconfirmPayment = () => {
  setShowPaymentForm(false)
  setAmount();
  setPaymentOption("");
  setShowPatientDetails('')
  setPaymentType("full")
}

// const handlePaymentSubmit = (e) => {
//   e.preventDefault();
//   // Handle payment submission logic here
// };

const [paymentOption, setPaymentOption] = useState('');
const [onlinePaymentDetails, setOnlinePaymentDetails] = useState('');
const [paymentType, setPaymentType] = useState('full');
const [amount, setAmount] = useState('');

const handlePaymentOptionChange = (e) => {
  setPaymentOption(e.target.value);
};

const handleOnlinePaymentDetailsChange = (e) => {
  setOnlinePaymentDetails(e.target.value);
};

const handlePaymentSubmit = (e) => {
  e.preventDefault();
  // Handle payment submission logic here
};

const handlePaymentTypeChange = (event) => {
  setPaymentType(event.target.value);
};

const handleAmountChange = (event) => {
  setAmount(event.target.value);
};
    

////payment submit//////

const handlePaymentSubmitForm = async (event) => {
  event.preventDefault();
  
  // Get the hidden patient ID and total amount
  const hiddenPatientId = document.querySelector('.hidden').textContent;
  const totalAmount = calculateTotalBill(ResourceUsedData);
  
  // Prepare the data to be sent to the backend
  const paymentData = {
    patientId: hiddenPatientId,
    totalAmount,
    paymentOption,
    onlinePaymentDetails,
    paymentType,
    amount,
  };

  try {
    // Send the payment data to the backend using Axios
    const response = await axios.post('http://localhost:8080/PaymentDetails', paymentData);

    // Handle the response from the backend
    console.log('Payment successful!', response.data);
    
    // Perform any necessary actions after successful payment, e.g., show a success message, update UI, etc.
    
    // Close the payment form
    setShowPaymentForm(false);
  } catch (error) {
    // Handle errors during payment submission
    console.error('Payment failed!', error);
    
    // Perform any necessary error handling, e.g., show an error message, update UI, etc.
  }
};



    ///////////////////////



    ////release patient/////

    
    const [isReleaseFormVisible, setIsReleaseFormVisible] = useState(false);
    const [idRelease, setIdRelease] = useState('');


    const handleReleaseClick = () => {
      setIsReleaseFormVisible(true);
    };

    const handleCloseRelease =()=>{
      setIsReleaseFormVisible(false);
    }

    const handleReleasepateint  = (e) => {
      e.preventDefault();
    
      // Find all matching patients in the JSON data
      const matchedPatients = ResourceUsedData.filter(patient => patient.selectedPatientId === idRelease);
    
      if (matchedPatients.length > 0) {
        matchedPatients.map((patient, index) => (
          console.log(`Patient ${index + 1} details:`),
          console.log('Name:', patient.name),
          console.log('Medicine:', patient.Medicine),
          console.log('Quantity:', patient.Quantity),
          console.log('Price:', patient.Price),
          console.log('Equipments:', patient.Equipments),
          console.log('EquipmentCost:', patient.EquipmentCost),
          console.log('DocFee:', patient.DocFee),
          console.log('Date:', patient.Date),
          console.log('Time:', patient.Time)
        ));
      } else {
        console.log('No matching patients found.');
      }
    };
    


    ////////////////

  return (
    <>
      <Navbar />
      <div className='bg-white mx-10 rounded-xl shadow-md shadow-white'>
        <div className='mt-10 w-full font-semibold flex items-center justify-between flex-col '>
          <div className='flex flex-row gap-10'>
            <h1 className='text-5xl mb-10 mt-7 w-3/4'>Reception Desk</h1>
            <button
              className='bg-blue-700 p-2 font-semibold rounded-3xl w-40 h-10 mt-8 hover:text-white hover:shadow-xl drop-shadow-xl hover:bg-blue-800'
              type='submit'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <h1 className='text-2xl mb-10 text-black'>User id: {userId}</h1>
        </div>
        <section className='mx-10 pb-10'>
          <div className='grid grid-cols-4 gap-6 grid-flow-row'>
            <div
              className='flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg'
              onClick={openAdmitForm}
            >
              <div className='h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center'>
                <img src={admitlogo} alt='' className='h-20 w-20' />
              </div>
              <h3 className='text-xl font-semibold'>Admit Patient</h3>
            </div>
           
           
            <div
              className='flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg'
              onClick={handleReleaseClick}
            >
              <div className='h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center'>
                <img src={releaselogo} alt='' className='h-20 w-20' />
              </div>
              <h3 className='text-xl font-semibold'>Release Patient</h3>
            </div>
            
            {isReleaseFormVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='flex flex-col items-center justify-center border rounded-2xl p-5 cursor-default bg-white shadow-lg'>
            <h3 className='text-xl font-semibold mb-4'>Release Patient</h3>
            <form className='w-64' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='idNumber' className='block text-sm font-medium text-gray-700'>
                  ID Number
                </label>
                <input
                  id='idNumber'
                  type='text'
                  className='border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full'
                  value={idRelease}
                  onChange={(e) => setIdRelease(e.target.value)}
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white py-2 px-4 rounded-lg mr-2'
                  onClick={handleReleasepateint}
                >
                  Submit
                </button>
                <button
                  type='button'
                  className='bg-gray-300 text-gray-700 py-2 px-4 rounded-lg'
                  onClick={handleCloseRelease}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            

            <div  onClick={handleClick}
              className='flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg'
            >
              <div className='h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center'>
                <img src={Billlogo} alt='' className='h-20 w-20' />
              </div>
              <h3 className='text-xl font-semibold'>Generate BIll</h3>
            </div> {isFormVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='flex flex-col items-center justify-center border rounded-2xl p-5 cursor-default bg-white shadow-lg'>
            <h3 className='text-xl font-semibold mb-4'>Enter patient details</h3>
            <form className='w-64' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='idNumber' className='block text-sm font-medium text-gray-700'>
                  ID Number
                </label>
                <input
                  id='idNumber'
                  type='text'
                  className='border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full'
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  className='border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white py-2 px-4 rounded-lg mr-2'
                  onClick={handleSubmitRelease}
                >
                  Submit
                </button>
                <button
                  type='button'
                  className='bg-gray-300 text-gray-700 py-2 px-4 rounded-lg'
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     {matchingData && (
  <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
    <div className='max-h-full overflow-auto flex flex-col items-center justify-center border rounded-lg p-4 bg-white shadow-lg max-w-3xl mx-4'>
      <h3 className='text-2xl font-semibold mb-4'>Patient Bill</h3>
      <p className='mb-2'><span className='font-semibold text-gray-600'>ID Number:</span> {matchingData.selectedPatientId}</p>
      <p className='mb-2'><span className='font-semibold text-gray-600'>Name:</span> {matchingData.name}</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {ResourceUsedData.map((data, index) => (
          <div key={index} className='border rounded-lg p-4'>
            <p className='mb-2'><span className='font-semibold text-gray-600'>Medicine:</span> {data.Medicine}</p>
            <p className='mb-2'><span className='font-semibold text-gray-600'>Quantity:</span> {data.Quantity}</p>
            <p className='mb-2'><span className='font-semibold text-gray-600'>Price:</span> {data.Price} Rs</p>
            <p className='mb-2'><span className='font-semibold text-gray-600'>Equipments:</span> {data.Equipments}</p>
            <p className='mb-2'><span className='font-semibold text-gray-600'>EquipmentCost:</span> <span className='text-green-600'>Rs-{data.EquipmentCost}</span></p>
            <p className='mb-2'><span className='font-semibold text-gray-600'>DocFee:</span> <span className='text-green-600'>Rs-{data.DocFee}</span></p>
            <p className='mb-2'><span className='font-semibold text-gray-600'>Date:</span> {data.Date}</p>
            {/* Display other properties as needed */}
          </div>
        ))}
        <button className='bg-red-500 text-white py-2 px-4 rounded-lg mt-6 shadow-lg hover:shadow-2xl shadow-red-500 hover:bg-red-700 transition-all duration-300 ease-in-out  ' onClick={handleClose}>close</button>
      </div>
      <h3 className='text-lg mt-6 font-bold text-green-700'>Total Bill Amount: <span className='text-black'> Rs {calculateTotalBill(ResourceUsedData)}</span> </h3>
      <h3 className='text-lg mt-6 font-bold text-orange-600'>Paid Bill Amount: <span className='text-black'>  Rs {PaidtotalAmount}</span> </h3>
      <h3 className='text-lg mt-6 font-bold text-red-500'>Remaining Bill Amount: <span className='text-black'>   Rs {calculateRemainingBill(ResourceUsedData, PaidtotalAmount) }</span> </h3>
      <button 
        type='button'
        className='  bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 shadow-lg hover:shadow-2xl shadow-blue-500 hover:bg-blue-700 transition-all duration-300 ease-in-out'
        onClick={handleConfirmPayment}
      >
        Make Payment
      </button>
      {showPaymentForm && (
  <div className=' transition-all duration-300 ease-in-out fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
    <div className='max-h-full overflow-auto flex flex-col items-center justify-center border rounded-lg p-4 bg-white shadow-lg max-w-3xl mx-4'>
      <h3 className='text-xl font-semibold mb-4'>Payment Details</h3>
      <form className='mt-4' onSubmit={handlePaymentSubmit}>
        <div className='flex w-full items-center justify-center  text-center mb-2'>
         <p className='hidden'>{matchingData.selectedPatientId}</p>
        <h3 className='font-bold hidden '>Total amount : <span className='text-green-500'> Rs {calculateTotalBill(ResourceUsedData) }</span> </h3>
        </div>
        <div className='mb-4'>
          <span className='font-semibold text-gray-600'>Payment Option:</span>
          <div className='mt-2'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio text-blue-500'
                value='cash'
                checked={paymentOption === 'cash'}
                onChange={handlePaymentOptionChange}
                required
              />
              <span className='ml-2'>Cash</span>
            </label>
            <label className='inline-flex items-center ml-4'>
              <input
                type='radio'
                className='form-radio text-blue-500'
                value='online'
                checked={paymentOption === 'online'}
                onChange={handlePaymentOptionChange}
                required
              />
              <span className='ml-2'>Online</span>
            </label>
          </div>
        </div>
        {paymentOption === 'online' && (
          <div className='mb-4'>
            <label className='font-semibold text-black'>Online Payment Details:</label>
            <input
              type='text'
              className='form-input mt-2 border border-solid border-black ml-2 p-1 rounded-md'
              value={onlinePaymentDetails}
              onChange={handleOnlinePaymentDetailsChange}
              placeholder='Enter Transaction ID'
              required
            />
          </div>
        )}
        <div className='mb-4'>
        
          <span className='font-semibold text-gray-600'>Payment Type:</span>
          <div className='mt-2'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio text-blue-500'
                value='full'
                checked={paymentType === 'full'}
                onChange={handlePaymentTypeChange}
                required
              />
              <span className='ml-2'>Full Payment</span>
            </label>
            <label className='inline-flex items-center ml-4'>
              <input
                type='radio'
                className='form-radio text-blue-500'
                value='partial'
                checked={paymentType === 'partial'}
                onChange={handlePaymentTypeChange}
                required
              />
              <span className='ml-2'>Partial Payment</span>
            </label>
          </div>
        </div>
        <div className='mb-4'>
          <span className='font-semibold text-gray-600'>Amount:</span>
          <input
            type='number'
            className='form-input mt-2 border border-solid border-black ml-2 p-1 rounded-md'
            value={amount}
            onChange={handleAmountChange}
            placeholder='Enter amount'
            required
          />
        </div>
        <div className='flex justify-between'>
          <button onClick={handleCloseconfirmPayment} className='bg-red-500 text-white py-2 px-4 rounded-lg mt-6'>close</button>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-lg mt-6'
            onClick={handlePaymentSubmitForm}
          >
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  </div>
)}
      
      
      
      
      
      

            <div
              className='flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg'
              onClick={showPatientDetail}
            >
              <div className='h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center'>
                <img src={allpatientlogo} alt='' className='h-20 w-20' />
              </div>
              <h3 className='text-xl font-semibold'>Patient Details</h3>
            </div>
            <div
              className='flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg'
            >
              <div className='h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center'  onClick={() => setShowForm(true)}>
                <img src={allpatientlogo} alt='' className='h-20 w-20' />
              </div>
              <h3 className='text-xl font-semibold'>Appointment</h3>
            </div>
          </div>
        </section>
      </div>

      {showForm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-md shadow-lg transition-opacity duration-500'>
            <h2 className='text-xl font-semibold mb-4'>Book Appointment</h2>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label className='mb-4'>
                <span className='text-lg'>Patient Name:</span>
                <input
                  className='border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-500 ml-3'
                  type='text'
                  name='patientName'
                  value={formData.patientName}
                  onChange={handleInputChange}
                />
              </label>
              <label className='mb-4'>
                <span className='text-lg'>Health Issue:</span>
                <input
                  className='border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-500 ml-3'
                  type='text'
                  name='healthStatus'
                  value={formData.healthStatus}
                  onChange={handleInputChange}
                />
              </label>
            
            
            
            
            
            
              <label className='mb-4'>
  <span className='text-lg'>Doctor Name:</span>
  <select
    className='border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-500 ml-3'
    name='doctorName'
    value={formData.doctorName}
    onChange={handleInputChange}
  >
    <option value=''>Select a doctor</option>
    {EmployeeData.map((employee) => {
      if (employee.Designation === 'Doctor') {
        return (
          <option key={employee.id} value={`${employee.name},${employee.id}`}>
            {employee.name}
          </option>
        );
      }
      return null;
    })}
  </select>
</label>

              <label className='mb-4'>
                <span className='text-lg'>Date:</span>
                <input
                  className='border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-500 ml-3'
                  type='date'
                  name='date'
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </label>
              <label className='mb-4'>
                <span className='text-lg'>Time:</span>
                <input
                  className='border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-500 ml-3'
                  type='time'
                  name='time'
                  value={formData.time}
                  onChange={handleInputChange}
                />
              </label>
              <div className='flex justify-end mt-4'>
                <button
                  type='submit'
                  className='px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 hover:shadow-xl rounded-xl'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type='button'
                  className='px-4 py-2 ml-2 text-gray-600 hover:bg-red-600 hover:text-white rounded-xl shadow-2xl'
                  onClick={() => setShowForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAdmitForm && (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='bg-white p-8 rounded-md shadow-lg transition-opacity duration-500'>
      <h2 className='text-xl font-semibold mb-4'>Admit Patient</h2>
      <form className='flex flex-col'>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-16'>Name:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='text'
            name='name'
            value={patientData.name}
            onChange={handleFormChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-16'>Age:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='text'
            name='age'
            value={patientData.age}
            onChange={handleFormChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-16'>Gender:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='text'
            name='gender'
            value={patientData.gender}
            onChange={handleFormChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32'>Identification:</label>
          <select
            name='identification'
            value={patientData.identification}
            onChange={handleFormChange}
            className='border border-black px-2 py-1 rounded'
          >
            <option value=''>Select Identification</option>
            <option value='Adhar Card'>Adhar Card</option>
            <option value='Passport'>Passport</option>
            <option value='PAN'>PAN</option>
          </select>
        </div>
        {patientData.identification && (
          <div className='mb-4 flex items-center'>
            <label className='mr-4 w-32'>{patientData.identification}:</label>
            <input
              className='border border-black px-2 py-1 rounded'
              type='text'
              name={patientData.identification.toLowerCase()}
              value={patientData[patientData.identification.toLowerCase()]}
              onChange={handleFormChange}
            />
          </div>
        )}
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32'>Contact Number:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='text'
            name='contactNumber'
            value={patientData.contactNumber}
            onChange={handleFormChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32'>Relative Contact:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='text'
            name='RelativeNumber'
            value={patientData.RelativeNumber}
            onChange={handleFormChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32'>Reason:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='text'
            name='reason'
            value={patientData.reason}
            onChange={handleFormChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32'>Ward:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='text'
            name='ward'
            value={patientData.ward}
            onChange={handleFormChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32'>Date:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='date'
            name='date'
            value={patientData.date}
            onChange={handleFormChange}
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label className='mr-4 w-32'>Time:</label>
          <input
            className='border border-black px-2 py-1 rounded'
            type='time'
            name='time'
            value={patientData.time}
            onChange={handleFormChange}
          />
        </div>
        <div className='flex justify-end mt-4'>
          <button
            type='button'
            className='mr-2 px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-800 hover:shadow-xl'
            onClick={submitAdmitForm}
          >
            Submit
          </button>
          <button
            type='button'
            className='px-4 py-2 text-gray-600 hover:text-gray-800'
            onClick={closeAdmitForm}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
  

      )}
      {showPatientDetails && (
        <div className='mx-10 my-5 p-5 bg-white rounded-xl shadow-4xl'>
          <h2 className='text-2xl font-semibold mb-4'>Patient Details</h2>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>Age</th>
                <th className='py-2 px-4 border-b'>Gender</th>
                <th className='py-2 px-4 border-b'>Identification</th>
                <th className='py-2 px-4 border-b'>Id Number</th>
                <th className='py-2 px-4 border-b'>Contact Number</th>
                <th className='py-2 px-4 border-b'>Reason</th>
                <th className='py-2 px-4 border-b'>Ward</th>
              </tr>
            </thead>
            <tbody className=''>
              {inpatientdata.map((patient, index) => (
                <tr key={index}>
                  <td className='text-center py-2 px-4 border-b'>{patient.name}</td>
                  <td className='text-center py-2 px-4 border-b'>{patient.age}</td>
                  <td className='text-center py-2 px-4 border-b'>{patient.gender}</td>
                  <td className='text-center py-2 px-4 border-b'>{patient.identification}</td>
                  <td className='text-center py-2 px-4 border-b'>{ patient['adhar card']|| patient.pan ||patient.passport}</td>
                  <td className='text-center py-2 px-4 border-b'>{patient.contactNumber}</td>
                  <td className='text-center py-2 px-4 border-b'>{patient.reason}</td>
                  <td className='text-center py-2 px-4 border-b'>{patient.ward}</td>
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
            className='mt-4 px-4 py-2 bg-blue-800 text-white font-bold hover:text-white hover:bg-gray-600 rounded-xl shadow-2xl'
            onClick={hidePatientDetails}
          >
            Close
          </button>
        </div>
      )}
      {/* {selectedPatient && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-md shadow-lg transition-opacity duration-500'>
            <h2 className='text-xl font-semibold mb-4'>Patient Details</h2>
            <p>Name: {selectedPatient.name}</p>
            <p>Age: {selectedPatient.age}</p>
            <p>Gender: {selectedPatient.gender}</p>
            <p>Identification: {selectedPatient.identification}</p>
            <p>Contact Number: {selectedPatient.contactNumber}</p>
            <p>Reason: {selectedPatient.reason}</p>
            <p>Ward: {selectedPatient.ward}</p>
            <button
              className='mt-4 px-4 py-2 text-gray-600 hover:text-gray-800'
              onClick={hidePatientDetails}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Reception;

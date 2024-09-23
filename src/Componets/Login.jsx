import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Recptionlogo from "../assets/profilepic/recpeiton.jpg";
import Employeelogo from "../assets/profilepic/employee.jpg";
import Doctorlogo from "../assets/profilepic/doctor.jpg";
import Adminlogo from "../assets/profilepic/admin.jpg";
import { MdClose } from "react-icons/md";
import data from '../data/logindata.json'
// import Reception from '../Pages/Reception's

const Login = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [id , setid] =useState();
  const [password , setpassword] = useState();
  const [loginas , setloginas] = useState("");
  // const [loggedInId, setLoggedInId] = useState("");



  const handleidchange = (e) => {
    const updatedId = e.target.value;
    setid(updatedId);
    console.log(updatedId);
  };
  
  const handlepasswordchange = (e) => {
    const updatedPassword = e.target.value;
    setpassword(updatedPassword);
    console.log(updatedPassword);
  };

 
   
  

  const handleOptionClick = (route) => {
    console.log("this is route"+ route);
    setloginas(route);
    console.log("this is loginas" + loginas);
    setShowForm(true);
      // navigate(route);
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
  
    const loginData = data[loginas]; // Get the login data for the selected role
  
    if (loginData) {
      // Find the user with matching id and password
      const user = loginData.find((userData) => {
        return userData.id === id && userData.password === password;
      });
  
      if (user) {
        console.log("Login successful");
        alert("Login successful");
  
        // Send the id to the backend endpoint
        const endpoint = "http://localhost:8080/login";
        const requestData = { loginas: loginas , id: id };
  
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
             console.log(response)
          })
          .catch((error) => {
            console.log(error)
          });
  
        // Handle successful login, e.g., navigate to the appropriate page
        navigate(loginas);
      } else {
        alert("Invalid credentials");
        // Handle invalid login, e.g., show an error message
      }
    } else {
      alert("Invalid login role");
      // Handle invalid login role, e.g., show an error message
    }
  };
  
  

  const handleCloseForm = () => {
    setShowForm(false);
    setid();
    setpassword();
    navigate("/");
  };

  return (
    <div style={{backgroundColor:"#E6E2DD"}} className="mt-16 pb-20 rounded-2xl mx-10">
      <header className="text-center">
        <h2 className="logintxt text-4xl font-semibold flex w-full items-center justify-center pt-10">
          Login As
        </h2>
      </header>

      <section className="mt-10 mx-auto max-w-screen-lg ">
        <div className="grid grid-cols-4 gap-6 grid-flow-row">
          <div
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
           value={loginas} onClick={() => handleOptionClick("/Reception")}
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={Recptionlogo} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Reception</h3>
          </div>

          <div
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
            onClick={() => handleOptionClick("/Employee")}
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={Employeelogo} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Employee</h3>
          </div>

          <div
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
            onClick={() => handleOptionClick("/Doctor")}
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={Doctorlogo} alt="" className="h-20 w-20" />
            </div>
            <h3 className="text-xl font-semibold">Doctor</h3>
          </div>

          <div
            className="flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg"
            onClick={() => handleOptionClick("/Admin")}
          >
            <div className="h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center">
              <img src={Adminlogo} alt="" className="h-14 w-14" />
            </div>
            <h3 className="text-xl font-semibold">Admin</h3>
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseForm}
            >
              <MdClose size={24} />
            </button>
            <h3 className="text-2xl font-semibold mb-4">Login</h3>
            <form>
              <input className="mr-2 border border-black p-2" type="text" placeholder="id"   value={id} onChange={handleidchange} />
              <input className="border border-black p-2" type="" placeholder="password" value={password} onChange={handlepasswordchange} />
              <button type="submit" className=" ml-2 btn btn-primary rounded-md p-2 text-white font-medium bg-blue-600 hover:bg-blue-800 hover:text-white" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const PDFDocument = require('pdfkit');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const LOGIN_DETAILS_JSON_PATH = './login.json';
const INPATIENT_DETAILS_JOSN_PATH = './inpatient.json';
const EMPLOYE_DETAILS_JSON_PATH = './employedata.json';
const INVENTORY_DETAILS_JSON_PATH = './inventory.json';
const PATIENT_REPORT_RECORD_JSON_PATH= './patientReport.json';
const RESOURSE_USED_RECORD_JSON_PATH = './ResourceUsed.json'
const APPOINTMENT_RECORD_JSON_PATH = './AppointmentData.json'
const SYSTEM_ACCESS_JSON_PATH = './SystemAccess.json'
const REMOVE_EMPLOYEE_DATA_JSON_PATH = './RemoveEmployeeRequests.json'
const UPDATE_EMPLOYEE_DATA_JSON_PATH = './UpdateEmployeeRequests.json'
// const EMPLOYE_DETAILS_JSON_PATH = './employedata.json';
const REPORT_DOWNLAOD = './reportDownalod.json'
const PAYMENT_DETAILS_JSON_PATH = './payment.json'



app.post("/login", (req, res) => {
  const { loginas, id } = req.body;

  // Process the received id as needed
  // You can perform database queries or any other operations here

  // Read the existing login data from login.json
  let loginData = [];
  try {
    const existingData = fs.readFileSync(LOGIN_DETAILS_JSON_PATH, "utf-8");
    loginData = JSON.parse(existingData);
    if (!Array.isArray(loginData)) {
      loginData = []; // Create an empty array if existing data is not a valid array
    }
  } catch (err) {
    console.error("Error reading login.json:", err);
    return res.status(500).json({ error: "Internal server error" });
  }

  // Append the new data to the existing login data
  loginData.push({ loginas, id });

  // Write the updated login data to login.json
  fs.writeFile(LOGIN_DETAILS_JSON_PATH, JSON.stringify(loginData), (err) => {
    if (err) {
      console.error("Error writing to login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Send a response back to the client
    res.json({ message: "Login ID received and saved successfully" });
  });
});


app.post("/logout", (req, res) => {
  const updatedLoginData = req.body;

  // Write the updated login data to login.json
  fs.writeFile(LOGIN_DETAILS_JSON_PATH, JSON.stringify(updatedLoginData), (err) => {
    if (err) {
      console.error("Error writing to login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Send a response back to the client
    res.json({ message: "Logout data received and saved successfully" });
  });
});


///Recepiton///////
app.post("/admit", (req, res) => {
  const newLoginData = req.body;

  // Read the existing login data from login.json
  fs.readFile(INPATIENT_DETAILS_JOSN_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingLoginData = [];
    if (data.length > 0) {
      existingLoginData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingLoginData)) {
      existingLoginData = [];
    }

    // Append the new data to the existing login data array
    existingLoginData.push(newLoginData);

    // Write the updated login data back to login.json
    fs.writeFile(INPATIENT_DETAILS_JOSN_PATH, JSON.stringify(existingLoginData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "ADMIT patient data received and saved successfully" });
    });
  });
});

////Employee///////
app.post("/addEmployee", (req, res) => {
  const newEmployeeData = req.body;

  // Read the existing login data from login.json
  fs.readFile(EMPLOYE_DETAILS_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingEmployeeData = [];
    if (data.length > 0) {
      existingEmployeeData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingEmployeeData)) {
      existingEmployeeData = [];
    }

    // Append the new data to the existing login data array
    existingEmployeeData.push(newEmployeeData);

    // Write the updated login data back to login.json
    fs.writeFile(EMPLOYE_DETAILS_JSON_PATH, JSON.stringify(existingEmployeeData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "Employee data received and saved successfully" });
    });
  });
});



//////////////////inventory///////////////////////////

app.post("/inventory", (req, res) => {
  const newinventoryData = req.body;

  // Read the existing login data from login.json
  fs.readFile(INVENTORY_DETAILS_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existinginventoryData = [];
    if (data.length > 0) {
      existinginventoryData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existinginventoryData)) {
      existinginventoryData = [];
    }

    // Append the new data to the existing login data array
    existinginventoryData.push(newinventoryData);

    // Write the updated login data back to login.json
    fs.writeFile(INVENTORY_DETAILS_JSON_PATH, JSON.stringify(existinginventoryData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "inventory data received and saved successfully" });
    });
  });
});

////////////////////////////////////////////////

/////patient Reports/////////////////////
app.post("/PatientReports", (req, res) => {
  const newPatientReportData = req.body;

  // Read the existing login data from login.json
  fs.readFile(PATIENT_REPORT_RECORD_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingPatientReportData = [];
    if (data.length > 0) {
      existingPatientReportData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingPatientReportData)) {
      existingPatientReportData = [];
    }

    // Append the new data to the existing login data array
    existingPatientReportData.push(newPatientReportData);

    // Write the updated login data back to login.json
    fs.writeFile(PATIENT_REPORT_RECORD_JSON_PATH, JSON.stringify(existingPatientReportData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "inventory data received and saved successfully" });
    });
  });
});

//////////////////////////////////////////////////////////


///Resourse Used data ///////////////////////

app.post("/ResourseUsed", (req, res) => {
  const newResouseUsedData = req.body;

  // Read the existing login data from login.json
  fs.readFile(RESOURSE_USED_RECORD_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingResourseUsedData = [];
    if (data.length > 0) {
      existingResourseUsedData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingResourseUsedData)) {
      existingResourseUsedData = [];
    }

    // Append the new data to the existing login data array
    existingResourseUsedData.push(newResouseUsedData);

    // Write the updated login data back to login.json
    fs.writeFile(RESOURSE_USED_RECORD_JSON_PATH, JSON.stringify(existingResourseUsedData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "Resourse used data received and saved successfully" });
    });
  });
});



////////////////////////

app.post("/Appointment", (req, res) => {
  const newAppointmentData = req.body;

  // Read the existing login data from login.json
  fs.readFile(APPOINTMENT_RECORD_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingAppointmentData = [];
    if (data.length > 0) {
      existingAppointmentData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingAppointmentData)) {
      existingAppointmentData = [];
    }

    // Append the new data to the existing login data array
    existingAppointmentData.push(newAppointmentData);

    // Write the updated login data back to login.json
    fs.writeFile(APPOINTMENT_RECORD_JSON_PATH, JSON.stringify(existingAppointmentData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "Resourse used data received and saved successfully" });
    });
  });
});


///Admin - Staff Delete//////////

app.delete('/api/staff/:id', (req, res) => {
  const id = req.params.id;

  // Read the contents of the employedata.json file
  fs.readFile(EMPLOYE_DETAILS_JSON_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading employedata.json', err);
      return res.sendStatus(500); // Internal Server Error
    }

    let staffData = JSON.parse(data);

    // Find the staff object with the given ID
    const staffIndex = staffData.findIndex((staff) => staff.id === id);

    if (staffIndex !== -1) {
      // Delete the staff object from the array
      staffData.splice(staffIndex, 1);

      // Write the updated data back to the employedata.json file
      fs.writeFile(
        EMPLOYE_DETAILS_JSON_PATH,
        JSON.stringify(staffData),
        (err) => {
          if (err) {
            console.error('Error writing employedata.json', err);
            return res.sendStatus(500); // Internal Server Error
          }

          res.sendStatus(200); // Successful deletion
        }
      );
    } else {
      res.sendStatus(404); // Staff data not found
    }
  });
});


///////////////////////
////System Access ///////////////////


app.post("/SystemAccess", (req, res) => {
  const newSystemAccessData = req.body;

  // Read the existing login data from login.json
  fs.readFile(SYSTEM_ACCESS_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingSystemAccessData = [];
    if (data.length > 0) {
      existingSystemAccessData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingSystemAccessData)) {
      existingSystemAccessData = [];
    }

    // Append the new data to the existing login data array
    existingSystemAccessData.push(newSystemAccessData);

    // Write the updated login data back to login.json
    fs.writeFile(SYSTEM_ACCESS_JSON_PATH, JSON.stringify(existingSystemAccessData), (err) => {
      if (err) {
        console.error("Error writing to SystemAccess.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "systemAccess data received and saved successfully" });
    });
  });
});



//////////////////////////

/////Remove Employee Requests//////
app.post("/removeEmployee", (req, res) => {
  const newRemoveEmployeeRequestData = req.body;

  // Read the existing login data from login.json
  fs.readFile(REMOVE_EMPLOYEE_DATA_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingRemoveEmployeeRequestData = [];
    if (data.length > 0) {
      existingRemoveEmployeeRequestData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingRemoveEmployeeRequestData)) {
      existingRemoveEmployeeRequestData = [];
    }

    // Append the new data to the existing login data array
    existingRemoveEmployeeRequestData.push(newRemoveEmployeeRequestData);

    // Write the updated login data back to login.json
    fs.writeFile(REMOVE_EMPLOYEE_DATA_JSON_PATH, JSON.stringify(existingRemoveEmployeeRequestData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "Removed Employee data received and saved successfully" });
    });
  });
});
////////


////Update Requests ///////

app.post("/UpdateEmployee", (req, res) => {
  const newUpdateEmployeeRequestData = req.body;

  // Read the existing login data from login.json
  fs.readFile(UPDATE_EMPLOYEE_DATA_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingUpdateEmployeeRequestData = [];
    if (data.length > 0) {
      existingUpdateEmployeeRequestData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingUpdateEmployeeRequestData)) {
      existingUpdateEmployeeRequestData = [];
    }

    // Append the new data to the existing login data array
    existingUpdateEmployeeRequestData.push(newUpdateEmployeeRequestData);

    // Write the updated login data back to login.json
    fs.writeFile(UPDATE_EMPLOYEE_DATA_JSON_PATH, JSON.stringify(existingUpdateEmployeeRequestData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "Update Employee data received and saved successfully" });
    });
  });
});


///////////////
app.delete('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  // Read the employee data from the JSON file
  fs.readFile(EMPLOYE_DETAILS_JSON_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading employee data file', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      // Parse the JSON data
      const employees = JSON.parse(data);

      // Find the index of the employee with the matching ID
      const employeeIndex = employees.findIndex(employee => employee.id === employeeId);

      if (employeeIndex === -1) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Remove the employee data from the array
      const removedEmployee = employees.splice(employeeIndex, 1)[0];

      // Write the updated employee data back to the JSON file
      fs.writeFile(EMPLOYE_DETAILS_JSON_PATH, JSON.stringify(employees), err => {
        if (err) {
          console.error('Error writing employee data file', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Read the other file data
        fs.readFile(REMOVE_EMPLOYEE_DATA_JSON_PATH, 'utf8', (err, otherData) => {
          if (err) {
            console.error('Error reading other file', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          try {
            // Parse the other file data
            const otherFileData = JSON.parse(otherData);

            // Remove the matching ID value from the other file
            const updatedOtherFileData = otherFileData.filter(item => item.id !== employeeId);

            // Write the updated data back to the other file
            fs.writeFile(REMOVE_EMPLOYEE_DATA_JSON_PATH, JSON.stringify(updatedOtherFileData), err => {
              if (err) {
                console.error('Error writing other file', err);
                return res.status(500).json({ error: 'Internal Server Error' });
              }

              // Return a success response
              res.json({ success: true, removedEmployee });
            });
          } catch (error) {
            console.error('Error parsing other file data', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
        });
      });
    } catch (error) {
      console.error('Error parsing employee data', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

///////////////////////////////sytem access remove////////////////

app.post('/removeAccess', (req, res) => {
  const { id } = req.body;

  // Read the contents of SystemAccess.json
  fs.readFile('SystemAccess.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    let systemAccessData;
    try {
      systemAccessData = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).json({ error: 'Server error' });
    }

    // Find the matching object and remove it from the array
    const updatedAccessData = systemAccessData.filter(access => access.id !== id);

    // Write the updated JSON data back to SystemAccess.json
    fs.writeFile('SystemAccess.json', JSON.stringify(updatedAccessData), 'utf8', err => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.status(200).json({ message: 'Access removed successfully' });
    });
  });
});



////////report donwlaod ////

app.post('/DownloadReport', (req, res) => {
  const data = req.body;

  // Save the data to a JSON file
  const filePath = path.join(__dirname, 'REPORT_DOWNLOAD.json');
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'Failed to save data' });
    } else {
      console.log('Data saved successfully');

      // Generate PDF
      const pdfFilePath = path.join(__dirname, 'REPORT_DOWNLOAD.pdf');
      const pdfDoc = new PDFDocument();

      // Set PDF document options
      pdfDoc.fontSize(12);
      pdfDoc.font('Helvetica-Bold');

      // Add heading
      pdfDoc.text('Report Data:', { underline: true, align: 'center' });
      pdfDoc.moveDown();

      // Add formatted data
      pdfDoc.font('Helvetica');
      pdfDoc.text(JSON.stringify(data, null, 2));

      // Save the PDF file
      pdfDoc.pipe(fs.createWriteStream(pdfFilePath));
      pdfDoc.end();

      // Send the PDF file as a download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=REPORT_DOWNLOAD.pdf');
      fs.createReadStream(pdfFilePath).pipe(res);
    }
  });
});



//PAYTMENT DETAILS /////
app.post("/PaymentDetails", (req, res) => {
  const newPaymentData = req.body;

  // Read the existing login data from login.json
  fs.readFile(PAYMENT_DETAILS_JSON_PATH, (err, data) => {
    if (err) {
      console.error("Error reading login.json:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let existingPaymentData = [];
    if (data.length > 0) {
      existingPaymentData = JSON.parse(data);
    }

    // Ensure existingLoginData is an array
    if (!Array.isArray(existingPaymentData)) {
      existingPaymentData = [];
    }

    // Append the new data to the existing login data array
    existingPaymentData.push(newPaymentData);

    // Write the updated login data back to login.json
    fs.writeFile(PAYMENT_DETAILS_JSON_PATH, JSON.stringify(existingPaymentData), (err) => {
      if (err) {
        console.error("Error writing to login.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send a response back to the client
      res.json({ message: "Payment received and saved successfully" });
    });
  });
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

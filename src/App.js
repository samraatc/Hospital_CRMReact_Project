
import Homepage from './Pages/Homepage';
import './App.css';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import Reception from './Pages/Reception';
import Employee from './Pages/Employee'
import Doctor from './Pages/Doctor'
import Admin from './Pages/Admin'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/Reception' element={<Reception/>}></Route>
        <Route path='/Employee' element={<Employee/>}></Route>
        <Route path='/Doctor' element={<Doctor/>}></Route>
        <Route path='/Admin' element={<Admin/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

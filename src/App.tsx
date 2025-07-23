import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import UserPage from './pages/UserPage/UserPage';
import ServicePage from './pages/ServicePage/ServicePage';
import EmployeePage from './pages/EmployeePage/EmployeePage';
import MyServicePage from './pages/MyServicePage/MyServicePage';
import ServiceTimePage from './pages/ServiceTimePage/ServiceTimePage';
import ServiceDetailsPage from './pages/ServiceDetailsPage/ServiceDetailsPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path="/home" element={<Auth><HomePage/></Auth>} />
        <Route path="/profile" element={<Auth><UserPage/></Auth>} />
        <Route path="create-service" element={<Auth><ServicePage/></Auth>} />
        <Route path="/create-employee" element={<Auth><EmployeePage/></Auth>} />
        <Route path="/my-services" element={<Auth><MyServicePage/></Auth>} />
        <Route path={"/service-time/:id"} element={<Auth><ServiceTimePage/></Auth>} />
        <Route path="/service/:id" element={<Auth><ServiceDetailsPage/></Auth>} />
      </Routes>
    </>
  )
}

export default App;

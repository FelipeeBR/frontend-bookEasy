import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import UserPage from './pages/UserPage/UserPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path="/home" element={<Auth><HomePage/></Auth>} />
        <Route path="/profile" element={<Auth><UserPage/></Auth>} />
      </Routes>
    </>
  )
}

export default App;

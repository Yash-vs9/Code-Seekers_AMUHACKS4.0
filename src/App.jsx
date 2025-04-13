import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Health from './components/Health';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import ChatBot from './components/ChatBot';
import NearbyHospitals from './components/NearbyHospitals';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protect /test route */}
        <Route path="/test" element={
          <ProtectedRoute>
            <Health />
          </ProtectedRoute>
        } />

        {/* Register usually shouldn't be protected */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/bot" element={<ChatBot />} />
        <Route path="/loc" element={<NearbyHospitals />} />
      </Routes>
    </Router>
    <ToastContainer /> 
    </div>
  );
}

export default App;
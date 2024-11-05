import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './components/Register';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navegación */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
            
            </h1>
          
          </div>
        </header>
        <nav></nav>
        <main className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

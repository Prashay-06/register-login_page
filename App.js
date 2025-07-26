import {Details} from './project1.js';
import {Login} from './login.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './dashboard.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          < Route path="/" element={<Details/>} />
          < Route path="/login" element={<Login/>} />
          < Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

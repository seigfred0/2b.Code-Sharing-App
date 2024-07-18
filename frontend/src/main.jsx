import React from 'react';
import ReactDOM from 'react-dom/client';
import '../public/index.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:uniqueId" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Getdata from './component/admin/Getdata';
import Postdata from './component/admin/Postdata';
import Category from './component/admin/Category';
import Demo from './component/admin/demo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/getdata" element={<Getdata />} />
        <Route path="/postdata" element={<Postdata />} />
        <Route path="/category" element={<Category/>} />
        <Route path="/demo" element={<Demo/>} />
      </Routes>
    </Router>
  );
}

export default App;

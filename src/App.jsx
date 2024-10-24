
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Getdata from './component/admin/Getdata';
import Category from './component/admin/Category';
import Demo from './component/admin/demo';
import Product from './component/admin/Product';
import VariantForm from './component/admin/VariantForm';
import ProductsList from './component/admin/ProductsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/getdata" element={<Getdata />} />
        <Route path="/postdata" element={<Product/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/varients" element={<VariantForm/>} />
        <Route path="/prodictlist" element={<ProductsList/>} />
        <Route path="/demo" element={<Demo/>} />
      </Routes>
    </Router>
  );
}

export default App;

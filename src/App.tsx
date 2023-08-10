import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import DetailProduct from './pages/DetailProduct';
import AddProduct from './pages/AddProduct';
import ListProduct from './pages/ListProduct';
import UpdateProduct from './pages/UpdateProduct';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/products'
          element={<ProductPage />}
        />
        <Route
          path='/detail/:id'
          element={<DetailProduct />}
        />
        <Route
          path='/admin/add-product'
          element={<AddProduct />}
        />
        <Route
          path='/admin/update-product/:id'
          element={<UpdateProduct />}
        />
        <Route
          path='/admin/products'
          element={<ListProduct />}
        />
      </Routes>
    </Router>
  );
}

export default App;

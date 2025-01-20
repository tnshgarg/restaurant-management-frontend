import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderStatus from './pages/OrderStatus';
import RestaurantProvider from './components/RestaurantProvider';

// console.log("Your secret key:", process.env.REACT_APP_SECRET_KEY); 


function App() {
  return (
    <BrowserRouter>
      <RestaurantProvider>
        <Layout>
          <Routes>
            <Route path="/:tableId" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/status" element={<OrderStatus />} />
          </Routes>
        </Layout>
      </RestaurantProvider>
    </BrowserRouter>
  );
}

export default App;
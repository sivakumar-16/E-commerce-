import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Product from "./components/Product";
import Order from "./components/Order";
import Register from "./components/Register";
import Login from "./components/Login";
import OrdersListPage from "./components/Orders";
import CreateProduct from "./components/AddProduct";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/addproduct" element={<CreateProduct />} />

          <Route path="/order" element={<Order />} />
          <Route path="/orders" element={<OrdersListPage />} />

        </Routes>
        
      </BrowserRouter>
    </>
  );
}
export default App;

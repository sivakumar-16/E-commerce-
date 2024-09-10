import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Login from "./components/Login";

// function App() {

//   return (
//     <>
//      <HomePage></HomePage>

//     </>
//   )
// }
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}
export default App;

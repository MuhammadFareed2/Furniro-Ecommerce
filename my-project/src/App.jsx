import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Shop from "./pages/Shop"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import CheckOut from "./pages/CheckOut"

function App() {

  return (
    <>
      <BrowserRouter>
          <Navbar />
        <Routes>

      
          
          <Route path="/" element={<Home /> }/>
          <Route path="/signup" element={<Signup /> }/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path='/shop/:key' element={<ProductDetail />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App

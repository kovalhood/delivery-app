import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import Wrapper from "./Wrapper";
import ShopsPage from '../pages/ShopsPage';
import CartPage from "../pages/CartPage";
import ShopMenu from './ShopMenu/ShopMenu';

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route element={<Wrapper/>}>
          <Route path="/" element={<ShopsPage />} />
          <Route path='/:shopId' element={<ShopMenu />}></Route>
          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <ToastContainer autoClose={3000} theme="colored" transition={Slide}/>
    </>
  );
}

export default App;

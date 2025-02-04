import { Children, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Categories from "./pages/categories";
import { Outlet, Routes, useNavigate } from "react-router";
import { Route } from "react-router";
import SideBar from "./components/Sidebar";
import Header from "./components/Header";
import Product from "./pages/Products";
import CreateProduct from "./components/products/CreateProduct";
import EditeProduct from "./components/products/EditeProduct";
import Business from "./pages/Business";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "./redux/slices/menuSlice";
import Login from "./pages/Login";
import HeaderHome from "./components/landing-page/HeaderHome";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import { fetchRestuarant } from "./redux/slices/restuarantSlice";
import { fetchCategories } from "./redux/slices/categoriesSlice";
import { fetchProfile } from "./redux/slices/profileSlice";
import { Navigate } from "react-router-dom";
import Menu from "./pages/Menu";
import logo from "./assets/logo-v3.png"
import animate from "./assets/aniamte.svg"
import Otp from "./pages/Otp";
import Whatssap from "./components/Whatssap";

const ProtectedRoute = ({ children }) => {
  
  const profile = useSelector((state) => state.profile);
 
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  } else if (profile.isInfoAvailable === false) {
    return <Navigate to="/onboarding" replace />;
  }else if (profile.isInfoAvailable === false) {
    return <Navigate to="/verify-email" replace />;
  } 
  return children;
};

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const [openMenu , setOpenMenu] = useState(false)
  

  useEffect(() => {
    // Fetch data when DashboardLayout is loaded
    dispatch(fetchMenu());
    dispatch(fetchRestuarant());
    dispatch(fetchCategories());
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="grid md:grid-cols-[250px_auto]">
      
        <SideBar setOpenMenu={setOpenMenu} openMenu={openMenu}/>
      
      <div className="px-5">
        <Header setOpenMenu={setOpenMenu} openMenu={openMenu} />
        <Outlet />
      </div>
    </div>
  );
};

const HomeLayout = () => (
  <>
    <HeaderHome />
    <Outlet />
  </>
);

function App() {

  const profile = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // تعيين حالة التحميل إلى true
      await Promise.all([
        dispatch(fetchMenu()),
        dispatch(fetchRestuarant()),
        dispatch(fetchCategories()),
        dispatch(fetchProfile()),
      ]);
      setLoading(false); // تعيين حالة التحميل إلى false بعد الانتهاء
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="reltive">
          <img
            src={animate}
            className="absolute top-[50%] w-[120px] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />
          <img src={logo} className="w-[60px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </div>
    )
  }

  return (
    <>
    <Whatssap />
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/verify-email" element={<Otp />} />
        <Route path="/" element={<Home />} />
      </Route>

      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Menu />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Product />} />
        <Route path="products/create-product" element={<CreateProduct />} />
        <Route path="products/edit/:productID" element={<EditeProduct />} />
        <Route path="business" element={<Business />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;

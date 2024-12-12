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

const ProtectedRoute = ({ children }) => {
  // const dispatch = useDispatch();
  // dispatch(fetchProfile());
  const profile = useSelector((state) => state.profile);
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  } else if (profile.isInfoAvailable === false) {
    return <Navigate to="/onboarding" replace />;
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
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchMenu());
  //   dispatch(fetchRestuarant());
  //   dispatch(fetchCategories());
  //   dispatch(fetchProfile());
  // }, []);
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
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
  );
}

export default App;

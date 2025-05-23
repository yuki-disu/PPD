import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import themeConfig from "./ui/ThemeConfig";
import { ConfigProvider } from "antd";
import {
  Announcement,
  Dsh,
  EditProf,
  Moderators,
  NavBar,
  OfferMang,
  Params,
  PubMang,
  ResetPass,
  Users,
} from "./components";
import Error from "./components/Error/Error";
import {
  AllHouses,
  Cart,
  Checkout,
  Deals,
  HomeLayout,
  Landing,
  Login,
  SingleHouse,
  ForgotPassword,
  Dash,
  AdminDash,
  Rent,
} from "./pages";
import Register from "./pages/Register";
import UsersTable from "./components/admin/adminComponents/UsersTable";
import { Toaster } from "react-hot-toast";
function App() {
  const location = useLocation();
  const hideNav = ["/login", "/register", "/forgotpassword"];
  const shouldHideNav =
    hideNav.includes(location.pathname) ||
    location.pathname.startsWith("/admindash");
  return (
    <ConfigProvider theme={themeConfig}>
      <Toaster position="right-bottom" /> {!shouldHideNav && <NavBar />}
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Landing />} />
          <Route path="allhouses" element={<AllHouses />} />
          <Route path="allhouses/:id" element={<SingleHouse />} />
          <Route path="allhouses/:id/rent" element={<Rent />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<Cart />} />
          <Route path="deals" element={<Deals />} />
          <Route path="/dashboard" element={<Dash />}>
            <Route path="editProfile" element={<EditProf />} />
            <Route path="resetPassword" element={<ResetPass />} />
          </Route>
          <Route path="/admindash" element={<AdminDash />}>
            <Route path="dsh" element={<Dsh />} />
            <Route path="announces" element={<Announcement />} />
            <Route path="users" element={<Users />} />

            <Route path="moderators" element={<Moderators />} />
            <Route path="params" element={<Params />} />
            <Route path="pubmang" element={<PubMang />} />
            <Route path="offermang" element={<OfferMang />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;

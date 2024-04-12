// imports
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Headphones from "./pages/Headphones/Headphones";
import HeadphoneProduct from "./pages/Headphones/HeadphoneProduct";
import Speakers from "./pages/Speakers/Speakers";
import SpeakerProduct from "./pages/Speakers/SpeakerProduct";
import Earphones from "./pages/Earphones/Earphones";
import EarphoneProduct from "./pages/Earphones/EarphoneProduct";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RequireAuthen from "./components/RequireAuthen";
import PersistLogin from "./components/PersistLogin";
import NotFound from "./components/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Dashboard/Orders";
import Create from "./pages/Dashboard/Create";

// styles
import "./App.css";
import RequireAdmin from "./components/RequireAdmin";
import Edit from "./pages/Dashboard/Edit";
import Update from "./pages/Dashboard/Update";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PersistLogin />}>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="headphones">
          <Route index element={<Headphones />} />
          <Route path=":id" element={<HeadphoneProduct />} />
        </Route>

        <Route path="speakers">
          <Route index element={<Speakers />} />
          <Route path=":id" element={<SpeakerProduct />} />
        </Route>

        <Route path="earphones">
          <Route index element={<Earphones />} />
          <Route path=":id" element={<EarphoneProduct />} />
        </Route>

        <Route element={<RequireAuthen />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Orders />} />
            <Route element={<RequireAdmin />}>
              <Route path="create" element={<Create />} />
              <Route path="edit">
                <Route index element={<Edit />} />
                <Route path=":id" element={<Update />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import DetailsPage from "../src/pages/DetailsPage";
import Check from "./components/Check";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
function App() {
    return (
        <>
            <ToastContainer position="bottom-center" theme="dark" />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/sign-up" element={<SignUp />} />

                    <Route path="/details" element={<Check />}>
                        <Route path="/details" element={<DetailsPage />} />
                    </Route>
                    <Route path={`/edit`} element={<Check />}>
                        <Route path="/edit/:id" element={<EditListing />} />
                    </Route>
                    <Route path="/category/:type/:id" element={<Listing />}></Route>
                    <Route path="/category/:type" element={<Category />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import PlaceDetail from "./pages/PlaceDetail";
import FindPlaces from "./pages/FindPlaces";
import CarRentals from "./pages/CarRentals";
import BookTours from "./pages/BookTours";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./contexts/SearchContext";
import Confirmation from "./pages/Confirmation";
import { Dashboard } from "./pages/Dashboard";
import CarDetail from "./pages/CarDetail";
import ReservationWrapper from "./components/ReservationWrapper";
import TourDetail from "./pages/TourDetail";
import { ReservationProvider } from "./contexts/ReservationContext";
import BecomeAHost from "./pages/BecomeAHost";
import ListInfo from "./pages/ListInfo";
import { HostRegister } from "./pages/HostRegister";
import Manage from "./pages/Manage";
import ThankYou from "./pages/ThankYou";
import BookingDetails from "./pages/BookingDetail";
import Bookings from "./pages/Bookings";
import BlockedProperties from "./pages/BlockedProperties";
import ListingBookings from "./pages/ListingBookings";
import { ResetPassword } from "./pages/ResetPassword";
import TokenVerification from "./pages/TokenVerification";
import { loadIntercom } from "./utils/intercom";

const renderWithLayout = (Component) => (
  <Layout>
    <Component />
  </Layout>
);

const renderPrivateRoute = (Component) => (
  <PrivateRoute>{renderWithLayout(Component)}</PrivateRoute>
);

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadIntercom(user);
  }, [user]);

  return (
    <AuthProvider>
      <SearchProvider>
        <ReservationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/register-host" element={<HostRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/token-verification"
                element={<TokenVerification />}
              />
              <Route path="/" element={renderWithLayout(Home)} />
              <Route
                path="/places/:id"
                element={renderWithLayout(PlaceDetail)}
              />
              <Route path="/cars/:id" element={renderWithLayout(CarDetail)} />
              <Route path="/tours/:id" element={renderWithLayout(TourDetail)} />
              <Route path="/places" element={renderWithLayout(FindPlaces)} />
              <Route path="/cars" element={renderWithLayout(CarRentals)} />
              <Route path="/tours" element={renderWithLayout(BookTours)} />
              <Route
                path="/become-a-host"
                element={renderWithLayout(BecomeAHost)}
              />
              <Route path="/list/:type" element={renderWithLayout(ListInfo)} />

              {/* Private Routes */}
              <Route
                path="/reservation/:type/:id"
                element={renderPrivateRoute(ReservationWrapper)}
              />
              <Route
                path="/confirmation"
                element={renderPrivateRoute(Confirmation)}
              />
              <Route path="/thank-you" element={renderPrivateRoute(ThankYou)} />
              <Route
                path="/dashboard"
                element={renderPrivateRoute(Dashboard)}
              />
              <Route path="/manage" element={renderPrivateRoute(Manage)} />
              <Route
                path="/booking-details/:id"
                element={renderPrivateRoute(BookingDetails)}
              />
              <Route path="/bookings" element={renderPrivateRoute(Bookings)} />
              <Route
                path="/blocked-properties"
                element={renderPrivateRoute(BlockedProperties)}
              />
              <Route
                path="/listing-bookings"
                element={renderPrivateRoute(ListingBookings)}
              />
              {/* Redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <ToastContainer />
          </Router>
        </ReservationProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;

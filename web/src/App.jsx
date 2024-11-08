import React from "react";
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
import Reservation from "./pages/Reservation";
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

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <ReservationProvider>
          <Router>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/register-host" element={<HostRegister />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/places/:id"
                element={
                  <Layout>
                    <PlaceDetail />
                  </Layout>
                }
              />
              <Route
                path="/cars/:id"
                element={
                  <Layout>
                    <CarDetail />
                  </Layout>
                }
              />
              <Route
                path="/tours/:id"
                element={
                  <Layout>
                    <TourDetail />
                  </Layout>
                }
              />
              <Route
                path="/places"
                element={
                  <Layout>
                    <FindPlaces />
                  </Layout>
                }
              />
              <Route
                path="/cars"
                element={
                  <Layout>
                    <CarRentals />
                  </Layout>
                }
              />
              <Route
                path="/tours"
                element={
                  <Layout>
                    <BookTours />
                  </Layout>
                }
              />
              <Route
                path="/become-a-host"
                element={
                  <Layout>
                    <BecomeAHost />
                  </Layout>
                }
              />
              <Route
                path="/list/:type"
                element={
                  <Layout>
                    <ListInfo />
                  </Layout>
                }
              />
              <Route
                path="/reservation/:type/:id"
                element={
                  <PrivateRoute>
                    <Layout>
                      <ReservationWrapper />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/confirmation"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Confirmation />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Manage />
                    </Layout>
                  </PrivateRoute>
                }
              />
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

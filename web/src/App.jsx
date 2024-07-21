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
// import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/place/:id"
              element={
                <Layout>
                  <PlaceDetail />
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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/protected-route-2"
              element={
                <PrivateRoute>
                  <Layout>
                    <BookTours />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <ToastContainer />
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;

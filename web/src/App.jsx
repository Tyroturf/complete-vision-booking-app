import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
// import Register from "./pages/Register";
// import SignIn from "./pages/SignIn";
// import AddHotel from "./pages/AddHotel";
// import { useAppContext } from "./contexts/AppContext";
// import MyHotels from "./pages/MyHotels";
// import EditHotel from "./pages/EditHotel";
// import Search from "./pages/Search";
// import Detail from "./pages/Detail";
// import Booking from "./pages/Booking";
// import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import PlaceDetail from "./pages/PlaceDetail";
import "leaflet/dist/leaflet.css";
import FindPlaces from "./pages/FindPlaces";
import CarRentals from "./pages/CarRentals";

const App = () => {
  // const { isLoggedIn } = useAppContext();
  return (
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
          path="/search"
          element={
            <Layout>
              <SearchResults />
            </Layout>
          }
        />
        <Route
          path="/hotel/"
          element={
            <Layout>
              <PlaceDetail />
            </Layout>
          }
        />
        <Route
          path="/places/"
          element={
            <Layout>
              <FindPlaces />
            </Layout>
          }
        />
        <Route
          path="/cars/"
          element={
            <Layout>
              <CarRentals />
            </Layout>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />

            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )} */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

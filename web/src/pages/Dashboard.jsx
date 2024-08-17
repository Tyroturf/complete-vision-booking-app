import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import hero from "../assets/g.jpg";
import "../styles.css";

const Home = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [bookingSources, setBookingSources] = useState([]);

  useEffect(() => {
    setTotalBookings(1200);
    setMonthlyBookings([
      { month: "Jan", bookings: 100 },
      { month: "Feb", bookings: 150 },
      { month: "Mar", bookings: 200 },
    ]);
    setBookingSources([
      { name: "Direct", value: 400 },
      { name: "Referral", value: 300 },
      { name: "Social Media", value: 500 },
    ]);
  }, []);

  return (
    <div className="p-4 text-gray-600">
      <h2 className="text:lg md:text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text:sm md:text-lg font-semibold my-2">
            Total Bookings
          </h3>
          <div className="md:mt-24">
            <p className="text-3xl font-bold">{totalBookings}</p>
            <p className="text-sm text-gray-600">
              As of {new Date().toDateString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text:sm md:text-lg font-semibold my-2">
            Monthly Bookings
          </h3>
          <ResponsiveContainer width="80%" height={200}>
            <LineChart data={monthlyBookings}>
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text:sm md:text-lg font-semibold my-2">
            Booking Sources
          </h3>
          <ResponsiveContainer width="80%" height={200}>
            <PieChart>
              <Pie
                data={bookingSources}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {bookingSources.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#8884d8", "#82ca9d", "#ffc658"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Card component to display booking details
const BookingCard = ({ booking }) => (
  <div className="bg-white shadow-md p-4 rounded-md mb-4 flex justify-between items-center">
    <div>
      <img
        src={hero}
        alt={"booking"}
        className="w-32 h-24 object-cover rounded-lg"
      />
    </div>

    <div className="text-xs text-gray-600">
      <h4 className="text-sm font-semibold">{booking.title}</h4>
      <p className="text-gray-600">Date: {booking.date}</p>
      <p className="text-gray-600">Location: {booking.location}</p>
      <p className="text-gray-600">Amount: ${booking.amount}</p>
    </div>

    <button className="bg-brand-3xl rounded-sm hover:scale-105 transition text-xs text-white px-8 py-3 font-bold">
      View
    </button>
  </div>
);

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("Past Stays");

  const bookingsData = {
    "Past Stays": [
      {
        title: "Stay in New York",
        date: "2024-01-10",
        location: "New York, NY",
        amount: 200,
        status: "Completed",
      },
      {
        title: "Stay in Paris",
        date: "2024-02-15",
        location: "Paris, France",
        amount: 300,
        status: "Cancelled",
      },
    ],
    Rentals: [
      {
        title: "Car Rental in LA",
        date: "2024-03-12",
        location: "Los Angeles, CA",
        amount: 150,
        status: "Completed",
      },
      {
        title: "Car Rental in Tokyo",
        date: "2024-04-18",
        location: "Tokyo, Japan",
        amount: 250,
        status: "Cancelled",
      },
    ],
    Tours: [
      {
        title: "Tour of Rome",
        date: "2024-05-10",
        location: "Rome, Italy",
        amount: 100,
        status: "Completed",
      },
      {
        title: "Tour of London",
        date: "2024-06-22",
        location: "London, UK",
        amount: 120,
        status: "Cancelled",
      },
    ],
  };

  const bookings = bookingsData[activeTab];

  return (
    <div>
      <Navbar
        setActiveSection={setActiveTab}
        activeSection={activeTab}
        sections={["Past Stays", "Rentals", "Tours"]}
      />
      <div className="p-4">
        {bookings.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const Account = () => <div>Edit account information...</div>;
const Payment = () => <div>Manage payment information...</div>;

const Navbar = ({
  setActiveSection,
  activeSection,
  sections = ["home", "bookings", "account", "payment"],
}) => {
  return (
    <div className="flex justify-around items-center p-4 mt-4 relative">
      {sections.map((section, index) => (
        <React.Fragment key={section}>
          <button
            onClick={() => setActiveSection(section)}
            className={`text-xs md:text-sm nav-button text-gray-600 ${
              activeSection === section ? "nav-button-active" : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
          {index < sections.length - 1 && (
            <span className="h-2 md:h-5 border-l border-gray-300"></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "bookings":
        return <Bookings />;
      case "account":
        return <Account />;
      case "payment":
        return <Payment />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col">
      <ProfileHero imageUrl={hero} />
      <Navbar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <div className="relative overflow-hidden">{renderSection()}</div>
    </div>
  );
};

const ProfileHero = ({ imageUrl }) => (
  <>
    <img
      src={imageUrl}
      alt="profileHero"
      className="relative bg-cover bg-bottom lg:h-80 md:h-64 h-48 mt-8 md:mt-12 rounded-sm object-cover"
    />
    <div className="text-center -mt-12 z-0">
      <img
        src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
        alt=""
        className="w-20 h-20 m-auto rounded-full object-cover md:w-28 md:h-28 border-4 border-brand hover:scale-110 transition"
      />
      <h5 className="mt-4 md:text-xl text-xs font-semibold text-gray-600">
        Cynthia J. Watts
      </h5>
      <span className="text-xs text-gray-400 lg:block">Admin</span>
    </div>
  </>
);

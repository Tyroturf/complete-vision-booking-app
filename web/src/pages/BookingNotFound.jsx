import { useNavigate } from "react-router-dom";

export default function BookingNotFound({ page }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-40 px-4 text-center">
      <h1 className="text-xl md:text-3xl font-semibold text-brand">
        Booking Not Found
      </h1>
      <p className="mt-4 text-gray-600 text-sm">
        We couldn't find the booking you're looking for. Kindly visit the past
        bookings page.
      </p>
      <button
        className="mt-6 px-6 py-3 bg-brand text-white rounded-lg shadow-md hover:bg-brand-4xl transition duration-300 text-xs md:text-sm"
        onClick={() => navigate(`/bookings?type=${page.toLowerCase()}`)}
      >
        Past Bookings
      </button>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function ListingNotFound({ page }) {
  const navigate = useNavigate();

  const getRoute = (page) => {
    switch (page.toLowerCase()) {
      case "place":
        return "/places";
      case "car":
        return "/cars";
      case "tour":
        return "/tours";
      default:
        return "/";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-40 md:mt-80 px-4 text-center">
      <h1 className="text-xl md:text-3xl font-semibold text-brand">
        Listing Not Found
      </h1>
      <p className="mt-4 text-gray-600 text-sm">
        We couldn't find the listing you're looking for. Please browse other
        listings.
      </p>
      <button
        className="mt-6 px-6 py-3 font-bold bg-brand text-white rounded-lg shadow-md hover:bg-brand-4xl transition duration-300 text-xs md:text-sm"
        onClick={() => navigate(getRoute(page))}
      >
        Go to {page}s
      </button>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form values:", values);
    navigate("/");
  };

  return (
    <Formik
      initialValues={{
        destination: "",
        checkIn: "",
        checkOut: "",
        adultCount: "",
        childCount: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className="mt-6 p-3 rounded-xl bg-slate-100 border border-brand shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 mx-10 align-middle">
          {/* Destination Input */}
          <div className="flex flex-row items-center flex-1 bg-white p-2">
            <FontAwesomeIcon icon={faHotel} className="mr-2 text-slate-500" />
            <Field
              type="text"
              name="destination"
              placeholder="Where are you going?"
              className="md:text-md text-xs w-full focus:outline-none "
            />
          </div>

          {/* Adult and Child Count Inputs */}
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex md:text-md text-xs">
              Guests:
            </label>
            <Field
              type="number"
              name="guests"
              className="w-full p-1 focus:outline-none font-bold"
              min={1}
              max={6}
            />
          </div>

          {/* Check-in Date Input */}
          <div className="md:text-md text-xs">
            <label className="block font-medium text-gray-700">
              Check-in Date
            </label>
            <Field
              type="date"
              name="checkIn"
              className="min-w-full bg-white p-2 focus:outline-none"
            />
          </div>

          {/* Check-out Date Input */}
          <div className="md:text-md text-xs">
            <label className="block md:text-md text-xs font-medium text-gray-700">
              Check-out Date
            </label>
            <Field
              type="date"
              name="checkOut"
              className="min-w-full bg-white p-2 focus:outline-none "
            />
          </div>

          {/* Search */}
          <button
            type="submit"
            className="bg-brand text-white p-2 font-bold text-sm hover:bg-orange-100 rounded-lg"
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;

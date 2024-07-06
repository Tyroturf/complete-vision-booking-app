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
        <Form className="mt-2 p-3 md:-mt-10 md:z-0 rounded-xl bg-slate-100 border border-brand shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 mx-10 align-middle">
          {/* Destination Input */}
          <div className="md:text-md text-xs">
            <label className="block text-slate-500 font-bold mb-1">
              Location
            </label>
            <Field
              type="text"
              name="destination"
              placeholder="Where are you going to?"
              className="w-full bg-white p-2 focus:outline-none text-slate-500 rounded-lg"
            />
          </div>

          <div className="md:text-md text-xs">
            <label className="block text-slate-500 font-bold mb-1">
              Guests
            </label>
            <Field
              type="number"
              name="guests"
              placeholder="Guests"
              className="w-full bg-white p-2 focus:outline-none text-slate-500 rounded-lg"
              min={1}
              max={6}
            />
          </div>

          {/* Check-in Date Input */}
          <div className="md:text-md text-xs">
            <label className="block text-slate-500 font-bold mb-1">
              Check-in Date
            </label>
            <Field
              type="date"
              name="checkIn"
              className="min-w-full bg-white p-2 focus:outline-none  text-slate-500 rounded-lg"
            />
          </div>

          {/* Check-out Date Input */}
          <div className="md:text-md text-xs">
            <label className="block md:text-md text-xs text-slate-500 font-bold mb-1">
              Check-out Date
            </label>
            <Field
              type="date"
              name="checkOut"
              className="min-w-full bg-white p-2 focus:outline-none  text-slate-500 rounded-lg"
            />
          </div>

          {/* Search */}
          <button
            type="submit"
            className="bg-brand text-white p-2 mt-4 text-sm hover:bg-[#f2b23d] rounded-lg font-bold transition"
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;

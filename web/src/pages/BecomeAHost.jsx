import { Link } from "react-router-dom";

import suv from "../assets/suv.png";
import ab from "../assets/ab.png";
import build from "../assets/build.jpg";

const BecomeAHost = () => {
  const list = [
    {
      id: 1,
      name: "List Property",
      image: build,
      location: "property",
      hostType: "L",
    },
    {
      id: 3,
      name: "List Vehicle",
      image: suv,
      location: "vehicle",
      hostType: "V",
    },
    {
      id: 4,
      name: "List Tour / Experience",
      image: ab,
      location: "tour",
      hostType: "T",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 md:my-40 my-20">
      {list.map((item) => (
        <Link
          to={`/list/${item.location}?hostType=${item.hostType}`}
          key={item.id}
          className="w-80 p-4 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-96 object-cover rounded-md"
          />
          <h3 className="mt-4 text-lg font-semibold text-center text-gray-800">
            {item.name}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default BecomeAHost;

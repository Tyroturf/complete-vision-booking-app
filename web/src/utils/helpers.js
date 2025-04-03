export const formatDate = (date, includeTime = false) => {
  if (!date) return "";

  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const year = date.getFullYear();

  let formattedDate = `${month}/${day}/${year}`;

  if (includeTime) {
    let hours = date.getHours();
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

    formattedDate += ` ${hours}:${minutes} ${ampm}`;
  }

  return formattedDate;
};

export const formatWithCommas = (number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const timeDiff = Math.abs(end - start);
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

export const calculateDays = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
};

export const getInitialValues = (hostType, initialValues, isEditMode) => {
  const defaultValues = {
    listName: initialValues?.ListName || "",
    location: initialValues?.Location || "",
    city: initialValues?.City || "",
    guests: initialValues?.MaxGuests || "",
    price: initialValues?.Price || "",
    description: initialValues?.Description || "",
    images: isEditMode
      ? [
          initialValues?.images?.[0],
          initialValues?.images?.[1],
          initialValues?.images?.[2],
          initialValues?.images?.[3],
          initialValues?.images?.[4],
        ].filter(Boolean)
      : [],
  };

  switch (hostType) {
    case "V":
      return {
        ...defaultValues,
        carType: initialValues?.CarType || "",
        chauffeurRate: initialValues?.ChauffeurRate || "",
      };

    case "T":
      return {
        ...defaultValues,
        tourPrice: initialValues?.TourPrice || "",
      };

    case "L":
      return {
        ...defaultValues,
        features: initialValues?.Features || "",
        amenities: initialValues?.Amenities || "",
        p_special_date_from:
          initialValues?.SpecialDateFrom === "undefined"
            ? null
            : initialValues?.SpecialDateFrom || "",
        p_special_date_to:
          initialValues?.SpecialDateTo === "undefined"
            ? null
            : initialValues?.SpecialDateTo || "",
        p_special_price:
          initialValues?.SpecialPrice === "undefined"
            ? null
            : initialValues?.SpecialPrice || "",
      };

    default:
      return defaultValues;
  }
};

export const getHeadingText = (host_type) => {
  console.log(host_type);
  switch (host_type) {
    case "V":
      return "Vehicle";
    case "T":
      return "Tour";
    default:
      return "Listings";
  }
};

export const getQueryParams = (queryString) => {
  if (!queryString) {
    return {};
  }

  return queryString
    .slice(1)
    .split("&")
    .reduce((params, param) => {
      const [key, value] = param.split("=");
      if (key) {
        params[key] = decodeURIComponent(value);
      }
      return params;
    }, {});
};

export const getInitials = (first, last) => {
  return `${first.charAt(0)}${last ? last.charAt(0) : ""}`.toUpperCase();
};

export const getColor = (name) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-emerald-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-sky-500",
    "bg-gray-500",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

export const isToday = (dateString) => {
  const bookingDate = new Date(dateString);
  const today = new Date();

  return (
    bookingDate.getFullYear() === today.getFullYear() &&
    bookingDate.getMonth() === today.getMonth() &&
    bookingDate.getDate() === today.getDate()
  );
};

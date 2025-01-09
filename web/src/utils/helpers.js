export const formatDate = (date) => {
    if (!date) return '';
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

export const formatWithCommas = (number) => {
  return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
        p_special_date_from: initialValues?.SpecialDateFrom,
        p_special_date_to: initialValues?.SpecialDateTo,
        p_special_price: initialValues?.SpecialPrice,
      };

    default:
      return defaultValues;
  }
};


export const getHeadingText = (host_type) => {
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
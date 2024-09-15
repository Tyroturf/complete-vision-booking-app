export const formatDate = (date) => {
    if (!date) return '';
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

export const getQueryParams = (queryString) => {
  return queryString
    .slice(1)
    .split("&")
    .reduce((params, param) => {
      const [key, value] = param.split("=");
      params[key] = decodeURIComponent(value);
      return params;
    }, {});
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
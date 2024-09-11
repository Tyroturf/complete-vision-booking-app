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
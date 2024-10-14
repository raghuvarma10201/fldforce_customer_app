// apiUtils.js
const baseUrl = 'https://rpwebapps.us/clients/ewallet/';
// const baseUrl = 'https://rpwebapps.us/clients/fieldforce/';
const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const apiRequest = (path, options) => {
  const url = `${baseUrl}${path}`;
  const token = localStorage.getItem('accessToken');

  if (token) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, options).then(handleResponse);
};

export default apiRequest;

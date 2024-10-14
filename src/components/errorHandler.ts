import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const handleGlobalError = (error: AxiosError) => {
  const {logout} = useAuth();
  if (error.response) {
    // The request was made and the server responded with a status code
    const status = error.response.status;
    switch (status) {
      case 401:
        // Handle 401 Unauthorized error
        console.error('Unauthorized! Redirecting to login page...');
        // Example: redirect to login page
        toast.error('An error occurred: ' + error.response.data);
        logout();
        window.location.href = '/home';
       
        break;
      case 500:
        // Handle 500 Internal Server Error
        toast.error('Internal Server Error!');
        // Display a message or take other appropriate action
        break;
      // Handle other status codes as needed
      default:
        console.error('An error occurred:', error.response.data);
        toast.error('An error occurred: ' + error.response.data);
        // Display a generic error message or take other appropriate action
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
    toast.error('No response received!');
    // Display a message or take other appropriate action
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('Error:', error.message);
    toast.error('Error: ' + error.message);
    // Display a message or take other appropriate action
  }
};

export default handleGlobalError;

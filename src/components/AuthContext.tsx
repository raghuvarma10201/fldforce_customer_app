import React, { createContext, useState, useContext, Context, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import axiosInstance from './ApiInterceptor';
import handleGlobalError from './errorHandler';

const AuthContext = createContext<any>({}); 
// Provide default values for the context
export const AuthProvider: React.FC<any> = ({ children }) => {
  const history = useHistory();
  //const apiUrl = "https://rpwebapps.us/clients/ewallet/";
    const apiUrl: any = import.meta.env.VITE_API_URL//process.env.REACT_APP_API_URL;
     // Check if a token exists in localStorage or any other storage mechanism
     const initialLoggedInState = !!localStorage.getItem('token');
     const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);
    
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');

    const login = async(loginFormValue:any) => {
        console.log("loginFormValue", loginFormValue);
        try {
         
           const response = await axios.post(apiUrl+'api/v1/authenticate', loginFormValue, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json' } });
           console.log('API Response:', response.data);
          localStorage.setItem('token', response.data.data.api_token);
          localStorage.setItem('userData', JSON.stringify(response.data));
          setIsLoggedIn(true);
           return response;
         
        } catch (error) {
            
        }
      };

      const loginWithMobile = async(mobileNumber:any) =>{
        console.log("mobileNumber", mobileNumber);
            try {
              setMobile(mobileNumber);
                const response = await axios.post(apiUrl+'api/v1/generateOTP', mobileNumber, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json' } });
               

                return response;

            } catch (error:any) {
              // console.log("error response", error);
              // setErrorToastMessage('Error!'+ error.message);
              return error;
              
            }
      }
      const getWalletAmount = async()=>{
          try {
            const response = await axiosInstance.post(apiUrl+'api/v1/get-wallet-amount',{}, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json' } });
            console.log("response wallet Amount", response);
            return response;
          } catch (error:any) {
            console.log(error)
            handleGlobalError(error);
          }
      }
      

      const logout = () => {
        const keysToKeep = ['app_name','app_version'];
        const savedValues = keysToKeep.map(key => ({ key, value: localStorage.getItem(key) }));
        localStorage.clear();
        savedValues.forEach(({ key, value }) => {
          if (value !== null) {
            localStorage.setItem(key, value);
          }
        });
        window.location.href = '/home';
      };

      return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, loginWithMobile, mobile, getWalletAmount}}>
            {children}
        </AuthContext.Provider>
      )

}

export const useAuth = () => useContext(AuthContext);
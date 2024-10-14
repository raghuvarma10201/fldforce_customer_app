import axiosInstance from '../components/ApiInterceptor';
const apiUrl: any = import.meta.env.VITE_API_URL;

export const getDashboardOptions = async () => {
    try {
      const requestBody = {};
      const response = await axiosInstance.post(`${apiUrl}api/v1/get-dashboard-counts`,requestBody);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};


export const getContractsList = async (body:any) => {
    try {
    
      const response = await axiosInstance.post(`${apiUrl}api/v1/get-contracts-list`,body);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const getContractDetails = async (body:any) => {
    try {
    
      const response = await axiosInstance.post(`${apiUrl}api/v1/get-contract-details`,body);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};


export const getInvoicesList = async (body:any) => {
  try {
  
    const response = await axiosInstance.post(`${apiUrl}api/v1/get-invoices`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};

export const getReceiptsList = async (body:any) => {
  try {
  
    const response = await axiosInstance.post(`${apiUrl}api/v1/get-receipts`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};



export const getProposalList = async (body:any) => {
    try {
    
      const response = await axiosInstance.post(`${apiUrl}api/v1/get-proposal-list`,body);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const getProposalDetails = async (body:any) => {
    try {
    
      const response = await axiosInstance.post(`${apiUrl}api/v1/get-proposal-details`,body);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const getAreasMaster = async () => {
    try {
    
      const response = await axiosInstance.get(`${apiUrl}api/v1/get-areas`);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const getClienttypesMaster = async () => {
    try {
    
      const response = await axiosInstance.get(`${apiUrl}api/v1/get-clienttypes`);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const getServicesMaster = async () => {
    try {
    
      const response = await axiosInstance.get(`${apiUrl}api/v1/get-services`);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const createTask = async (body:any) => {
  try {
  
    const response = await axiosInstance.post(`${apiUrl}api/v1/create-task`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};

export const customerSignup = async (body:any) => {
  try {
  
    const response = await axiosInstance.post(`${apiUrl}api/v1/customer-signup`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};

export const acceptProposalRequest = async (body:any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}api/v1/accept-proposal-request`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};

export const discountRequest = async (body:any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}api/v1/discount-request`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};

export const rejectProposal = async (body:any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}api/v1/reject-proposal`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};

export const getVisitsList = async (body:any) => {
  try {
  
    const response = await axiosInstance.post(`${apiUrl}api/v1/get-visits-list`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};

export const getVisitExecutionDetails = async (body:any) => {
  try {
  
    const response = await axiosInstance.post(`${apiUrl}api/v1/get-visit-execution-details-v2`,body);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};



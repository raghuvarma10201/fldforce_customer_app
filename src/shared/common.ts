import axiosInstance from '../components/ApiInterceptor';
const apiUrl: any = import.meta.env.VITE_API_URL;


export const getBusinessId = () => {
  const selectedBusiness = localStorage.getItem("selectedBusiness");
  if (!selectedBusiness) {
    console.error("Business data is not available");
    throw new Error("Business Data Not available");
  }
  return (JSON.parse(selectedBusiness)).business_id;
};
export const getCustomerId = () => {
  const selectedBusiness = localStorage.getItem("selectedBusiness");
  if (!selectedBusiness) {
    console.error("Business data is not available");
    throw new Error("Business Data Not available");
  }
  return (JSON.parse(selectedBusiness)).customer_id;
};
export const getCustomerBusiness = async () => {
  try {
    const requestBody = {};
    const response = await axiosInstance.get(`${apiUrl}api/v1/get-customer-business`);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};

export const getDashboardOptions = async () => {
    try {
      const requestBody = {
        business_id : await getBusinessId(),
        customer_id : await getCustomerId()
      };
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
      const requestBody = {
        business_id : await getBusinessId()
      }
      const response = await axiosInstance.post(`${apiUrl}api/v1/get-areas`,requestBody);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const getClienttypesMaster = async () => {
    try {
      const requestBody = {
        business_id : await getBusinessId()
      }
      const response = await axiosInstance.post(`${apiUrl}api/v1/get-clienttypes`,requestBody);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const getServicesMaster = async () => {
    try {
      const requestBody = {
        business_id : await getBusinessId()
      }
      const response = await axiosInstance.post(`${apiUrl}api/v1/get-services`,requestBody);
      console.log(response);
      return response;
    }
    catch(error){
        console.error(error);
    }   
};

export const createTask = async (body:any) => {
  try {
    body.area_type = '';
    body.customer_id = await getCustomerId();
    body.business_id = await getBusinessId();
  
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



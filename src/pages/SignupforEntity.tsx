import React, { useState } from 'react';
import {
    IonButtons,
    IonBackButton,
    IonButton,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    IonList,
    IonSelect,
    IonSelectOption,
  } from "@ionic/react";
import { Formik,Form, Field, ErrorMessage, useFormikContext  } from "formik";
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router';
import axiosInstance from '../components/ApiInterceptor';
import { Camera, CameraDirection, CameraResultType,CameraSource } from '@capacitor/camera';
import useLoading from '../components/useLoading';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';


const SignupforEntity : React.FC = () => {

  const [blobData, setBlobData] = useState<Blob | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const history = useHistory();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const apiUrl: any = import.meta.env.VITE_API_URL;
    // const {entityId} = useParams();
    // const { entityId } = useParams<{ entityId: any }>();
    // console.log(entityId);

    // const { sumParams } : any = useParams();
    // console.log(sumParams);
    


    const userData: any = localStorage.getItem('userData');
    console.log(userData)
    const userInfo = JSON.parse(userData);
    console.log(userInfo);
    const first_name = userInfo.data.first_name;
    const last_name = userInfo.data.last_name;
    const email = userInfo.data.email;
    const mobile = userInfo.data.mobile;

    const initialValues = {
        first_name: first_name,
        last_name: last_name,
        email_id: email,
        mobile_number: mobile,
        customer_identity_number: "",
        customer_identity_proof:"",
        address: "", 
        company_name:"",
        business_activity:"",
        trade_license_no:"",
        authorized_person_name:"",
        company_email:"",
        company_mobile_number:"",
        po_number:"",
        fax_number:"",
        registration_address:""
      }
    
      const validationSchema = Yup.object().shape({
        first_name: Yup.string().matches(/^[a-zA-Z\s]*$/, 'First name must contain only letters and spaces').required("First name  is required"),
        last_name: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Last name must contain only letters and spaces').required("Last name is required"),
        email_id: Yup.string().required("Email is required"),
        mobile_number: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number is not valid').required("Mobile number is required"),
        customer_identity_number: Yup.string().required("Customer id is required"),
        address: Yup.string().required("Address is required"),
        company_name: Yup.string().required("Company name is required"),
        business_activity: Yup.string().required("Business activity is required"),
        trade_license_no: Yup.string().required("Trade license number is required"),
        authorized_person_name: Yup.string().required("Authorized person name is required"),
        company_email: Yup.string().required("Company email is required"),
        company_mobile_number: Yup.string().required("Company mobiule number is required"),
        po_number: Yup.string().required("po number is required"),
        fax_number: Yup.string().required("fax number is required"),
        registration_address: Yup.string().required("Registration address is required")
      });

      const takePicture = async () => {
          console.log("Launching Camera");
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            saveToGallery: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Prompt,
            // direction: CameraDirection.Rear
          });

          console.log(image);
          startUpload(image.webPath)
          // setBlobData(imageUrl);
        }

        const handleFileChange = (files: File | any ) => {
          console.log(files);
          if (files && files.length > 0) {
            const file = files[0];
            console.log(file)
            startUploadFile(file);
          }
        };

        // const startUpload = async(file: any) =>{
        //   try {
        //     const response = await fetch(file);
        //     const contentType = response.headers.get('Content-Type') || '';
        //     console.log(response);
        //     const blob = await response.blob();
        //     console.log(blob);
        //     setBlobData(blob);
        //     // console.log(blobData);
        //     console.log(blob.type);
            
        //     if (blob.type.startsWith("image/")) {
        //     const reader : any = new FileReader();
        //     reader.onload = () => {
        //       const blobData = new Blob([reader.result], { type: blob.type });
        //       setBlobData(blobData);
        //       console.log(blobData);
        //       const url = URL.createObjectURL(blobData);
        //       setImageUrl(url);
        //     };
        //     reader.readAsArrayBuffer(blob);
        //   }else {
        //     const reader : any = new FileReader();
        //     reader.onload = () => {
        //       const blobData = new Blob([reader.result], { type: blob.type });
        //       setBlobData(blobData);
        //       console.log(blobData);
        //     }
        //     reader.readAsArrayBuffer(blob);
        //   }
        //   } catch (error) {
        //     console.error('Error uploading file:', error);
        //   }
        // }
        const startUploadFile = async (file: any) =>{
            setBlobData(file);
            console.log(file);
            console.log(file.type);
              const reader: any = new FileReader();
              reader.onload = () => {
                const blobData = new Blob([reader.result], { type: file.type });
                setBlobData(blobData);
                console.log(blobData);
              };
              reader.readAsArrayBuffer(file);
        }

        const startUpload = async (file: any) => {
          try {
            const response = await fetch(file);
            const blob = await response.blob();
            // setBlobData(file);
            // console.log(file);
            // console.log(file.type);
        
            // if (file.type.startsWith('image/')) {
            //   const reader: any = new FileReader();
            //   reader.onload = () => {
            //     const blobData = new Blob([reader.result], { type: file.type });
            //     setBlobData(blobData);
            //     console.log(blobData);
            //     const url = URL.createObjectURL(blobData);
            //     setImageUrl(url);
            //   };
            //   reader.readAsArrayBuffer(file);
            // } else {
            //   const reader: any = new FileReader();
            //   reader.onload = () => {
            //     const blobData = new Blob([reader.result], { type: file.type });
            //     setBlobData(blobData);
            //     console.log(blobData);
            //   };
            //   reader.readAsArrayBuffer(file);
            // }
            const reader : any = new FileReader();
            reader.onload = () => {
              const blobData = new Blob([reader.result], { type: blob.type });
              setBlobData(blobData);
              console.log(blobData);
              const url = URL.createObjectURL(blobData);
              setImageUrl(url);
            }
            reader.readAsArrayBuffer(blob);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        };

   
      const onSubmit =async(values: any) =>{
        startLoading();
        console.log(values)
        const {address,authorized_person_name,business_activity, company_email,
              company_mobile_number, company_name ,customer_identity_number,
              email_id,fax_number,first_name,last_name,mobile_number,po_number,registration_address,
              trade_license_no    } = values
        const formData = new FormData();
      //   const formFields = {
      //     'first_name': first_name,
      //     'last_name': last_name,
      //     'email_id': email_id,
      //     'mobile_number': mobile_number,
      //     'customer_identity_number': customer_identity_number,
      //     // 'customer_identity_proof': blobData,
      //     'address': address,
      //     'entity': 1,
      //     'company_name': company_name,
      //     'business_activity': business_activity,
      //     'trade_license_no': trade_license_no,
      //     'authorized_person_name': authorized_person_name,
      //     'company_email_id': company_email,
      //     'po_number': po_number,
      //     'company_mobile_number': company_mobile_number,
      //     'fax_number': fax_number,
      //     'registration_address': registration_address
      // };
  
      // for (const [key, value] of Object.entries(formFields)) {
      //     formData.append(key, value);
      // }
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('email_id', email_id);
      formData.append('mobile_number', mobile_number);
      formData.append('customer_identity_number', customer_identity_number);
      formData.append('address', address);
      formData.append('entity', '1');
      formData.append('company_name', company_name);
      formData.append('business_activity', business_activity);
      formData.append('trade_license_no', trade_license_no);
      formData.append('authorized_person_name', authorized_person_name);
      formData.append('company_email_id', company_email);
      formData.append('po_number', po_number);
      formData.append('company_mobile_number', company_mobile_number);
      formData.append('fax_number', fax_number);
      formData.append('registration_address', registration_address);
      if (blobData) {
        formData.append('customer_identity_proof', blobData, 'customer_identity_proof.jpg');
      }
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      try {
        const res = await axiosInstance.post(apiUrl+'api/v1/signup-for-entity', formData,
           {
          headers: {
            'Content-Type': 'multipart/form-data',
          },});
        console.log(res);
        if (res.status === 200 && res.data.success == true) {
          toast.success(res.data.message);
          history.push('/dashboard')
        }
        else{
          toast.error(res.data.message);
        }

      } catch (error) {
        console.error('Error submitting form:', error);
      }
      finally{
        stopLoading();
      }
      }

  return (
    <>
      <IonPage>
        <IonHeader
          translate="yes"
          className="ion-no-border ion-padding-horizontal"
        >
          <IonToolbar>
            <IonButtons slot="start" className="ion-no-padding">
              <IonBackButton></IonBackButton>
            </IonButtons>

            <IonTitle className="ion-float-start">Signup</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="signupWrapp">
          <div className="ion-padding-horizontal">
            <IonText>
              <p>Enter your information</p>
            </IonText>


                 <IonList className="formcustomSty">
                 <Formik 
                    initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={onSubmit}>
                    {({touched, errors})=>(
                  <Form >
                   <IonLabel className="ion-label">First Name</IonLabel>
                   <IonItem lines="none">
                     <Field name="first_name" placeholder='Enter your first name' type='text' className={
                      touched.first_name && errors.first_name ? "custom-form-control is-invalid" : "custom-form-control"
                     } />
                   </IonItem>
                    {touched.first_name && errors.first_name && (
                    <IonText color="danger">
                      <ErrorMessage name="first_name" />
                    </IonText>)}

                    <IonLabel className="ion-label">Last Name</IonLabel>
                   <IonItem lines="none">
                     <Field name="last_name" placeholder='Enter your last name' type='text' className={
                      touched.last_name && errors.last_name ? "custom-form-control is-invalid" : "custom-form-control"
                     } />
                   </IonItem>
                    {touched.last_name && errors.last_name && (
                    <IonText color="danger">
                      <ErrorMessage name="last_name" />
                    </IonText>)}

                  <IonLabel className="ion-label">Email</IonLabel>
                   <IonItem lines="none">
                     <Field name="email_id" placeholder='Enter your Email' type='text' className={
                      touched.email_id && errors.email_id ? "custom-form-control is-invalid" : "custom-form-control"
                     } />
                   </IonItem>
                    {touched.email_id && errors.email_id && (
                    <IonText color="danger">
                      <ErrorMessage name="email_id" />
                    </IonText>)}

                    <IonLabel className="ion-label">Mobile</IonLabel>
                   <IonItem lines="none">
                     <Field name="mobile_number" placeholder='Enter your mobile number' type='text' className={
                      touched.mobile_number && errors.mobile_number ? "custom-form-control is-invalid" : "custom-form-control"
                     } />
                   </IonItem>
                    {touched.mobile_number && errors.mobile_number && (
                    <IonText color="danger">
                      <ErrorMessage name="mobile_number" />
                    </IonText>)}

                    <IonLabel className="ion-label">Customer Identity</IonLabel>
                   <IonItem lines="none">
                     <Field name="customer_identity_number" placeholder='Enter your customer id' type='text' className={
                      touched.customer_identity_number && errors.customer_identity_number ? "custom-form-control is-invalid" : "custom-form-control"
                     } />
                   </IonItem>
                    {touched.customer_identity_number && errors.customer_identity_number && (
                    <IonText color="danger">
                      <ErrorMessage name="customer_identity_number" />
                    </IonText>)}

                    <IonLabel className='ion-label'>Customer Identity Proof</IonLabel>
                    <IonItem>
                        <IonButton onClick={takePicture}>Camera</IonButton> 
                        <span>or</span>
                        {/* <IonButton>Upload File</IonButton> */}
                        <IonItem>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => handleFileChange(e.target.files)}
                          />
                        </IonItem>
                    </IonItem>

                    {imageUrl && (
                      <IonImg src={imageUrl} />
                    )}

                    <IonLabel className="ion-label">Address</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="address"  
                        placeholder='Enter your address' 
                        type='text' 
                        className={
                          touched.address && errors.address ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.address && errors.address && (
                    <IonText color="danger">
                      <ErrorMessage name="address" />
                    </IonText>)}

                    <IonLabel className="ion-label">Company Name</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="company_name"  
                        placeholder='Enter your company name' 
                        type='text' 
                        className={
                          touched.company_name && errors.company_name ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.company_name && errors.company_name && (
                    <IonText color="danger">
                      <ErrorMessage name="company_name" />
                    </IonText>)}

                    <IonLabel className="ion-label">Business Activity</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="business_activity"  
                        placeholder='Enter business activity' 
                        type='text' 
                        className={
                          touched.business_activity && errors.business_activity ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.business_activity && errors.business_activity && (
                    <IonText color="danger">
                      <ErrorMessage name="business_activity" />
                    </IonText>)}

                    <IonLabel className="ion-label">Trade License Number</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="trade_license_no"  
                        placeholder='Enter trade license number' 
                        type='text' 
                        className={
                          touched.trade_license_no && errors.trade_license_no ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.trade_license_no && errors.trade_license_no && (
                    <IonText color="danger">
                      <ErrorMessage name="trade_license_no" />
                    </IonText>)}

                    <IonLabel className="ion-label">Authorized Person Name</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="authorized_person_name"  
                        placeholder='Enter your authorized person name' 
                        type='text' 
                        className={
                          touched.authorized_person_name && errors.authorized_person_name ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.authorized_person_name && errors.authorized_person_name && (
                    <IonText color="danger">
                      <ErrorMessage name="authorized_person_name" />
                    </IonText>)}

                    <IonLabel className="ion-label">Company Email</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="company_email"  
                        placeholder='Enter your company email' 
                        type='text' 
                        className={
                          touched.company_email && errors.company_email ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.company_email && errors.company_email && (
                    <IonText color="danger">
                      <ErrorMessage name="company_email" />
                    </IonText>)}

                    <IonLabel className="ion-label">Company Mobile Number</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="company_mobile_number"  
                        placeholder='Enter your company mobile number' 
                        type='text' 
                        className={
                          touched.company_mobile_number && errors.company_mobile_number ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.company_mobile_number && errors.company_mobile_number && (
                    <IonText color="danger">
                      <ErrorMessage name="company_mobile" />
                    </IonText>)}

                    <IonLabel className="ion-label">PO Number</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="po_number"  
                        placeholder='Enter your po number' 
                        type='text' 
                        className={
                          touched.po_number && errors.po_number ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.po_number && errors.po_number && (
                    <IonText color="danger">
                      <ErrorMessage name="po_number" />
                    </IonText>)}

                    <IonLabel className="ion-label">Fax Number</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="fax_number"  
                        placeholder='Enter your fax number' 
                        type='text' 
                        className={
                          touched.fax_number && errors.fax_number ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.fax_number && errors.fax_number && (
                    <IonText color="danger">
                      <ErrorMessage name="fax_number" />
                    </IonText>)}

                    <IonLabel className="ion-label">Registration Address</IonLabel>
                   <IonItem lines="none">
                     <Field 
                        name="registration_address"  
                        placeholder='Enter your registration address' 
                        type='text' 
                        className={
                          touched.registration_address && errors.registration_address ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.registration_address && errors.registration_address && (
                    <IonText color="danger">
                      <ErrorMessage name="registration_address" />
                    </IonText>)}



                 <IonButton className="primaryBt ion-margin-top" type="submit" expand="block">Signup</IonButton>
               </Form>
              )}
            </Formik>
            </IonList>
          </div>
          {isLoading && (
        <div className="loading-overlay">
          <PuffLoader color="#36d7b7" loading={isLoading} />
          <p className="loading-text">Loading ...</p>
        </div>)}
        </IonContent>
      </IonPage>
    </>
  )
}

export default SignupforEntity

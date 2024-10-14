import React from 'react';
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

const Companyform : React.FC = () => {

    const initialValues = {
        customer_id: "",
        address: "", 
        company_name:"",
        business_activity:"",
        trade_license_no:"",
        authorized_person_name:"",
        company_email:"",
        company_mobile:"",
        po_number:"",
        fax_number:"",
        registration_address:""
      }
    
      const validationSchema = Yup.object().shape({
        customer_id: Yup.string().required("Customer id is required"),
        address: Yup.string().required("Address is required"),
        company_name: Yup.string().required("Company name is required"),
        business_activity: Yup.string().required("Business activity is required"),
        trade_license_no: Yup.string().required("Trade license number is required"),
        authorized_person_name: Yup.string().required("Authorized person name is required"),
        company_email: Yup.string().required("Company email is required"),
        company_mobile: Yup.string().required("Company mobiule number is required"),
        po_number: Yup.string().required("po number is required"),
        fax_number: Yup.string().required("fax number is required"),
        registration_address: Yup.string().required("Registration address is required")
      });

      const onSubmit = async()=>{

      }
  return (
    <div>
              <IonContent className="signupWrapp">
                <div className="ewalletBg ion-padding-horizontal">
                 <IonList className="formcustomSty">
                 <Formik 
                    initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={onSubmit}>
                    {({touched, errors})=>(
                  <Form >
                    <IonLabel className="ion-label">Customer ID</IonLabel>
                   <IonItem lines="none">
                     <Field name="customer_id" placeholder='Enter your customer id' type='text' className={
                      touched.customer_id && errors.customer_id ? "custom-form-control is-invalid" : "custom-form-control"
                     } />
                   </IonItem>
                    {touched.customer_id && errors.customer_id && (
                    <IonText color="danger">
                      <ErrorMessage name="customer_id" />
                    </IonText>)}

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
                        name="company_mobile"  
                        placeholder='Enter your company mobile number' 
                        type='text' 
                        className={
                          touched.company_mobile && errors.company_mobile ? "custom-form-control is-invalid" : "custom-form-control"
                        }
                      />
                   </IonItem>
                    {touched.company_mobile && errors.company_mobile && (
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
        </IonContent>
    </div>
  )
}

export default Companyform

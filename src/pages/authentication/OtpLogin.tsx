import React, { useEffect, useState } from 'react';
import { IonActionSheet, IonButton, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useAuth } from '../../components/AuthContext';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ToastComponent from '../../components/ToastComponent';
import { toast } from 'react-toastify';
import useLoading from '../../components/useLoading';
import { PuffLoader } from 'react-spinners';

const OtpLogin: React.FC = () => {
  const logo = "assets/images/logo-login.svg";
  const { isLoading, startLoading, stopLoading } = useLoading();
    const generatedOtp = localStorage.getItem('otp');
    const deviceId:any = localStorage.getItem('device_token');
    console.log("otp-----", generatedOtp);
    const [otpValue, setOtpValue] = useState('');
    const history = useHistory();
    const app_version: any = localStorage.getItem('app_version');
    const app_name: any = localStorage.getItem('app_name');
    const {mobile, login}= useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMobile, setSelectedMobile]:any=useState('');
  
    const validationSchema = Yup.object().shape({
        otp: Yup.string()
            .min(4,'Otp Value length 4')
          .max(4,'Otp Value length 4')
          .required("Otp is required"),
      });

      const initialValues = {
        otp: "",
      };

      const onSubmit = async (values: any, { setSubmitting }: any) => {
        startLoading();
        try {
        console.log("values", values);
        let payload = {
            mobile:selectedMobile.mobile,
            otp:values.otp,
            device_id:'',
            app_version:app_version, // should be max length of 10
            app_name: app_name   // should be max length of 50, app name: mosquito_control or pest_control
        }
        if(deviceId!==null){
          payload.device_id = deviceId
        }else{
          payload.device_id = 'hd4842'
        }
        console.log("Payload", payload);
          const response =  await login(payload);
          console.log(response)
        
          if(response.data.status==200 && response.data.success == true){
            toast.success(response.data.message);
            history.push("/main-dashboard");
          }else{
            toast.error('Invalid Otp..');
          }
              
        } catch (error:any) {
          // Handle authentication error
        //   setErrorMessage(error.message);
         
        } finally{
          stopLoading();
        }
      };

    const handlerMobileChange = () =>{
        history.push('/Login');
    }

    useEffect(() => {
        console.log("Selected Mobile Number", mobile);
       setSelectedMobile(mobile);
       const otp:any = generatedOtp?.toString()
       setOtpValue(otp)
       setIsOpen(true);
      }, [mobile]);

      const resend = () =>{
        setIsOpen(true);
      }
      

    return (
        <>
            <IonPage>
                <IonContent className="ion-login loginContent">
                <div className="topOverlay">
                <IonImg
            className="loginLogo "
            src={logo}
            alt="logo"
            style={{ height: "100px" }}
          ></IonImg>
                <div className="loginwrapp ion-padding-horizontal bottomOverlay">
                        <IonText className="loginHeading">
                            <h1>Otp Verification </h1>
                            <p>Code is sent to {selectedMobile.mobile}</p>                           
                        </IonText>
                    

             <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form>
                  <IonLabel className="ion-label">Otp</IonLabel>
                 
                  
                    <Field
                      name="otp"
                      placeholder="Enter Otp"
                      type="text"
                      className={
                        touched.otp && errors.otp
                          ? "custom-form-control is-invalid"
                          : "custom-form-control"
                      }
                    />
                
                  {touched.otp && errors.otp && (
                    <IonText color="danger">
                      <ErrorMessage name="otp" />
                    </IonText>
                  )}

                 
                  <IonText className="signupLink">
                               <h6> Don't receive a code?</h6>
                               <IonButton onClick={resend} className="textLink ion-float-strat" fill="clear">Resend!</IonButton>
                            </IonText>
                  <IonButton
                    type="submit"
                    expand="block"
                    className="ion-button primaryBt"
                    disabled={isSubmitting}
                  >
                    Verify and Proceed
                  </IonButton>
                </Form>
              )}
            </Formik>

                        <IonText className="signupLink" >
                        <h6 className="ion-float-strat">Want to change mobile number?</h6> 
                        {/* <IonButton  routerLink="/Login" className="textLink ion-float-strat" fill="clear">Change!</IonButton> */}
                        <IonButton  routerLink="/Login" onClick={()=>handlerMobileChange()} className="textLink ion-float-strat" fill="clear">Change!</IonButton>
                        </IonText>                       
                    </div>

{/* Loader */}
{isLoading && (
      <div className="loading-overlay">
        <PuffLoader color="#36d7b7" loading={isLoading} />
        <p className="loading-text">Loading ...</p>
    </div>
    )}

    </div>
                </IonContent>
                <IonActionSheet
        isOpen={isOpen}
        header="Generated OTP"
        buttons={[
         
         
          {
            text: otpValue,
            role: 'cancel',
            cssClass: 'otp-button',
            
            data: {
              action: 'cancel',
            },
          },
        ]}
        onDidDismiss={() => setIsOpen(false)}
      ></IonActionSheet>
      
            </IonPage>
        </>
    )
}

export default OtpLogin
import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../components/AuthContext";
import { useHistory } from "react-router";
import ToastComponent from "../../components/ToastComponent";
import { toast } from "react-toastify";
import useLoading from "../../components/useLoading";
import { BarLoader, PuffLoader } from "react-spinners";

const LoginWithMobile: React.FC = () => {
  const logo = "assets/images/logo-login.svg";
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoading, startLoading, stopLoading } = useLoading();
  const history = useHistory();
  const { loginWithMobile } = useAuth();
  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[0-9]{9,10}$/, "Mobile number is not valid")
      .required("Mobile number is required"),
  });
  const initialValues = {
    mobile: "",
  };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    startLoading(); // Show loader before API call

    try {
      console.log("values", values);

      const response = await loginWithMobile(values);
      console.log("response------", response);
      if (response.data.status == 200 && response.data.success == true) {

        localStorage.setItem('otp', response.data.data);
        history.push("/otplogin");
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }

    } catch (error: any) {
      toast.error(error.message);

    }
    finally {
      stopLoading(); // Hide loader after API call (success or error)
    }
  };


  return (
    <>
      <IonPage>
        <IonContent className="loginWithMobile loginContent">
          <div className="topOverlay">
            <IonImg
              className="loginLogo "
              src={logo}
              alt="logo"
              style={{ height: "100px" }}
            ></IonImg>

            <div className="loginwrapp ion-padding-horizontal bottomOverlay">
              <IonText className="loginHeading">
                <h1>Login with Mobile</h1>
              </IonText>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form>
                    <IonLabel className="ion-label">Mobile Number</IonLabel>
                    <IonItem lines="none">
                      {/* <IonInput
                    type="number"
                    placeholder="Enter Mobile Number"
                    required
                  /> */}
                      <IonInput
                        type="text"
                        placeholder="Enter Mobile Number"
                        value={'+971'}
                        disabled
                        className="contryCode"
                      />
                      <Field
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        type="text"
                        className={
                          touched.mobile && errors.mobile
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.mobile && errors.mobile && (
                      <IonText color="danger">
                        <ErrorMessage name="mobile" />
                      </IonText>
                    )}

                    {/* <IonButton disabled={isSubmitting}
                  className="ion-button ewalletPrimaryBt"
                  fill="solid"
                  expand="block"                >
                  Continue
                </IonButton> */}
                    <IonButton
                      type="submit"
                      expand="block"
                      className="primaryBt"
                      disabled={isSubmitting}
                    >
                      Submit
                    </IonButton>
                  </Form>
                )}
              </Formik>

              <IonText className="signupLink">
                <h5>Don't have an account?</h5>
                <IonButton
                  routerLink="/Signup"
                  className="textLink ion-float-strat"
                  fill="clear"
                >
                  Sign Up Now !
                </IonButton>
              </IonText>

              <div className="signupBottom">
                <IonText className="OrLogin">Or</IonText>
                <IonButton routerLink="/home" className="textLink ion-text-left ion-no-padding" fill="clear">
                  Back to Home
                </IonButton>
              </div>

            </div>
            {isLoading && (
              <div className="loading-overlay">
                <PuffLoader color="#36d7b7" loading={isLoading} />
                <p className="loading-text">Loading ...</p>
              </div>
            )}
          </div>
        </IonContent>

      </IonPage>
    </>
  );
};

export default LoginWithMobile;

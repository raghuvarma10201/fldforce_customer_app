import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
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
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { customerSignup, getClienttypesMaster } from "../../shared/common";
import useLoading from "../../components/useLoading";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import CommonHeader from "../../components/CommonHeader";

const Signup: React.FC = () => {
  const history = useHistory();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [clientType, setClientType] = useState([]);
  const initialValues = {
    first_name: "",
    last_name: "",
    email_id: "",
    mobile_no: "",
    customer_type: "",
    emirates_id: "",
    trade_licence_number: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "First name must contain only letters and spaces")
      .required("First name is required"),
    last_name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Last name must contain only letters and spaces")
      .required("Last name is required"),
    email_id: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile_no: Yup.string()
      .matches(/^[0-9]{9}$/, "Mobile number is not valid")
      .required("Mobile number is required"),
    customer_type: Yup.string().required("Customer type is required"),
    emirates_id: Yup.string().when("customer_type", {
      is: "1",
      then: () => Yup.string().required("Emirates ID is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    trade_licence_number: Yup.string().when("customer_type", {
      is: "2",
      then: () => Yup.string().required("Trade licence number is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  const onSubmit = async (values: typeof initialValues, { setFieldError }: any) => {
    console.log("Form Submitted", values);
    // Add your form submission logic here
    startLoading();
    try {
      const response:any = await customerSignup(values);
      
      if (response.data.status == 200 && response.data.success) {
       history.push('/loginmobile');
        toast.success(response.data.message);
      }
    }catch (error:any) {
      toast.success(error);
    }finally {
      stopLoading();
  }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse: any = await getClienttypesMaster();
        if (clientResponse.data.status == 200 && clientResponse.data.success) {
          setClientType(clientResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <IonPage>
       <CommonHeader backToPath={"/"} pageTitle={"Signup"} showIcons={false}/>
      {/* <IonHeader translate="yes" className="ion-no-border ionHeader">
        <IonToolbar className="ion-padding-horizontal">
          <IonButtons slot="start" className="ion-no-padding">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-float-start">Signup</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent className="signupWrapp">
        <div className="backGround ion-padding-horizontal loginwrapp">
          <IonText>
            <p>Enter your information</p>
          </IonText>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ touched, errors, values, setFieldValue, setFieldTouched }) => (
              <Form>
                <IonList className="formlist">
                  <div className="width100">
                    <IonLabel className="ion-label">First Name</IonLabel>
                    <IonItem lines="none">
                      <Field
                        name="first_name"
                        placeholder="Enter your first name"
                        type="text"
                        className={
                          touched.first_name && errors.first_name
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.first_name && errors.first_name && (
                      <IonText color="danger" className="errorMessage">
                        <ErrorMessage name="first_name" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Last Name</IonLabel>
                    <IonItem lines="none">
                      <Field
                        name="last_name"
                        placeholder="Enter your last name"
                        type="text"
                        className={
                          touched.last_name && errors.last_name
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.last_name && errors.last_name && (
                      <IonText color="danger" className="errorMessage">
                        <ErrorMessage name="last_name" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Email</IonLabel>
                    <IonItem lines="none">
                      <Field
                        name="email_id"
                        placeholder="Enter email"
                        type="text"
                        className={
                          touched.email_id && errors.email_id
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.email_id && errors.email_id && (
                      <IonText color="danger" className="errorMessage">
                        <ErrorMessage name="email_id" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Mobile</IonLabel>
                    <IonItem lines="none">
                      <Field
                        name="mobile_no"
                        placeholder="Enter mobile"
                        type="text"
                        className={
                          touched.mobile_no && errors.mobile_no
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.mobile_no && errors.mobile_no && (
                      <IonText color="danger" className="errorMessage">
                        <ErrorMessage name="mobile_no" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Customer Type</IonLabel>
                    <IonSelect
                      name="customer_type"
                      placeholder="Select One"
                      onIonChange={(e) => setFieldValue("customer_type", e.detail.value)}
                      onIonBlur={() => setFieldTouched("customer_type", true)}
                    >
                      {clientType.map((option: any) => (
                        <IonSelectOption key={option.id} value={option.id}>
                          {option.client_type}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                    {touched.customer_type && errors.customer_type && (
                      <IonText color="danger">
                        <ErrorMessage name="customer_type" />
                      </IonText>
                    )}
                  </div>
                  {values.customer_type == "1" && (
                    <div className="width100">
                      <IonLabel className="ion-label">Emirates ID</IonLabel>
                      <IonItem lines="none">
                        <Field
                          name="emirates_id"
                          placeholder="Enter Emirates ID"
                          type="text"
                          className={
                            touched.emirates_id && errors.emirates_id
                              ? "custom-form-control is-invalid"
                              : "custom-form-control"
                          }
                        />
                      </IonItem>
                      {touched.emirates_id && errors.emirates_id && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="emirates_id" />
                        </IonText>
                      )}
                    </div>
                  )}
                  {values.customer_type == "2" && (
                    <div className="width100">
                      <IonLabel className="ion-label">Trade Licence Number</IonLabel>
                      <IonItem lines="none">
                        <Field
                          name="trade_licence_number"
                          placeholder="Enter Trade Licence Number"
                          type="text"
                          className={
                            touched.trade_licence_number && errors.trade_licence_number
                              ? "custom-form-control is-invalid"
                              : "custom-form-control"
                          }
                        />
                      </IonItem>
                      {touched.trade_licence_number && errors.trade_licence_number && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="trade_licence_number" />
                        </IonText>
                      )}
                    </div>
                  )}
                </IonList>
                <IonButton type="submit" className="ion-button primaryBt" fill="solid" expand="block">
                  Signup
                </IonButton>
              </Form>
            )}
          </Formik>
          <div className="signupBottom">
            <IonButton fill="clear">
              <IonImg src="assets/images/uaepass-icon.svg" />
              Signup with UAE PASS
            </IonButton>
            <IonText className="ion-text-center">
              <p>Already have an account?</p>
            </IonText>
            <IonButton
              routerLink="/home"
              className="textLink ion-text-center"
              fill="clear"
            >
              Back to Home
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;

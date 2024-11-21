import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useHistory } from "react-router";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonList,
  IonSelect,
  IonSelectOption,
  IonFooter,
  IonInput,
  IonToolbar,
} from "@ionic/react";
import CommonHeader from "../components/CommonHeader";
import { getCurrentLocation } from "../components/locationProvider";
import { createTask, getAreasMaster, getClienttypesMaster, getServicesMaster } from "../shared/common";
import { toast } from "react-toastify";
import useLoading from "../components/useLoading";
const RequestNewTask: React.FC = () => {
  const history = useHistory();
  const localData = localStorage.getItem('userData');
  const parsedData = localData ? JSON.parse(localData) : {};
  const [areaData, setAreaData] = useState([]);
  const [clientType, setClientType] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [userInfo, setUserInfo] = useState(parsedData.data || {});
  const { isLoading, startLoading, stopLoading } = useLoading();
    
  const initialValues = {
    customer_name: `${userInfo.first_name} ${userInfo.last_name}`,
    mobile_no: userInfo.mobile_no,
    email: userInfo.email_id,
    gps:'',
    area: "",
    address: "",
    client_type: "",
    area_type: [],
    service_id: "",
    source: "App",
  };

  const validationSchema = Yup.object().shape({
    customer_name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name must contain only letters and spaces")
      .required("Name is required"),
    mobile_no: Yup.string()
      .matches(/^[0-9]{9,10}$/, "Mobile number is not valid")
      .required("Mobile number is required"),
    email: Yup.string().required("Email is required"),
    area: Yup.string().required("Area is required"),
    address: Yup.string().required("Address is required"),
    client_type: Yup.string().required("Client Type is required"),
    area_type: Yup.array()
    .of(Yup.string())
    .required("Area Type is required"),
    service_id: Yup.string().required("Service Type is required"),
  });

  const onSubmit = async (values: typeof initialValues, { setFieldError }: any) => {
    const position = await getCurrentLocation();
      console.log("position", position);
      console.log("values", values);
      startLoading();
    try {
      values.gps=position?.coords.latitude+','+position?.coords.longitude;
      // Add API call to submit form data here
      console.log("form values", values);
      
      const response:any = await createTask(values);
      if (response.data.status == 200 && response.data.success) {
        history.push('/dashboard');
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }finally {
      stopLoading();
  }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const areaResponse:any = await getAreasMaster();
        if (areaResponse.data.status == 200 && areaResponse.data.success) {
          setAreaData(areaResponse.data.data);
        }
        const clientResponse:any = await getClienttypesMaster();
        if (clientResponse.data.status == 200 && clientResponse.data.success) {
          setClientType(clientResponse.data.data);
        }
        const serviceResponse:any = await getServicesMaster();
        if (serviceResponse.data.status == 200 && serviceResponse.data.success) {
          setServiceType(serviceResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <IonPage>
      <CommonHeader backToPath={"/"} pageTitle={"Request New Task"} showIcons={true} />
      <IonContent className="signupWrapp">
        <div className="backGround ion-padding-horizontal positionRelativeHeight positionFooterPadding">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ touched, errors, setFieldValue, setFieldTouched }) => (
              <Form>
                <IonList className="formlist">
                  <div className="width100">
                    <IonLabel className="ion-label">Name</IonLabel>
                    <IonItem lines="none">
                      <Field
                        name="customer_name"
                        placeholder="Enter your name"
                        type="text"
                        readOnly
                        className={
                          touched.customer_name && errors.customer_name
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.customer_name && errors.customer_name && (
                      <IonText color="danger" className="errorMessage">
                        <ErrorMessage name="customer_name" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Contact Mobile Number</IonLabel>
                    <IonItem lines="none">
                      <IonInput type="text" value="+971" className="custom-form-control contryCode" />
                      <Field
                        name="mobile_no"
                        placeholder="Enter your mobile number"
                        type="text"
                        readOnly
                        className={
                          touched.mobile_no && errors.mobile_no
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.mobile_no && errors.mobile_no && (
                      <IonText color="danger">
                        <ErrorMessage name="mobile_no" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Email</IonLabel>
                    <IonItem lines="none">
                      <Field
                        name="email"
                        placeholder="Enter your Email"
                        type="text"
                        readOnly
                        className={
                          touched.email && errors.email
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.email && errors.email && (
                      <IonText color="danger">
                        <ErrorMessage name="email" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Area</IonLabel>
                    <IonSelect name="area" placeholder="Select One"  onIonChange={(e) => setFieldValue("area", e.detail.value)}
                        onIonBlur={() => setFieldTouched("area", true)}>
                      {areaData.map((option: any) => (
                        <IonSelectOption key={option.id} value={option.id}>
                          {option.area_name_en}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                    {touched.area && errors.area && (
                      <IonText color="danger">
                        <ErrorMessage name="area" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Address</IonLabel>
                    <IonItem lines="none">
                      <Field
                        name="address"
                        placeholder="Enter Address"
                        as="textarea"
                        className={
                          touched.address && errors.address
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                      />
                    </IonItem>
                    {touched.address && errors.address && (
                      <IonText color="danger">
                        <ErrorMessage name="address" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Client Type</IonLabel>
                    <IonSelect name="client_type" placeholder="Select One" onIonChange={(e) => setFieldValue("client_type", e.detail.value)}
                        onIonBlur={() => setFieldTouched("client_type", true)}>
                      {clientType.map((option: any) => (
                        <IonSelectOption key={option.id} value={option.id}>
                          {option.client_type}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                    {touched.client_type && errors.client_type && (
                      <IonText color="danger">
                        <ErrorMessage name="client_type" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Service</IonLabel>
                    <IonSelect name="service_id" placeholder="Select One" onIonChange={(e) => setFieldValue("service_id", e.detail.value)}
                        onIonBlur={() => setFieldTouched("service_id", true)}>
                      {serviceType.map((option: any) => (
                        <IonSelectOption key={option.id} value={option.id}>
                          {option.service_name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                    {touched.service_id && errors.service_id && (
                      <IonText color="danger">
                        <ErrorMessage name="service_id" />
                      </IonText>
                    )}
                  </div>
                  <div className="width100">
                    <IonLabel className="ion-label">Area Type</IonLabel>
                    <IonSelect name="area_type" placeholder="Select One" multiple={true} onIonChange={(e) => setFieldValue("area_type", e.detail.value)}
                        onIonBlur={() => setFieldTouched("area_type", true)}>
                      <IonSelectOption value="Internal">Internal</IonSelectOption>
                      <IonSelectOption value="External">External</IonSelectOption>
                    </IonSelect>
                    {touched.area_type && errors.area_type && (
                      <IonText color="danger">
                        <ErrorMessage name="area_type" />
                      </IonText>
                    )}
                  </div>
                </IonList>
                {/* <IonFooter className="ion-footer ion-footerPosition">
                  <IonToolbar>
                    
                  </IonToolbar>
                </IonFooter> */}

                  <IonFooter className="ion-footer positionFooter">
                      {/* onClick={() => submitRequestIsOpen(true)} */}
                          <IonToolbar>
                          <IonButton type="submit" fill="clear" expand="block">
                            Submit Request
                          </IonButton>
                          </IonToolbar>
                  </IonFooter>

               
              </Form>
            )}
          </Formik>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RequestNewTask;

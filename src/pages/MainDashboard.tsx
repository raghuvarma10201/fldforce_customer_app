import PropTypes from 'prop-types'
import React, { Component, useEffect, useState } from 'react'
import {
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
  IonButtons,
  IonRow,
  IonCol,
  IonCard,
  IonGrid,
  IonIcon,
  IonThumbnail,
  IonList,
  IonFab, IonFabButton,
} from "@ionic/react";

import { add } from 'ionicons/icons';

import { ellipse } from 'ionicons/icons'
import { useAuth } from '../components/AuthContext';
import useLoading from '../components/useLoading';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../components/ApiInterceptor';
import CustomAlert from '../components/CustomAlert';
import { useHistory } from 'react-router';
import { getCustomerBusiness, getDashboardOptions } from '../shared/common';


const MainDashboard: React.FC = () => {
  const history = useHistory();
  const logo = "assets/images/logo-login.svg";
  const apiUrl: any = import.meta.env.VITE_API_URL;
  const [customerBusinessData, setCustomerBusinessData] = useState([]);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');

  const fetchBusinessData = async () => {
    startLoading();
    try {
      const response: any = await getCustomerBusiness();
      console.log("response---------------", response);
      if (response.data.status == 200 && response.data.success) {
        setCustomerBusinessData(response.data.data);
        console.log("customerBusinessData---------------", customerBusinessData);
      }
    } catch (error) {

    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    fetchBusinessData();
  }, [])
  const selectBusiness = (business: any) => {
    const selectedBusiness = {
      business_id: business.business_id,
      customer_id: business.customer_id,
    }
    localStorage.setItem("selectedBusiness",JSON.stringify(selectedBusiness));
    history.push('/dashboard');
  };
  return (
    <>
      <IonPage>
        <IonContent fullscreen className="loginContent mainDashboard">
          <div className="topOverlay">
            <div className="loginwrappion-padding-horizontal bottomOverlay">
              <IonItem lines="none" className="headerBts mdLogo">
                <IonImg className="loginLogo" src={logo} alt="logo" style={{ height: "100px" }}></IonImg>
                <IonButton shape="round" routerLink="/Profile"><IonImg src="assets/images/user-icon.svg" /></IonButton>
              </IonItem>

              <IonText><h2>Opt for your preferred service</h2></IonText>

              <IonRow>
              {customerBusinessData.length > 0 ? (
                  customerBusinessData.map((item: any, index: any) => (
                    <IonCol size="4" className={`clCardColor-${index + 1}`}  onClick={() => selectBusiness(item)}>
                      <IonThumbnail className="thumbnailIcon">
                        <IonImg src={apiUrl + item.logo}></IonImg>
                      </IonThumbnail>
                      <IonCard >
                        <IonText>{item.business_name}</IonText>
                      </IonCard>
                    </IonCol>
                  ))
                ) : ''}

              </IonRow>
            </div>
          </div>

        </IonContent>
      </IonPage>
    </>
  );
};

export default MainDashboard
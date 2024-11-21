import PropTypes from 'prop-types'
import React, { Component, useEffect, useState } from 'react'
import {
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
  IonButtons,
  IonRow,
  IonCol,
  IonCard,
  IonSearchbar,
  IonIcon,
  IonThumbnail,
  IonList,
  IonFab, IonFabButton,
  IonBackButton,
} from "@ionic/react";

import { add,home } from 'ionicons/icons';

import { ellipse } from 'ionicons/icons'
import { useAuth } from '../components/AuthContext';
import useLoading from '../components/useLoading';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../components/ApiInterceptor';
import CustomAlert from '../components/CustomAlert';
import { useHistory } from 'react-router';
import { getDashboardOptions } from '../shared/common';


const Dashboard: React.FC = () => {
  const apiUrl: any = import.meta.env.VITE_API_URL;
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [dashboardData, setDashboardData] = useState([]);
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');
  const fetchDashboardData = async () => {
    startLoading();
    try {
      const response: any = await getDashboardOptions();
      console.log("response---------------", response);
      if (response.data.status == 200 && response.data.success) {
        setDashboardData(response.data.data);
        console.log("dashboardData---------------", dashboardData);
      }

    } catch (error) {

    } finally {
      stopLoading();
    }
  }
  useEffect(() => {
    fetchDashboardData();
  }, [])
  

  return (
    <>
      <IonPage>
        <IonContent className="dashbaordWrapp">
          <div className="backGround topInnerBg">
            <div className="homeHeader">
            <IonItem lines="none" className="dashboardHeader no-ion-color-item">
              <IonImg className="IonPsdLogo" slot="start" src="assets/images/logo-sm-white.svg"></IonImg>

              <div className="ion-float-end headerBts" slot="end">
                <div className="ion-float-start notificationBt">
                <IonButton routerLink="/main-dashboard" className="notificationsIcon" shape="round">
                <IonImg src="assets/images/home-icon.svg" />
                  </IonButton>
              
                  <IonButton routerLink="/Notification" className="notificationsIcon" shape="round">
                    <IonImg src="assets/images/notifications-icon.svg" />
                  </IonButton>
                  <IonIcon className="alertNotifi" icon={ellipse}></IonIcon>
                </div>
                <IonButton shape="round" routerLink="/Profile">
                  <IonImg src="assets/images/user-icon.svg" />
                </IonButton>
              </div>
            </IonItem>

            <IonSearchbar placeholder="Search for services"></IonSearchbar>
          </div>
            <div className="ion-dashcard-icons">
              <IonRow>
                {dashboardData.length > 0 ? (
                  dashboardData.map((item: any, index: any) => (
                    <IonCol size="4" key={index}>
                      <IonCard routerLink={'/' + item.route}>
                        <IonImg src={apiUrl + item.image} />
                        <IonText>{item.label}</IonText>
                        <IonText><h2>{item.count}</h2></IonText>
                      
                      </IonCard>
                    </IonCol>
                  ))
                ) : ''}
              </IonRow>
            </div>

            <div className="ionFabDash">
              <IonFab slot="fixed" vertical="bottom" horizontal="center"  >
                <IonFabButton routerLink="/requestnewtask">
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
              <IonText>Request for new task </IonText>

            </div>

            <IonCard className="customerSupportBlock">
              <IonItem lines="none" >
                <IonImg src="assets/images/support-icon.svg"></IonImg>
                <IonText>
                  <p>We are always available to help you</p>
                </IonText>
              </IonItem>
            </IonCard>

          </div>
          {isLoading && (
            <div className="loading-overlay">
              <PuffLoader color="#0b453a" loading={isLoading} />
              <p className="loading-text">Loading ...</p>
            </div>
          )}
          <IonText className='loginVersion'>
            <p>App Version &nbsp;{app_version}</p>
          </IonText>
        </IonContent>

      </IonPage>
    </>
  );
};

export default Dashboard
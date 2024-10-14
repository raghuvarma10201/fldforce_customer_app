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
  IonGrid ,
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


  const MainDashboard: React.FC = () => {
    const logo = "assets/images/logo-login.svg";
  const apiUrl: any = import.meta.env.VITE_API_URL;
  const { isLoading, startLoading, stopLoading } = useLoading();
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');

  return (
    <>
      <IonPage>
      <IonContent fullscreen className="loginContent mainDashboard">
        <div className="topOverlay">
            <div className="loginwrappion-padding-horizontal bottomOverlay">
              <IonItem lines="none" className="headerBts mdLogo">
                <IonImg className="loginLogo" src={logo} alt="logo" style={{ height:"100px"}}></IonImg>
                <IonButton shape="round" routerLink="/Profile"><IonImg src="assets/images/user-icon.svg" /></IonButton>
              </IonItem>

              <IonText><h2>Opt for your preferred service</h2></IonText>

<IonRow>

    <IonCol size="4"  className="clCardColor-1">
        <IonThumbnail className="thumbnailIcon">
              <IonImg src="assets/images/proposals-icon.svg"></IonImg>
          </IonThumbnail>  
        <IonCard  routerLink="/dashboard">    
          <IonText>Business Name -1</IonText>
        </IonCard>
    </IonCol>

    <IonCol size="4" className="clCardColor-2">
        <IonThumbnail className="thumbnailIcon">
              <IonImg src="assets/images/proposals-icon.svg"></IonImg>
          </IonThumbnail>  
        <IonCard>    
          <IonText>Business Name -1</IonText>
        </IonCard>
    </IonCol>

    <IonCol size="4" className="clCardColor-3">
        <IonThumbnail className="thumbnailIcon">
              <IonImg src="assets/images/proposals-icon.svg"></IonImg>
          </IonThumbnail>  
        <IonCard>    
          <IonText>Business Name -1</IonText>
        </IonCard>
    </IonCol>

    <IonCol size="4" className="clCardColor-4">
        <IonThumbnail className="thumbnailIcon">
              <IonImg src="assets/images/proposals-icon.svg"></IonImg>
          </IonThumbnail>  
        <IonCard>    
          <IonText>Business Name -1</IonText>
        </IonCard>
    </IonCol>

    <IonCol size="4" className="clCardColor-5">
        <IonThumbnail className="thumbnailIcon">
              <IonImg src="assets/images/proposals-icon.svg"></IonImg>
          </IonThumbnail>  
        <IonCard>    
          <IonText>Business Name -1</IonText>
        </IonCard>
    </IonCol>

    <IonCol size="4" className="clCardColor-6">
        <IonThumbnail className="thumbnailIcon">
              <IonImg src="assets/images/proposals-icon.svg"></IonImg>
          </IonThumbnail>  
        <IonCard>    
          <IonText>Business Name -1</IonText>
        </IonCard>
    </IonCol>




</IonRow>
        

        
            </div>
        </div>
  
      </IonContent>
      </IonPage>
    </>
  );
};

export default MainDashboard
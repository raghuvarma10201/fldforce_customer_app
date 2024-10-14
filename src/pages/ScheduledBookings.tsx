import React, { useEffect, useState } from 'react';
import {
    IonSearchbar,
    IonItem,
    IonThumbnail,
    IonImg,
    IonCard,
    IonCardContent,
    IonText,
    IonLabel,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonPage,
    IonContent,
} from "@ionic/react";
import CommonHeader from "../components/CommonHeader";
import { PuffLoader } from 'react-spinners';
import useLoading from '../components/useLoading';
import { useHistory } from 'react-router';
import {formatDate, formatDateTime, formatTime, getDateTime,} from "../utils/dateTimeUtils";

const ScheduledBookings: React.FC = () => {
    const history = useHistory();
  return (
    <>
    <IonPage>
      <CommonHeader backToPath={"/"} pageTitle={"Scheduled Bookings"} showIcons={true}/>
      <IonContent fullscreen className="myOrderWrapp ion-padding-bottom">
        <div className="backGround bottomOverlay">
          <IonList>
              <IonItem className="ion-margin-horizontal" color="none" lines="none">
                  <div className="myOrderThumbnail">
                    <IonThumbnail slot="start" className="thumbnailIcon">
                      <IonImg src="assets/images/scheduled-bookings-icon.svg"></IonImg>
                    </IonThumbnail>
                  </div>

                  <IonCardContent>
                    <IonText><h2>PRN000081 <span>Pest Control</span></h2></IonText>
                    <IonText><h3 className="ion-text-nowrap">House Flies, Blue Bottle Flies</h3></IonText>
                    <IonText className="d-flex">
                      <IonLabel>Treatment Type :</IonLabel><h4>Wiping, Misting</h4>
                    </IonText>

                    <IonText className="d-flex">
                      <IonLabel>Area Type :</IonLabel> <h4>Internal,External</h4>
                    </IonText>

                    <IonText className="d-flex">
                      <p>2024-07-012 09:49:59.000</p>
                    </IonText>
                  </IonCardContent>
                </IonItem>
            


            
              <IonItem className="ion-margin-horizontal" color="none" lines="none">
              <div className="myOrderThumbnail">
                <IonThumbnail slot="start" className="thumbnailIcon">
                  <IonImg src="assets/images/scheduled-bookings-icon.svg"></IonImg>
                </IonThumbnail>
              </div>

                <IonCardContent>
                  <IonText><h2>PRN000081 <span>Pest Control</span></h2></IonText>
                  <IonText><h3 className="ion-text-nowrap">House Flies, Blue Bottle Flies</h3></IonText>
                  <IonText className="d-flex">
                    <IonLabel>Treatment Type :</IonLabel><h4>Wiping, Misting</h4>
                  </IonText>

                  <IonText className="d-flex">
                    <IonLabel>Area Type :</IonLabel> <h4>Internal,External</h4>
                  </IonText>

                  <IonText className="d-flex">
                    <p>2024-07-012 09:49:59.000</p>
                  </IonText>
                </IonCardContent>
                </IonItem>
           
           

   
          </IonList>
        </div>
      </IonContent>
      </IonPage>
    </>
  );
}

export default ScheduledBookings

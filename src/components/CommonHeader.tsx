import { IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonImg, IonIcon, IonBackButton } from '@ionic/react'
import React from 'react'
import CustomBackButton from './CustomBackButton'
import { useHistory } from 'react-router';
import { ellipse } from 'ionicons/icons'
const CommonHeader:React.FC<any> = ({backToPath, pageTitle, showIcons}) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
      };
  return (
    <>
      <IonHeader translate="yes" className="ion-no-border  ionHeader">
        <IonToolbar>
            <IonButtons slot="start" className="ion-no-padding">
                <IonBackButton defaultHref={backToPath}></IonBackButton>             
            </IonButtons>
    
                  <IonTitle className="ion-float-start">{pageTitle}</IonTitle>
               {showIcons ? (<div className="ion-float-end headerBts" slot="end">
                  <div className="ion-float-start notificationBt">
                      <IonButton  routerLink="/notification" className="notificationsIcon" shape="round">
                          <IonImg src="assets/images/notifications-icon.svg" />                           
                      </IonButton>
                      <IonIcon className="alertNotifi" icon={ellipse}></IonIcon>          
                  </div>

                  <IonButton shape="round"  routerLink="/Profile">
                    <IonImg src="assets/images/user-icon.svg" />
                  </IonButton>
                </div>):''}            
        </IonToolbar>
      </IonHeader>
    </>
  )
}

export default CommonHeader
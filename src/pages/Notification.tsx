import {
    IonBackButton,
    IonSearchbar,
    IonCheckbox,
    IonButton,
    IonButtons,
    IonCard,
    IonCol,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonList,
    IonPage,
    IonRow,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    } from "@ionic/react";
  import { useHistory } from "react-router";
  import CommonHeader from "../components/CommonHeader";

  const Notification: React.FC = () => {
    return (
      <>
        <IonPage>
        <CommonHeader backToPath={"/"} pageTitle={"Notification"} showIcons={false}/>

          <IonContent fullscreen className="ion-padding-horizontal notificationWrapp">
            <div className="ionPaddingBottom backGround">
              <IonList lines="full" class="ion-list-item listItemAll">
                <IonItem>
                  <IonThumbnail slot="start" class="thumbnailIcon">
                    <IonImg src="assets/images/notifications-icon.svg"></IonImg>
                  </IonThumbnail>
                  <IonText className="listCont">
                    {/* <h2 className="declinedColor">Payment Declined</h2>
                    <h6>Mar 14, 2023, 2:34:54 PM</h6>
                    <p className="ion-padding-top">70,000 AED</p> */}
                  </IonText>
                  <IonButton className="itemBt" shape="round">
                    <IonImg src="/assets/images/delete-icon.svg"></IonImg>
                  </IonButton>
                </IonItem>

                <IonItem>
                  <IonThumbnail slot="start" class="thumbnailIcon">
                    <IonImg src="assets/images/notifications-icon.svg"></IonImg>
                  </IonThumbnail>
                  <IonText className="listCont">
                    <h2 className="successfulColor">
                      Payment Successful Recharged{" "}
                    </h2>
                    <h6>Mar 15, 2023, 2:34:54 PM</h6>
                    <p className="ion-padding-top">70,000 AED</p>
                  </IonText>
                  <IonButton className="itemBt" shape="round">
                    <IonImg src="/assets/images/delete-icon.svg"></IonImg>
                  </IonButton>
                </IonItem>
              </IonList>
            </div>
          </IonContent>
        </IonPage>
      </>
    );
  };

export default Notification
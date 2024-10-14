import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButton,
  IonText,
  IonRow,
  IonCol,
} from "@ionic/react";

const app_version: any = localStorage.getItem("app_version");
const app_name: any = localStorage.getItem("app_name");

const Home: React.FC = () => {
  const logo = "assets/images/logo-login.svg";
  return (
    <IonPage>
      {/*    
      ion-customer-home */}
      <IonContent fullscreen className="loginContent">
        <div className="topOverlay">
        <div className="loginwrappion-padding-horizontal bottomOverlay">
          <IonImg
            className="loginLogo "
            src={logo}
            alt="logo"
            style={{ height: "100px" }}
          ></IonImg>

          <IonRow>
            <IonCol size="6">
              <IonButton className="loginOptionsBt" >
                <div className="loginOptionsBtInner">
                  <IonImg src="assets/images/uaepass-icon.svg"></IonImg>
                  <IonText>Signup with <br/> UAE PASS</IonText>
                </div>
              </IonButton>
            </IonCol>

            <IonCol size="6">
              <IonButton
                className="loginOptionsBt"              
                routerLink="/Signup"
              >
                <div className="loginOptionsBtInner">
                  <IonImg
                    slot="start"
                    src="assets/images/login-icon.svg"
                  ></IonImg>
                    <IonText>Sign Up <br/> Now</IonText>
                </div>
              </IonButton>
            </IonCol>
          </IonRow>

            <IonRow>
            <IonCol size="6" offset="3">
              <IonButton
                className="loginOptionsBt"              
                routerLink="/loginmobile"
              >
                <div className="loginOptionsBtInner">
                  <IonImg src="assets/images/login-mobile-icon.svg"></IonImg>
                  <IonText>Login with <br/> Mobile</IonText>
                </div>
              </IonButton>
            </IonCol>
          </IonRow>

          {/* 
                  <IonButton className="loginOptionsBt" fill="outline" routerLink="/login">
                    <div className="loginOptionsBtInner">
                      <IonImg slot="start" src="assets/images/login-icon.svg"></IonImg>
                      Login
                  </div>
                </IonButton> */}
        </div>
        </div>
        <IonText className="loginVersion">
          <p>App Version &nbsp;{app_version}</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;

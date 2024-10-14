import React, { useState } from 'react';
import { IonButton, IonCheckbox, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';


const Login: React.FC = () => {
    const logo = "assets/images/logo-login.svg";
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const history = useHistory();

    const handleLogin = (e: React.FormEvent) => {
        history.push('/Dashboard')
        // e.preventDefault(); // prevents from submission
        // if(!email.trim() || !password.trim()){
        //     console.log("fields are empty"); 
        //     return
        // }      
        // else{
        // }
      
    };
    return (
        <>
            <IonPage>
                <IonContent fullscreen className="loginContent">
                <div className="topOverlay">
                <IonImg
            className="loginLogo "
            src={logo}
            alt="logo"
            style={{ height: "100px" }}
          ></IonImg>
                <div className="loginwrapp ion-padding-horizontal bottomOverlay">
                  
                        <IonText className="loginHeading">
                            <h1>Login</h1>
                            <p>Enter your Email and Password</p>
                        </IonText>
                        
                        <form onSubmit={handleLogin}>
                            <IonLabel className="ion-label">Email</IonLabel>
                            <IonItem lines="none">
                                <IonInput type="email" placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)} required />
                                
                            </IonItem>
                            <IonLabel className="ion-label">Password</IonLabel>
                            <IonItem lines="none">
                                <IonInput type="email" placeholder="Password" value={email} onIonChange={e => setEmail(e.detail.value!)} required />
                               
                            </IonItem>
                            <IonText className="ion-Remember">
                                <IonCheckbox className="ionCheckbox ion-float-left" labelPlacement="end">Remember me</IonCheckbox>
                                <IonButton fill="clear" className="forgotpassword ion-float-right ion-text-capitalize">Forgot Password</IonButton>
                            </IonText>

                            <IonButton  className="primaryBt"  fill="solid" expand="block" onClick={(e)=>handleLogin(e)}>Login</IonButton>
                        </form>
            <div className="signupBottom">
              <IonButton routerLink="/home" className="textLink ion-text-center" fill="clear">
                Back to Home
              </IonButton>

              
            </div>

                    </div>


           
</div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default Login

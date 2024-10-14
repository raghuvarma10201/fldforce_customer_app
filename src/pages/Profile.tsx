import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { useAuth } from '../components/AuthContext';
import CustomBackButton from "../components/CustomBackButton";
import CommonHeader from "../components/CommonHeader";
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


    const Profile: React.FC = () => {
      
      const localUserData:any = localStorage.getItem('userData');
      const [profile, setProfile]:any = useState({});
      const {logout}= useAuth();
      const app_version: any = localStorage.getItem('app_version');
      const app_name: any = localStorage.getItem('app_name');
      const logOutHandler = async() =>{
         await logout();
      }
      useEffect(() => {
        const userProfile = JSON.parse(localUserData);
        console.log("userProfile", userProfile.data);
        setProfile(userProfile.data);
        
      }, []);

      

      
        return (
          <>
            <IonPage>

            <CommonHeader backToPath={"/"} pageTitle={"Profile"} showIcons={false}/>
              <IonContent fullscreen className="ion-padding-horizontal profileWrapp">
                {profile !=='' && (
                  <div className="ionPaddingBottom ion-text-center backGround">
                  <div className="userIconpro">
                    <IonThumbnail>
                      <IonImg className="noImg" src="assets/images/user-icon.svg"></IonImg>
                    </IonThumbnail>
                    {/* <IonButtons  className="editBtProfile">
                     <IonImg src="assets/images/edit-icon.svg"></IonImg>
                    </IonButtons> */}
                  </div>

                  <IonText className="ion-text-center">
                    <h2>{profile.first_name} {profile.last_name}</h2>
                    <h3 className="contactIcons"><IonImg src="assets/images/phone-icon.svg"></IonImg>
                    +971  {profile.mobile_no}</h3>
                    <h3 className="contactIcons"><IonImg src="assets/images/email-icon.svg"></IonImg>
                     {profile.email_id}</h3>
                  </IonText>

                  <IonButton routerLink="/" className="ion-button primaryBt" fill="solid" expand="block">Change Password</IonButton>

                  {/* <IonButton onClick={()=>logOutHandler()} className="textLink" fill="clear"><IonImg src="assets/images/logout-icon.svg"></IonImg>Logout</IonButton> */}
                  
                </div>
                )}
                <IonText className='loginVersionAdmin'>
                  <p>App Version &nbsp;{app_version}</p>
                </IonText>
              </IonContent>

                <IonFooter className="ion-footer">
                {/* onClick={() => submitRequestIsOpen(true)} */}
                    <IonToolbar>
                    <IonButton className="ion-margin-top" type="submit" fill="clear" expand="block" onClick={()=>logOutHandler()}  ><IonImg className="ion-margin-end" src="assets/images/logout-icon.svg"></IonImg> Logout</IonButton>
                    </IonToolbar>
                  </IonFooter>


              {/* <IonFooter className="ion-footer ">
                        <IonToolbar className="bgWhite">            
                            <IonButton onClick={()=>logOutHandler()} className="ion-button ion-margin-horizontal logoutBtIcon"  color="secondary" fill="solid" expand="block"><IonImg src="assets/images/logout-white-icon.svg"></IonImg> Logout</IonButton>
                        </IonToolbar>
                  </IonFooter>  */}
            </IonPage>
          </>
        );
      };

export default Profile
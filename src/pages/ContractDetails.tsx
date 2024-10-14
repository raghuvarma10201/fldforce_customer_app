import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router";
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
    IonLabel,
    } from "@ionic/react";
import { getContractDetails } from '../shared/common';
import useLoading from '../components/useLoading';
import { PuffLoader } from 'react-spinners';

const ContractDetails: React.FC = () => {
  const contractId:any = useParams();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData]=useState<any>([]);
  console.log("contractId", contractId);
  useEffect(() => {
    const getContractDetailsData = async (contract:any) => {
        const body = {
           contract_id:contractId
        };
        startLoading();
        try {
            const response: any = await getContractDetails(body);
            if (response.data.status == 200 && response.data.success) {
              setData(response.data.data);
              console.log("Response Data----", data);
            }
         
        } catch (error) {
            console.error(error);
        } finally {
            stopLoading();
        }
    };

    getContractDetailsData(contractId.id);
}, [contractId.id]);

  return (
    <>
       <IonPage>
            <CommonHeader backToPath={"/"} pageTitle={"Contract Details"} showIcons={false}/>
            <IonContent fullscreen className="ion-padding-horizontal orderDetailsWrapp">
            <div className="backGround">
                  <IonList lines="none">
                    {data.length>0 && (
                      <>
                          <IonItem >
                        <IonThumbnail slot="start" className="thumbnailIcon">
                          <IonImg src="assets/images/myorders-icon.svg"></IonImg>
                        </IonThumbnail>
                        <div>
                        <IonText>
                            <h2 className="h2-heading-text">{data[0].customers[0].customer_name} | {data[0].customers[0].mobile_number}</h2>                             
                            <h3>{data[0].customers[0].email_id}</h3>
                            <h3>Client Type : <span>{data[0].customers[0].client_type}</span></h3>
                          </IonText>
                          {/* <IonText>
                            <h2 className="h2-heading-text">Akhram  | 8728738282</h2>                             
                            <h3>akhram@gmail.com</h3>
                            <h3>Client Type : <span>Residential</span></h3>
                          </IonText> */}
                        </div>
                      </IonItem>

                      <IonItem>
                        <IonThumbnail slot="start" className="thumbnailIcon">
                          <IonImg src="assets/images/manage-addresses-icon.svg"></IonImg>
                        </IonThumbnail>
                        <div>
                          <IonText>
                            <h2 className="h2-heading-text">{data[0].customers[0].address
                            }</h2>                             
                            {/* <h3>Hilton Group - Hilton Garden Inn</h3>                               */}
                          </IonText>
                        </div>
                      </IonItem>

                      <IonItem className="serviceDetailsOrder">
                        <IonThumbnail slot="start" className="thumbnailIcon">
                          <IonImg src="assets/images/services-details-icon.svg"></IonImg>
                        </IonThumbnail>
                        <div>
                          <IonText>
                            <h2 className="h2-heading-text">Service Details</h2>                             
                           <IonLabel>Service</IonLabel>
                            <h4>{data[0].contracts[0].service_name}</h4>

                           <IonLabel>Area Type</IonLabel>
                            <h4>{data[0].contracts[0].area_type}</h4>

                            <IonLabel>Treatment Type</IonLabel>                             <h4>{data[0].contracts[0].treatment_type
                            }</h4>

                           <IonLabel>Service Covered</IonLabel>
                            <h4>{data[0].contracts[0].service_covered
                            }</h4>
                      
                          </IonText>
                        </div>
                      </IonItem>


                      <IonItem className="payDetailsOrder">
                        <IonThumbnail slot="start" className="thumbnailIcon">
                          <IonImg src="assets/images/services-details-icon.svg"></IonImg>
                        </IonThumbnail>
                        <div>
                          <IonText>
                            <h2 className="h2-heading-text">Pay Details</h2>                             
                            <IonText><IonLabel>Quotation Amount</IonLabel> <h4>{data[0]. billing[0].quotation_amount
                            }(AED)</h4></IonText>   
                            <IonText><IonLabel>Vat</IonLabel> <h4>( {data[0].billing[0].vat_percentage} % )</h4></IonText> 
                            <IonText><IonLabel>Treatment Type</IonLabel> <h4>{data[0].contracts[0].treatment_type
                            }</h4></IonText>
                            <IonText><IonLabel>Grand Total</IonLabel> <h4>{data[0].billing[0].grand_total}</h4></IonText>  
                      
                          </IonText>
                        </div>
                      </IonItem>
                      </>
                    )}
                      

                    </IonList>

         </div>
         {isLoading && (
                        <div className="loading-overlay">
                            <PuffLoader color="#0b453a" loading={isLoading} />
                            <p className="loading-text">Loading ...</p>
                        </div>
                    )}
            </IonContent>
        </IonPage>
    </>
  )

}

export default ContractDetails



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
    IonRow,
    IonCol,
} from "@ionic/react";
import CommonHeader from "../components/CommonHeader";
import { getContractsList } from '../shared/common';
import { PuffLoader } from 'react-spinners';
import useLoading from '../components/useLoading';
import { useHistory } from 'react-router';

const MyContracts: React.FC = () => {
    const history = useHistory();
    const [items, setItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const { isLoading, startLoading, stopLoading } = useLoading();
    const filterNewData = (existingItems: any[], newItems: any[]) => {
        const existingProposalNos = new Set(existingItems.map(item => item.proposal_no));
        return newItems.filter(item => !existingProposalNos.has(item.proposal_no));
    };


    useEffect(() => {
        const fetchContracts = async (page: number) => {
            const body = {
                columns: [
                    "tbl_site_survey.proposal_no",
                    "tbl_services.service_name",
                    "tbl_leads.service_covered",
                    "tbl_leads.treatment_type",
                    "tbl_leads.area_type",
                    "tbl_status.status_name",
                    "tbl_site_survey.created_on"
                ],
                order_by: {
                    "tbl_site_survey.proposal_no": "desc",
                    "tbl_site_survey.created_on": "desc"
                },
                filters: {
                    "tbl_site_survey.proposal_no": "",
                    "tbl_site_survey.status": 10
                },
                pagination: {
                    limit: "5",
                    page: page
                }
            };
            startLoading();
            try {
                const response: any = await getContractsList(body);
                if (response.data.status == 200 && response.data.success) {
                    const newTransferData = response.data.data;
                    if (newTransferData.length === 0) {
                        setHasMoreData(false);
                    } else {
                        setItems(prevData => [...prevData, ...filterNewData(prevData, newTransferData)]);
                        if (newTransferData.length < body.pagination.limit) {
                            setHasMoreData(false);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
            finally{
                stopLoading();
              }
        };

        fetchContracts(currentPage);
    }, [currentPage]);

    const loadMoreData = async (event: CustomEvent<void>) => {
        setCurrentPage(prevPage => prevPage + 1);
        (event.target as HTMLIonInfiniteScrollElement).complete();
    };

    const detailAction = (contract_id: any) => {
        history.push('/contractdetails/' + contract_id);
      };
    

    return (
        <IonPage>
            <CommonHeader backToPath={"/"} pageTitle={"My Contracts"} showIcons={true} />
            <IonContent fullscreen className="ion-padding-horizontal myOrderWrapp ion-padding-vertical">
                <div className="backGround bottomOverlay">
                    <IonSearchbar className="ion-margin-bottom" placeholder="Search for Orders"></IonSearchbar>



                    <IonList lines="none">
                        {items.length > 0 ? (
                            items.map((row: any, index: number) => (
                                <IonCard button  onClick={() => detailAction(row.id)} key={`${row.proposal_no}-${index}`}>
                                  <IonItem lines="none" className="width100">
                                    <div className="myOrderThumbnail">
                                        <IonThumbnail slot="start" className="thumbnailIcon">
                                            <IonImg src="assets/images/myorders-icon.svg"></IonImg>
                                        </IonThumbnail>
                                    </div>
                               
                                        <IonCardContent>
                                            <IonText><h2>{row.proposal_no} <span>{row.service_name}</span></h2></IonText>
                                            <IonText><h3 className="ion-text-nowrap">{row.service_covered}</h3></IonText>
                                            <IonText className="d-flex"><IonLabel>Treatment Type :</IonLabel> <h4>{row.treatment_type}</h4></IonText>
                                            <IonText className="d-flex"><IonLabel>Area Type :</IonLabel> <h4>{row.area_type}</h4></IonText>
                                            <IonText className="d-flex"><IonLabel>Created On :</IonLabel> <h4>{row.created_on}</h4></IonText>

                                            {/* <IonText className="d-flex"><p>
                                                 <span className="successfulColor">{row.created_on}</span>
                                            </p></IonText> */}
                                        </IonCardContent>                                   
                                </IonItem>
                                </IonCard>
                            ))
                        ) : (
                            ''
                        )}
                    </IonList>

                    <IonInfiniteScroll onIonInfinite={loadMoreData} threshold="100px" disabled={!hasMoreData}>
                        <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </div>
                {isLoading && (
        <div className="loading-overlay">
          <PuffLoader color="#0b453a" loading={isLoading} />
          <p className="loading-text">Loading ...</p>
        </div>)}
            </IonContent>
        </IonPage>
    );
};

export default MyContracts;

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
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonLabel,
    } from "@ionic/react";
  import { useHistory } from "react-router";
  import CommonHeader from "../components/CommonHeader";
  import { chevronForward } from 'ionicons/icons';
import { useEffect, useState } from "react";
import useLoading from "../components/useLoading";
import { getBusinessId, getCustomerId, getVisitsList } from "../shared/common";
import { PuffLoader } from "react-spinners";
import {formatDate, formatDateTime, formatTime, getDateTime,} from "../utils/dateTimeUtils";

const Reports: React.FC = () => {
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
    const fetchReports = async (page: number) => {
        const body = {
            columns: [
              "tbl_site_survey.proposal_no",
              "tbl_visits.reference_number",
              "tbl_services.service_name",
              "tbl_visits.service_date",
              "tbl_status.status_name",
              "tbl_visits.expiry_date",
              "tbl_visits.service_completed"
            ],
            order_by: {
                 "tbl_site_survey.proposal_no": "desc",
                 "tbl_visits.service_date": "desc"
            },
            filters: {
              "tbl_site_survey.proposal_no": "",
              "tbl_visits.service_status" : ["18"],
              "tbl_site_survey.customer_id" : await getCustomerId(),
              "tbl_site_survey.business_id" : await getBusinessId()
            },
            pagination: {
                limit: "5",
                page: page
            }
        };
        startLoading();
        try {
            const response: any = await getVisitsList(body);
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

    fetchReports(currentPage);
}, [currentPage]);

const loadMoreData = async (event: CustomEvent<void>) => {
    setCurrentPage(prevPage => prevPage + 1);
    (event.target as HTMLIonInfiniteScrollElement).complete();
};

const detailAction = (reports_id: any) => {
    history.push('/reports-details/' + reports_id);
  };

  return (
    <>
      <IonPage>
        <CommonHeader backToPath={"/"} pageTitle={"Reports"} showIcons={true} />
        <IonContent fullscreen className="proposalsWrapp">
          <div className="ionPaddingBottom backGround bottomOverlay">
          {/* onClick={() => detailAction(row.id)} */}
            <IonList>
            {items.length > 0 ? (
                            items.map((row: any, index: number) => (
              <IonCard button   key={`${row.proposal_no}-${index}`} onClick={() => detailAction(row.id)}>
                <IonItem lines="none" className="ion-margin-horizontal " >

                

                <IonThumbnail slot="start" className="thumbnailIcon">
                  <IonImg src="assets/images/reports-icon.svg"></IonImg>
                </IonThumbnail>
                <div className="width100">
                  <div>
                    <IonText className="d-flex ion-justify-content-between">
                      <h6>{row.proposal_no}</h6>
                      <IonIcon className="float-end detailsArrow" color="medium" icon={chevronForward}></IonIcon>
                    </IonText>

                    <IonText>
                      <h2>{row.service_name}</h2>
                      <h3>Reference No: <span>{row.reference_number}</span></h3>
                      {/* <h3>Start Date: <span>{row.start_date}</span></h3> */}
                      {/* <h3>Start Date: <span>{`${formatDate(row.start_date)}`}</span></h3> */}
                    
                      {/* <h3>End Date: <span>{row.expiry_date}</span></h3> */}
                      {/* <h3>End Date: <span>{`${formatDate(row.expiry_date)}`}</span></h3> */}
                      {/* <div className="d-flex">
                        <h4>Status: <span className="successfulColor">{row.status_name}</span></h4>
                      </div> */}
                    </IonText>
                  </div>
                </div>
              </IonItem>

                        <IonRow className="CardBottom">
                            <IonCol size="4">
                              <IonLabel>Start Date </IonLabel>             
                              <IonText><h4>{`${formatDate(row.start_date)}`}</h4></IonText>  
                            </IonCol>

                            <IonCol size="4">
                              <IonLabel>End Date</IonLabel>             
                              <IonText><h4>{`${formatDate(row.expiry_date)}`}</h4></IonText>  
                            </IonCol>

                            <IonCol size="4">
                              <IonLabel>Status</IonLabel>             
                              <IonText><h5 className="successfulColor">{row.status_name}</h5></IonText> 
                            </IonCol>
                        </IonRow>
                     
                     
                      {/* <div className="d-flex">
                        <h4>Status: <span className="successfulColor">{row.status_name}</span></h4>
                      </div> */}
             
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
    </>
  );
}


export default Reports


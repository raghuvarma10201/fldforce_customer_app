import {
  IonBackButton,
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
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import CommonHeader from "../components/CommonHeader";
import { chevronForward } from 'ionicons/icons';
import useLoading from "../components/useLoading";
import { useEffect, useState } from "react";
import { getVisitExecutionDetails } from "../shared/common";
import { PuffLoader } from "react-spinners";
import {formatDate, formatDateTime, formatTime, getDateTime,} from "../utils/dateTimeUtils";

interface Pest {
  id: string;
  is_pest_found: string;
  pest_report_type: string;
  pest_severity: string;
  pest_area: string;
  pest_photo: string;
}

interface Material {
  id: string;
  item_name: string;
  quantity: number;
  unit_name: string;
}

interface Recommendation {
  id: string;
  pest_report_type: string;
  recommendation_type: string;
  is_recommendation_added: string;
  recommendations: string;
  recommended_media: string[];
}

interface Work {
  id: string;
  question: string;
  descriptive: string;
}

interface Feedback {
  id: string;
  customer_feedback: string;
  customer_signature: string;
  is_follow_up_required: string;
  next_follow_up: string;
}

interface Data {
  pests_found: Pest[];
  materials_used: Material[];
  pests_recommendations: Recommendation[];
  work_done_details: Work[];
  feedback_details: Feedback[];
  pests_found_image_path: string;
  pests_recommendations_image_path: string;
  signature_path: string;
}

const ReportsDetails: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const getReportsDetailsData = async (visitId: string) => {
      const body = {
        visit_id: visitId,
      };
      startLoading();
      try {
        const response: any = await getVisitExecutionDetails(body);
        if (response.data.status == 200 && response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();
      }
    };

    getReportsDetailsData(id);
  }, [id]);

  return (
    <IonPage>
      <CommonHeader backToPath="/" pageTitle="Reports Details" showIcons />
      <IonContent fullscreen className="ion-padding-horizontal reports-details">
        <div className="background">
          {data && (
            <IonList className="reports-details-list">
              {data.pests_found && data.pests_found.length > 0 && (
                <IonItem>
                  <div className="width-100">
                    <IonLabel>Pests Found</IonLabel>
                    {data.pests_found.map((pest) => (
                      <div key={pest.id}>
                        <IonText className="ion-margin-bottom">
                          <h2>Is Pest Found</h2>
                          <h3>{pest.is_pest_found}</h3>
                        </IonText>
                        <IonText className="ion-margin-bottom">
                          <h2>Pest Reported</h2>
                          <h3>{pest.pest_report_type}</h3>
                        </IonText>
                        <IonText className="ion-margin-bottom">
                          <h2>Pest Severity</h2>
                          <h3>{pest.pest_severity}</h3>
                        </IonText>
                        <IonText className="ion-margin-bottom">
                          <h2>Pest Area</h2>
                          <h3>{pest.pest_area}</h3>
                        </IonText>
                        <IonText className="ion-margin-bottom">
                          <h2>Pest Photo</h2>
                          <IonImg
                            src={`${data.pests_found_image_path}${pest.pest_photo}`}
                          />
                        </IonText>
                      </div>
                    ))}
                  </div>
                </IonItem>
              )}

              {data.materials_used && data.materials_used.length > 0 && (
                <IonItem>
                  <div className="width-100">
                    <IonLabel>Chemicals Used</IonLabel>
                    {data.materials_used.map((material) => (
                      <IonRow key={material.id}>
                        <IonCol size="8">
                          <h2>{material.item_name}</h2>
                        </IonCol>
                        <IonCol size="4">
                          <h3 className="ion-text-end">
                            {material.quantity} {material.unit_name}
                          </h3>
                        </IonCol>
                      </IonRow>
                    ))}
                  </div>
                </IonItem>
              )}

              {data.pests_recommendations &&
                data.pests_recommendations.length > 0 && (
                  <IonItem>
                    <div className="width-100">
                      <IonLabel>Recommendations</IonLabel>
                      {data.pests_recommendations.map((recommendation) => (
                        <div key={recommendation.id}>
                          <IonText className="ion-margin-bottom">
                            <h2>Report Type</h2>
                            <h3>{recommendation.pest_report_type}</h3>
                          </IonText>
                          <IonText className="ion-margin-bottom">
                            <h2>Recommendation Name</h2>
                            <h3>{recommendation.recommendation_type}</h3>
                          </IonText>
                          <IonText className="ion-margin-bottom">
                            <h2>Is Recommendation Added</h2>
                            <h3>{recommendation.is_recommendation_added}</h3>
                          </IonText>
                          <IonText className="ion-margin-bottom">
                            <h2>Description</h2>
                            <h3>{recommendation.recommendations}</h3>
                          </IonText>
                          <IonText className="ion-margin-bottom">
                            <h2>Pest Photo</h2>
                            {recommendation.recommended_media.length > 0 && (
                              <IonImg
                                src={`${data.pests_recommendations_image_path}${recommendation.recommended_media[0]}`}
                              />
                            )}
                          </IonText>
                        </div>
                      ))}
                    </div>
                  </IonItem>
                )}

              {data.work_done_details && data.work_done_details.length > 0 && (
                <IonItem>
                  <div className="width-100">
                    <IonLabel>Work Done Details</IonLabel>
                    {data.work_done_details.map((work) => (
                      <div key={work.id}>
                        <IonText className="ion-margin-bottom">
                          <h2>{work.question}</h2>
                          <h3>{work.descriptive}</h3>
                        </IonText>
                      </div>
                    ))}
                  </div>
                </IonItem>
              )}

              {data.feedback_details && data.feedback_details.length > 0 && (
                <IonItem lines="none">
                  <div className="width-100">
                    <IonLabel>Feedback and Follow-up</IonLabel>
                    {data.feedback_details.map((feedback) => (
                      <div key={feedback.id}>
                        <IonText className="ion-margin-bottom">
                          <h2>Customer Feedback</h2>
                          <h3>{feedback.customer_feedback}</h3>
                        </IonText>
                        <IonText className="ion-margin-bottom">
                          <h2>Customer Signature</h2>
                          <IonImg
                            src={`${data.signature_path}${feedback.customer_signature}`}
                          />
                        </IonText>
                        <IonText className="ion-margin-bottom">
                          <h2>Is Follow-up Required</h2>
                          <h3>{feedback.is_follow_up_required}</h3>
                        </IonText>
                        <IonText className="ion-margin-bottom">
                          <h2>Next Follow-up</h2>
                          {/* <h3>{feedback.next_follow_up}</h3> */}
                          <h3>{`${formatDate(feedback.next_follow_up)}`}</h3>
                        

                          
                        </IonText>
                      </div>
                    ))}
                  </div>
                </IonItem>
              )}
            </IonList>
          )}
        </div>
        {isLoading && (
          <div className="loading-overlay">
            <PuffLoader color="#0b453a" loading={isLoading} />
            <p className="loading-text">Loading...</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ReportsDetails;

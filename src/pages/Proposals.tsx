import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import axios from "axios";

import { useHistory } from "react-router";
import CustomBackButton from "../components/CustomBackButton";
import CommonHeader from "../components/CommonHeader";
import {
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
    IonCardContent,
    IonLabel,
    IonAlert,
    IonModal,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
} from "@ionic/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { chevronForward } from 'ionicons/icons';
import useLoading from "../components/useLoading";
import { getBusinessId, getCustomerId, getProposalList } from "../shared/common";
import { PuffLoader } from "react-spinners";

const Proposals: React.FC = () => {
    const [isOpen, setRequestIsOpen] = useState(false);
    const history = useHistory();
    const [items, setItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const { isLoading, startLoading, stopLoading } = useLoading();

    const filterNewData = (existingItems: any[], newItems: any[]) => {
        const existingProposalNos = new Set(existingItems.map(item => item.proposal_no));
        return newItems.filter(item => !existingProposalNos.has(item.proposal_no));
    };

    const proposalsDetailsPage = () => { history.push("/proposaldetails") }

    const initialValues = {
        discount: "",
    };

    const validationSchema = Yup.object().shape({
        discount: Yup.number().required("Discount is required"),
    });

    const onSubmit = async (values: any) => {
        console.log(values);
        setRequestIsOpen(false);
    };

    useEffect(() => {
        const fetchProposal = async (page: number) => {
            const body = {
                columns: [
                    "tbl_site_survey.proposal_no",
                    "tbl_services.service_name",
                    "tbl_site_survey.grand_total",
                    "tbl_status.status_name",
                    "tbl_site_survey.created_on"
                ],
                order_by: {
                    "tbl_site_survey.proposal_no": "desc",
                    "tbl_site_survey.created_on": "desc"
                },
                filters: {
                    "tbl_site_survey.customer_id" : await getCustomerId(),
                    "tbl_site_survey.business_id" :await getBusinessId(),
                    "tbl_site_survey.proposal_no": "",
                    "tbl_site_survey.status": ["7", "11"]
                },
                pagination: {
                    limit: "5",
                    page: page
                }
            };
            startLoading();
            try {
                const response: any = await getProposalList(body);
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
            } finally {
                stopLoading();
            }
        };

        fetchProposal(currentPage);
    }, [currentPage]);

    const loadMoreData = async (event: CustomEvent<void>) => {
        setCurrentPage(prevPage => prevPage + 1);
        (event.target as HTMLIonInfiniteScrollElement).complete();
    };

    const detailAction = (proposal_id: any) => {
      history.push('/proposaldetails/' + proposal_id);
    };

    return (
        <>
            <IonPage>
                <CommonHeader
                    backToPath={"/"}
                    pageTitle={"Proposals"}
                    showIcons={true}
                />
                <IonContent
                    fullscreen
                    className="ion-padding-horizontal proposalsWrapp ion-padding-vertical "
                >
                    <div className="backGround bottomOverlay">





                        <IonList>
                            {items.length > 0 ? (
                                items.map((row: any, index: number) => (
                                    <IonItem button key={row.id}>
                                        <IonThumbnail slot="start" className="thumbnailIcon">
                                            <IonImg src="assets/images/proposals-icon.svg"></IonImg>
                                        </IonThumbnail>
                                        <div className="width100">
                                            <div onClick={() => detailAction(row.id)} >
                                                <IonText className="d-flex ion-justify-content-between">
                                                    <h6>{row.proposal_no}</h6>
                                                    <IonIcon className="float-end detailsArrow" color="medium" icon={chevronForward}></IonIcon>
                                                </IonText>

                                                <IonText>
                                                    <h2>{row.service_name}</h2>
                                                    <p>{row.created_on}</p>
                                                    <h3>
                                                        Payment: <span>{row.grand_total}</span>{" "}
                                                        <IonText>( AED )</IonText>
                                                    </h3>
                                                    <div className="d-flex">
                                                        <h4>
                                                            Status: <span className="pendingColor">{row.status_name}</span>
                                                        </h4>
                                                    </div>
                                                </IonText>
                                            </div>

                                            {/* <div className="proposalsBt">
                                                <IonButton
                                                    onClick={() => setRequestIsOpen(true)}
                                                    shape="round"
                                                    size="small"
                                                    className="requestBt"
                                                >
                                                    Request
                                                </IonButton>
                                                <IonButton shape="round" size="small" className="acceptBt">
                                                    Accept
                                                </IonButton>
                                                <IonButton shape="round" size="small" className="rejectBt">
                                                    Reject
                                                </IonButton>
                                            </div> */}
                                        </div>
                                    </IonItem>
                                ))
                            ) : (
                                ''
                            )}
                            <IonInfiniteScroll onIonInfinite={loadMoreData} threshold="100px" disabled={!hasMoreData}>
                                <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                            </IonInfiniteScroll>
                        </IonList>
                    </div>

                    <IonModal className="proposalsModalAlert" isOpen={isOpen}>
                        <IonContent className="ion-padding">
                            <IonText><h3>PRN000128</h3></IonText>
                            <Formik initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}>
                                {({ touched, errors, setFieldValue }) => (
                                    <Form>
                                        <IonLabel className="ion-label">How much discount do you want?</IonLabel>
                                        <Field name="discount" placeholder="" type="number" className="custom-form-control" />
                                        <p>( Percentage )</p>
                                        <div className="modalAlertBt">
                                            <IonButton className="ion-margin-end" size="default" color="medium" fill="outline" onClick={() => setRequestIsOpen(false)}>Cancel</IonButton>
                                            <IonButton type="submit" fill="solid" color="primary" size="default">Submit</IonButton>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </IonContent>
                    </IonModal>
                    {isLoading && (
                        <div className="loading-overlay">
                            <PuffLoader color="#0b453a" loading={isLoading} />
                            <p className="loading-text">Loading ...</p>
                        </div>
                    )}
                </IonContent>
            </IonPage>
        </>
    );
}

export default Proposals;

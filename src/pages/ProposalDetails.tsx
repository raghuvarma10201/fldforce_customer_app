import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from "react-router";
import {
    IonButton,
    IonContent,
    IonFooter,
    IonItem,
    IonList,
    IonPage,
    IonText,
    IonThumbnail,
    IonImg,
    IonLabel,
    IonToolbar,
    IonModal,
    IonInput,
} from "@ionic/react";
import useLoading from '../components/useLoading';
import { acceptProposalRequest, discountRequest, getCustomerId, getProposalDetails, rejectProposal } from '../shared/common';
import { PuffLoader } from 'react-spinners';
import CommonHeader from "../components/CommonHeader";
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Filesystem, Directory, Encoding, FilesystemEncoding, FilesystemDirectory } from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react';
import { body } from 'ionicons/icons';
import { Toast } from 'react-toastify/dist/components';

import '@capacitor-community/http';

import { Plugins } from '@capacitor/core';



const ProposalDetails: React.FC = () => {
    const history = useHistory();
    const [isOpen, setRequestIsOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const { id } = useParams<{ id: string }>();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [data, setData] = useState<any>(null);
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);

    const clear = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
            setRequestIsOpen(false);
        }
    };

    const save = async () => {
        if (sigCanvas.current) {
            setTrimmedDataURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
        }
    };

    const validationSchema1 = Yup.object({
        reject_remarks: Yup.string().required('Required'),
       
      });

      const validationSchema2 = Yup.object({
        comments: Yup.string().required('Required'),
      });

      const handleRejectSubmit = async(values:any) => {
        console.log('handleRejectSubmit:', values);
        startLoading();
        try {

            const body = {
                id: id,
                customer_id : await getCustomerId(),
                proposal_no: data[0].proposal_no,
                reject_remarks: values.reject_remarks
            };
            const response: any = await rejectProposal(body);
            if (response.data.status == 200 && response.data.success) {
                setRejectModalOpen(false);
                toast.success(response.data.message);
                history.push('/proposals');
            }

        } catch (error) {
            toast.error("Failed to reject. Please try again.");
        }
        finally {
            stopLoading();
        }
      };

      const handleRequestSubmit = async(values:any) => {
        console.log('handleRequestSubmit:', values);
        startLoading();
        try {

            const body = {
                id: id,
                customer_id : await getCustomerId(),
                proposal_no: data[0].proposal_no,
                comments: values.comments
            };
            const response: any = await discountRequest(body);
            if (response.data.status == 200 && response.data.success) {
                setRejectModalOpen(false);
                toast.success(response.data.message);
                history.push('/proposals');
            }

        } catch (error) {
            toast.error("Failed to request. Please try again.");
        }
        finally {
            stopLoading();
        }
      };


    useEffect(() => {
        if (trimmedDataURL) {
            const saveSignature = async () => {
                startLoading();
                try {
                    const body = {
                        id: id,
                        customer_id : await getCustomerId(),
                        proposal_no: data[0].proposal_no,
                        customer_signature: trimmedDataURL
                    };

                    const response: any = await acceptProposalRequest(body);

                    if (response.data.status == 200 && response.data.success) {
                        setRequestIsOpen(false);
                        toast.success(response.data.message);
                        history.push('/proposals');
                    }
                } catch (error) {
                    console.error("Error saving signature:", error);
                    toast.error("Failed to save the signature. Please try again.");
                } finally {
                    stopLoading();
                }
            };

            saveSignature();
        }
    }, [trimmedDataURL]);

    useEffect(() => {
        const getProposalDetailsData = async (proposalId: string) => {
            startLoading();
            try {
                const response: any = await getProposalDetails({ proposal_id: proposalId });
                if (response.data.status == 200 && response.data.success) {
                    setData(response.data.data);
                    console.log("Proposal Response Data:", response.data.data);
                }
            } catch (error) {
                console.error("Error fetching proposal details:", error);
                toast.error("Failed to fetch proposal details. Please try again.");
            } finally {
                stopLoading();
            }
        };

        getProposalDetailsData(id);
    }, [id]);

    // const downloadProposal = () => {
    //     if (data && data[0].proposal_file) {
    //         const { proposal_file, file_extention, file_name } = data[0];
    //         const linkSource = `data:application/${file_extention};base64,${proposal_file}`;
    //         const downloadLink = document.createElement('a');
    //         const fileName = `${file_name}_proposal.${file_extention}`;

    //         downloadLink.href = linkSource;
    //         downloadLink.download = fileName;
    //         downloadLink.click();
    //     }
    // };

    // Modify the downloadProposal function
// const downloadProposal = async () => {
//     if (data && data[0].proposal_file) {
//         const { proposal_file, file_extention, file_name } = data[0];
//         const base64Data = `data:application/${file_extention};base64,${proposal_file}`;
//         const fileName = `${file_name}_proposal.${file_extention}`;

//         if (isPlatform('hybrid')) {
//             // Use Capacitor Filesystem for mobile
//             try {
//                 await Filesystem.writeFile({
//                     path: fileName,
//                     data: proposal_file,
//                     directory: Directory.Documents,
//                     encoding: Encoding.UTF8,
//                 });
//                 toast.success("File downloaded successfully.");
//             } catch (error) {
//                 console.error("Error writing file:", error);
//                 toast.error("Failed to download the file. Please try again.");
//             }
//         } else {
//             // Use browser method for web
//             const downloadLink = document.createElement('a');
//             downloadLink.href = base64Data;
//             downloadLink.download = fileName;
//             downloadLink.click();
//         }
//     }
// };

// const downloadProposal = async () => {
//     if (data && data[0].proposal_file) {
//         const { proposal_file, file_extention, file_name } = data[0];
//         const base64Data = `data:application/${file_extention};base64,${proposal_file}`;
//         //const fileName = `${file_name}_proposal.${file_extention}`;

//         const currentDate = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');
//         const fileName = `${file_name}_proposal-${currentDate}.pdf`;

//         if (isPlatform('hybrid')) {
//             // Use Capacitor Filesystem for mobile
//             try {
//                 if (Filesystem && Directory) {
//                     await checkFilesystemPermissions();

//                     // Ensure the directory exists
//                     const directoryPath = Directory.Documents;
//                     await ensureDirectoryExists(directoryPath);

//                     const result = await Filesystem.writeFile({
                       
//                         path: fileName,
//                         data: proposal_file,
//                         directory: Directory.Documents,
//                         //directory: FilesystemDirectory.ExternalStorage,
//                         encoding: FilesystemEncoding.UTF8,
//                        // encoding: Encoding.UTF8,
//                         recursive: true
//                     });


                  

//                     console.log("File write result:", result);
//                     await toast.error("File downloaded successfully.");
//                 } else {
//                     throw new Error("Filesystem components not available.");
//                 }
//             } catch (error) {
//                 console.error("Error writing file:", error);
//                 await toast.error("Failed to download the file. Please try again.");
//             }
//         } else {
//             // Use browser method for web
//             try {
//                 const downloadLink = document.createElement('a');
//                 downloadLink.href = base64Data;
//                 downloadLink.download = fileName;
//                 downloadLink.click();
//                 await toast.error("File downloaded successfully.");
//             } catch (error) {
//                 console.error("Error downloading file:", error);
//                 await toast.error("Failed to download the file. Please try again.");
//             }
//         }
//     } else {
//         await toast.error("No proposal file found.");
//     }
// };


const downloadProposal = async () => {
    if (data && data[0].proposal_file) {
        const { proposal_file, file_extention, file_name } = data[0];
        const base64Data = `data:application/${file_extention};base64,${proposal_file}`;
        const currentDate = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');
        const fileName = `${file_name}_proposal-${currentDate}.pdf`;

        if (isPlatform('hybrid')) {
            // Use Capacitor Filesystem for mobile
            try {
                if (Filesystem && Directory) {
                    await checkFilesystemPermissions();

                    // Attempt to write the file
                    const result = await Filesystem.writeFile({
                        path: fileName,
                        data: proposal_file,
                        directory: Directory.Documents,
                        recursive: true

                        
                    });

                    console.log("File write result:", result);
                    await toast.success("File downloaded successfully.");
                } else {
                    throw new Error("Filesystem components not available.");
                }
            } catch (error) {
                console.error("Error writing file:", error);
                await toast.error("Failed to download the file. Please try again.");
            }
        } else {
            // Use browser method for web
            try {
                const downloadLink = document.createElement('a');
                downloadLink.href = base64Data;
                downloadLink.download = fileName;
                downloadLink.click();
                await toast.error("File downloaded successfully.");
            } catch (error) {
                console.error("Error downloading file:", error);
                await toast.error("Failed to download the file. Please try again.");
            }
        }
    } else {
        await toast.error("No proposal file found.");
    }
};



// Helper function to check permissions
const checkFilesystemPermissions = async () => {
    try {
        const permissionStatus = await Filesystem.requestPermissions();

        if (permissionStatus.publicStorage !== 'granted') {
            throw new Error('Filesystem permissions not granted.');
        }

        console.log('Filesystem permissions granted.');
    } catch (error) {
        console.error('Filesystem permissions error:', error);
        throw new Error('Permissions not granted.');
    }
};

// Helper function to ensure directory exists
const ensureDirectoryExists = async (directory:any) => {
    try {
        await Filesystem.mkdir({
            path: 'Psd',
            directory: directory,
            recursive: true
        });
    } catch (error:any) {
        // If directory already exists, the error code will be "EEXIST"
        if (error.message !== 'EEXIST') {
            console.error('Error creating directory:', error);
            throw error;
        }
    }
};


const downloadFile = async () => {
    const { Http } = Plugins;
    const ret = await Http.downloadFile({url: 'https://example.com/path/to/download.pdf',
      filePath: 'document.pdf',
      fileDirectory: FilesystemDirectory.Documents
    });
    if (ret.path) {
      const read = await Filesystem.readFile({
        path: 'download.pdf',
        directory: FilesystemDirectory.Documents
      });
      // Data is here
    }
  }

// Helper function to show toast messages
// const showToast = async (message) => {
//     await Toast.show({
//         text: message,
//         duration: 'short',
//         position: 'bottom',
//     });
// };

    return (
        <IonPage>
            <CommonHeader backToPath={"/"} pageTitle={"Proposal Details"} showIcons={true} />
            <IonContent fullscreen className="ion-padding-horizontal orderDetailsWrapp ">
                <div className="backGround">
                    <IonList lines="none" className='ionPaddingBottom'>
                        {data && data.length > 0 && (
                            <>
                                <IonItem>
                                    <IonThumbnail slot="start" className="thumbnailIcon">
                                        <IonImg src="assets/images/myorders-icon.svg" />
                                    </IonThumbnail>
                                    <div>
                                        <IonText>
                                            <h2 className="h2-heading-text">{data[0].customers[0].customer_name} | {data[0].customers[0].mobile_number}</h2>
                                            <h3>{data[0].customers[0].email_id}</h3>
                                            <h3>Client Type: <span>{data[0].customers[0].client_type}</span></h3>
                                        </IonText>
                                    </div>
                                </IonItem>

                                <IonItem>
                                    <IonThumbnail slot="start" className="thumbnailIcon">
                                        <IonImg src="assets/images/manage-addresses-icon.svg" />
                                    </IonThumbnail>
                                    <div>
                                        <IonText>
                                            <h2 className="h2-heading-text">{data[0].customers[0].address}</h2>
                                        </IonText>
                                    </div>
                                </IonItem>

                                <IonItem className="serviceDetailsOrder">
                                    <IonThumbnail slot="start" className="thumbnailIcon">
                                        <IonImg src="assets/images/services-details-icon.svg" />
                                    </IonThumbnail>
                                    <div>
                                        <IonText>
                                            <h2 className="h2-heading-text">Service Details</h2>
                                            <IonLabel>Service</IonLabel>
                                            <h4>{data[0].contracts[0].service_name}</h4>
                                            <IonLabel>Area Type</IonLabel>
                                            <h4>{data[0].contracts[0].area_type}</h4>
                                            <IonLabel>Treatment Type</IonLabel>
                                            <h4>{data[0].contracts[0].treatment_type}</h4>
                                            <IonLabel>Service Covered</IonLabel>
                                            <h4>{data[0].contracts[0].service_covered}</h4>
                                        </IonText>
                                    </div>
                                </IonItem>

                                <IonItem className="payDetailsOrder">
                                    <IonThumbnail slot="start" className="thumbnailIcon">
                                        <IonImg src="assets/images/services-details-icon.svg" />
                                    </IonThumbnail>
                                    <div>
                                        <IonText>
                                            <h2 className="h2-heading-text">Pay Details</h2>
                                            <IonLabel>Quotation Amount</IonLabel>
                                            <h4>{data[0].billing[0].quotation_amount}(AED)</h4>
                                            <IonLabel>Vat</IonLabel>
                                            <h4>({data[0].billing[0].vat_percentage}%)</h4>
                                            <IonLabel>Treatment Type</IonLabel>
                                            <h4>{data[0].contracts[0].treatment_type}</h4>
                                            <IonLabel>Grand Total</IonLabel>
                                            <h4>{data[0].billing[0].grand_total}</h4>
                                        </IonText>
                                    </div>
                                </IonItem>

                                <div className="proposalsBt">
                                    {data[0].accept_flag == 1 && (
                                        <IonButton shape="round" size="small" className="acceptBt" onClick={() => setRequestIsOpen(true)}>Accept</IonButton>
                                    )}
                                    {data[0].request_flag == 1 && (
                                        <IonButton shape="round" size="small" className="requestBt" onClick={() => setRequestModalOpen(true)}>Request</IonButton>
                                    )}
                                    {data[0].reject_flag == 1 && (
                                        <IonButton shape="round" size="small" className="rejectBt"  onClick={() => setRejectModalOpen(true)}>Reject</IonButton>
                                    )}
                                </div>
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
            <IonModal className="proposalsModalAlert" isOpen={isOpen}>
            {data && data.length > 0 && (<IonText>{data[0].proposal_no}</IonText>)}
                <IonContent className="ion-padding">
                    <div>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                        />
                        <IonButton onClick={clear}>Clear</IonButton>
                        <IonButton onClick={save}>Save</IonButton>
                    </div>
                </IonContent>
            </IonModal>
            <IonModal className="proposalsModalAlert" isOpen={rejectModalOpen}>
            {data && data.length > 0 && (<IonText>{data[0].proposal_no}</IonText>)}
                <IonContent className="ion-padding">
                <Formik
          initialValues={{ reject_remarks: ''}}
          validationSchema={validationSchema1}
          onSubmit={handleRejectSubmit}
        >
             {({ touched, errors, values, setFieldValue, setFieldTouched }) => (
                 <Form>
                     <div className="width100">
                     <IonLabel className="ion-label">Reject Remarks</IonLabel>
                     <IonItem>
                 
                   <Field
                        name="reject_remarks"
                        placeholder="Enter your remarks"
                        as="textarea"
                        className={
                            touched.reject_remarks && errors.reject_remarks
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                        />
                   {/* <ErrorMessage name="reject_remarks" component="div" /> */}
                 </IonItem>
                 {touched.reject_remarks && errors.reject_remarks && (
                      <IonText color="danger" className="errorMessage">
                        <ErrorMessage name="reject_remarks" />
                      </IonText>
                    )}
                     </div>
             
                
                 <IonButton type="submit">Submit</IonButton>
               </Form>
             )}
         
        </Formik>
                </IonContent>
            </IonModal>
            <IonModal className="proposalsModalAlert" isOpen={requestModalOpen}>
            {data && data.length > 0 && (<IonText>{data[0].proposal_no}</IonText>)}
                <IonContent className="ion-padding">
                <Formik
          initialValues={{ comments: ''}}
          validationSchema={validationSchema2}
          onSubmit={handleRequestSubmit}
        >
             {({ touched, errors, values, setFieldValue, setFieldTouched }) => (
                 <Form>
                     <div className="width100">
                     <IonLabel className="ion-label">Comments</IonLabel>
                     <IonItem>
                 
                   <Field
                        name="comments"
                        placeholder="Enter your comments"
                        as="textarea"
                        className={
                            touched.comments && errors.comments
                            ? "custom-form-control is-invalid"
                            : "custom-form-control"
                        }
                        />
                   {/* <ErrorMessage name="reject_remarks" component="div" /> */}
                 </IonItem>
                 {touched.comments && errors.comments && (
                      <IonText color="danger" className="errorMessage">
                        <ErrorMessage name="comments" />
                      </IonText>
                    )}
                     </div>
             
                
                 <IonButton type="submit">Submit</IonButton>
               </Form>
             )}
         
        </Formik>
                </IonContent>
            </IonModal>
            <IonFooter className="ion-footer ion-footerPosition">
                <IonToolbar>
                    <IonButton className="ion-margin-top" type="submit" fill="clear" expand="block" onClick={downloadProposal}>Download Proposal</IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default ProposalDetails;

import React, { useEffect, useState } from "react";
import CustomBackButton from "../components/CustomBackButton";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import axios from 'axios';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonButton,
  IonContent,
  IonFooter,
  IonItem,
  IonList,
  IonText,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonToolbar,
  IonModal,
  IonRow,
  IonCol,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonHeader,
  IonTitle,
  IonButtons,
  IonSearchbar,
  isPlatform,
} from "@ionic/react";
import { calendar } from 'ionicons/icons';
import CommonHeader from "../components/CommonHeader";
import { PuffLoader } from 'react-spinners';
import useLoading from '../components/useLoading';
import { getInvoicesList, getReceiptsList } from '../shared/common';
import { useHistory, Route } from "react-router";
import { formatDate, formatDateTime, formatTime, getDateTime, } from "../utils/dateTimeUtils";
import { Capacitor } from "@capacitor/core";
import { Http } from "@capacitor-community/http";
import { toast } from "react-toastify";


const Invoice: React.FC = () => {
  const [selected, setSelected] = useState<string>('paidSeg');
  const history = useHistory();
  const [items, setItems] = useState<any[]>([]);
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
  const [receiptsData, setReceiptsData] = useState<any[]>([]);

  const [paidItems, setPaidItems] = useState<any[]>([]);
  const [unpaidItems, setUnpaidItems] = useState<any[]>([]);
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [receiptsPage, setReceiptsPage] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [hasReceipts, setHasReceipts] = useState<boolean>(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const apiUrl: any = import.meta.env.VITE_API_URL;
  const filterNewData = (existingItems: any[], newItems: any[]) => {
    const existingInvoice_no = new Set(existingItems.map(item => item.invoice_no));
    return newItems.filter(item => !existingInvoice_no.has(item.invoice_no));
  };


  useEffect(() => {
    console.log("paidItems", paidItems)

  }, [paidItems[0]]);

  useEffect(() => {
    const fetchInvoice = async (page: number) => {
      const body = {
        columns: [
          "tbl_customer_invoice.id",
          "tbl_customer_invoice.invoice_no",
          "tbl_customer_invoice.payment_status",
          "tbl_customer_invoice.service",
          "tbl_customer_invoice.invoice_date",
          "tbl_customer_invoice.order_number",
          "tbl_customer_invoice.total_invoice_amount",
          "tbl_customer_invoice.invoice_file",
          "tbl_customer_invoice.created_on",
          "tbl_status.status_name"
        ],
        order_by: {
          "tbl_customer_invoice.id": "desc"
        },
        filters: {
          // "tbl_customer_invoice.invoice_no": "",
          //"tbl_customer_invoice.payment_status" : ""
        },
        pagination: {
          limit: "10",
          page: page
        }
      };
      startLoading();
      try {
        const response: any = await getInvoicesList(body);
        if (response.data.status == 200 && response.data.success) {
          setInvoiceData(response.data.data);
          console.log(response.data.data, "setInvoiceData");
          const paidData = response.data.data.filter((item: any) => item.status_name === 'Paid');
          setPaidItems(paidData);
          console.log(paidData, "paidData");
          console.log(paidData[0].invoice_file, "invoice_filepaidData");

          const unpaidData = response.data.data.filter((item: any) => item.status_name === 'Not Paid');
          setUnpaidItems(unpaidData);
          console.log(unpaidData, "unpaidData");

          //   const invoiceData = response.data.data;
          if (invoiceData.length === 0) {
            setHasMoreData(false);
          } else {
            setItems(prevData => [...prevData, ...filterNewData(prevData, invoiceData)]);

          }
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        stopLoading();
      }

    };

    fetchInvoice(currentPage);
  }, [currentPage]);



  const loadMoreData = async (event: CustomEvent<void>) => {
    setCurrentPage(prevPage => prevPage + 1);
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  useEffect(() => {
    const fetchReceipts = async (page: number) => {
      const body = {
        columns: [
          "tbl_receipts.id",
          "tbl_receipts.invoice_id",
          "tbl_receipts.receipt_no",
          "tbl_receipts.paid_amount",
          "tbl_receipts.remarks",
          "tbl_receipts.receipt_file",
          "tbl_receipts.payment_mode",
          "tbl_receipts.payment_date",
          "tbl_receipts.created_on"
        ],
        order_by: {
          "tbl_receipts.id": "desc"
        },
        filters: {
          "tbl_receipts.invoice_id": "1"
          //"tbl_receipts.receipt_no" : "ixeys31hlm"
        },
        pagination: {
          limit: "10",
          page: page
        }
      };

      startLoading();
      try {
        const response: any = await getReceiptsList(body);
        if (response.data.status == 200 && response.data.success) {

          const receiptsData = response.data.data;
          if (receiptsData.length === 0) {
            setHasMoreData(false);
          } else {
            setItems(prevData => [...prevData, ...filterNewData(prevData, receiptsData)]);
            if (receiptsData.length < body.pagination.limit) {
              setHasMoreData(false);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        stopLoading();
      }

    };

    fetchReceipts(receiptsPage);
  }, [receiptsPage]);

  // const receiptsAction = (invoice_id: any) => {  
  //     isOpen={isOpen}
  //   };


  const openModal = async (id: any) => {
    await fetchReceipts(1, id);
    // Set the selected item data
  };

  const fetchReceipts = async (page: number, id: number) => {
    const body = {
      columns: [
        "tbl_receipts.id",
        "tbl_receipts.invoice_id",
        "tbl_receipts.receipt_no",
        "tbl_receipts.paid_amount",
        "tbl_receipts.remarks",
        "tbl_receipts.receipt_file",
        "tbl_receipts.payment_mode",
        "tbl_receipts.payment_date",
        "tbl_receipts.created_on",
      ],
      order_by: {
        "tbl_receipts.id": "desc",
      },
      filters: {
        "tbl_receipts.invoice_id": id,
        //"tbl_receipts.receipt_no" : "ixeys31hlm"
      },
      pagination: {
        limit: 0,
        page: page,
      },
    };

    startLoading();
    try {
      const response: any = await getReceiptsList(body);
      console.log("Receipts List=======" + response);
      if (response.data.status == 200 && response.data.success) {
        setHasReceipts(true);
        setReceiptsData(response.data.data);
        console.log(receiptsData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  const closeModal = () => {
    setSelectedItem([]);  // Reset the selected item
  };

  const downloadFile = async (file_name: any,file : string) => {
    console.log(file);
    if (file) {
        const base64Data = `data:application/pdf;base64,${file}`;
        const currentDate = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');
        const fileName = `${file_name}-${currentDate}.pdf`;

        if (isPlatform('hybrid')) {
            // Use Capacitor Filesystem for mobile
            try {
                if (Filesystem && Directory) {
                    await checkFilesystemPermissions();

                    // Attempt to write the file
                    const result = await Filesystem.writeFile({
                        path: fileName,
                        data: base64Data,
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
                await toast.success("File downloaded successfully.");
            } catch (error) {
                console.error("Error downloading file:", error);
                await toast.error("Failed to download the file. Please try again.");
            }
        }
    } else {
        await toast.error("No proposal file found.");
    }
};
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
  // Helper function to convert a blob to base64
  const convertBlobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]); // Remove the data URL part
    };
    reader.readAsDataURL(blob);
  });
  return (
    <>
      <IonPage>
        <CommonHeader backToPath={"/"} pageTitle={"Invoice"} showIcons={true} />

        <IonContent fullscreen className="invoiceWrapp">
          <div className="backGround">
            <IonSegment
              color="primary"
              value={selected}
              onIonChange={(event) => setSelected(event.detail.value)}
            >
              <IonSegmentButton value="paidSeg">
                <IonLabel>Paid</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="unPaidSeg">
                <IonLabel>Unpaid</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="ion-padding-vertical">
              {selected === "paidSeg" && (
                <div>


                  {/* <IonSearchbar className="ion-margin-bottom" placeholder="Search for invoice no"></IonSearchbar> */}

                  <IonList lines="none">
                    {paidItems.length > 0
                      ? paidItems.map((row: any, index: number) => (
                        <IonCard  lines="none" key={row.id}>
                        <IonItem>
                          <div className="myOrderThumbnail">
                            <IonThumbnail
                              slot="start"
                              className="thumbnailIcon"
                            >
                              <IonImg src="assets/images/invoice-icon.svg"></IonImg>
                            </IonThumbnail>
                          </div>

                
                            <IonCardContent>
                              <IonText>
                                <h2>

                                  {row.order_number}{" "}
                                  <span>{row.service}</span>
                                </h2>
                              </IonText>
                              <IonRow>
                                <IonCol>
                                  <IonText className="d-flex">
                                    <p>{row.invoice_no}</p>
                                  </IonText>
                                </IonCol>

                                <IonCol>
                                  <IonText className="d-flex">
                                    <p>
                                      {/* <IonIcon icon={calendar}></IonIcon>  */}
                                      {/* {row.invoice_date} */}
                                      {`${formatDate(row.invoice_date)}`}
                                    </p>
                                  </IonText>
                                </IonCol>

                                <IonCol>
                                  <IonText className="d-flex">
                                    <p className="successfulColor">
                                      {row.status_name}
                                    </p>
                                  </IonText>
                                </IonCol>
                              </IonRow>
                              <div className="invoiceIonFlexBt ion-justify-content-between">
                                <IonText className="d-flex">
                                  <h3>
                                    {row.total_invoice_amount}{" "}
                                    <span>(AED)</span>
                                  </h3>
                                </IonText>
                                <div className="invoiceCardButtons">
                                  <IonButton
                                    shape="round"
                                    className="downloadBt"
                                    onClick={() => downloadFile(row.order_number+'_invoice',row.encrypted_invoice)}
                                  >
                                    <IonImg src="assets/images/download-icon.svg" />
                                  </IonButton>
                                  <IonButton
                                    shape="round"
                                    color="secondary"
                                    className="receiptBt"
                                    //   onClick={() => setIsOpen(true)}
                                    //   onClick={() => receiptsAction(row.id)}
                                    onClick={() => openModal(row.id)}
                                  >
                                    <IonImg src="assets/images/receipt-icon.svg" />
                                  </IonButton>
                                </div>
                              </div>
                            </IonCardContent>
                            </IonItem>
                          </IonCard>
                       
                      ))
                      : ""}
                  </IonList>

                  <IonInfiniteScroll
                    onIonInfinite={loadMoreData}
                    threshold="100px"
                    disabled={!hasMoreData}
                  >
                    <IonInfiniteScrollContent
                      loadingText="Please wait..."
                      loadingSpinner="bubbles"
                    ></IonInfiniteScrollContent>
                  </IonInfiniteScroll>
                </div>
              )}

              {selected === "unPaidSeg" && (
                <div>
                  <IonList lines="none">
                    {unpaidItems.length > 0
                      ? unpaidItems.map((row: any, index: number) => (

                        <IonCard key={index}>
                        <IonItem>
                          <div className="myOrderThumbnail">
                            <IonThumbnail
                              slot="start"
                              className="thumbnailIcon"
                            >
                              <IonImg src="assets/images/invoice-icon.svg"></IonImg>
                            </IonThumbnail>
                          </div>

                        
                            <IonCardContent>
                              <IonText>
                                <h2>
                                  {row.order_number}{" "}
                                  <span>{row.service}</span>
                                </h2>
                              </IonText>
                              <IonRow>
                                <IonCol>
                                  <IonText className="d-flex">
                                    <p>{row.invoice_no}</p>
                                  </IonText>
                                </IonCol>

                                <IonCol>
                                  <IonText className="d-flex">
                                    <p>
                                      {/* <IonIcon icon={calendar}></IonIcon>  */}
                                      {/* {row.invoice_date} */}
                                      {`${formatDate(row.invoice_date)}`}
                                    </p>
                                  </IonText>
                                </IonCol>

                                <IonCol>
                                  <IonText className="d-flex">
                                    <p
                                      className={
                                        row.status_name === "Not Paid"
                                          ? "rejectColor"
                                          : "pendingColor"
                                      }
                                    >
                                      {row.status_name}
                                    </p>
                                  </IonText>
                                </IonCol>
                              </IonRow>
                              <div className="invoiceIonFlexBt ion-justify-content-between">
                                <IonText className="d-flex">
                                  <h3>
                                    {row.total_invoice_amount}{" "}
                                    <span>(AED)</span>
                                  </h3>
                                </IonText>
                                <div className="invoiceCardButtons">
                                  <IonButton
                                    shape="round"
                                    className="downloadBt"
                                    onClick={() => downloadFile(row.order_number+'_invoice',row.encrypted_invoice)}
                                  >
                                    <IonImg src="assets/images/download-icon.svg" />
                                  </IonButton>
                                  {/* <IonButton
                                      shape="round"
                                      color="secondary"
                                      className="receiptBt"
                                      routerLink="/"
                                    >
                                      <IonImg src="assets/images/receipt-icon.svg" />
                                    </IonButton> */}
                                </div>
                              </div>
                            </IonCardContent>
                            </IonItem>
                          </IonCard>
                        
                      ))
                      : ""}
                  </IonList>

                  <IonInfiniteScroll
                    onIonInfinite={loadMoreData}
                    threshold="100px"
                    disabled={!hasMoreData}
                  >
                    <IonInfiniteScrollContent
                      loadingText="Please wait..."
                      loadingSpinner="bubbles"
                    ></IonInfiniteScrollContent>
                  </IonInfiniteScroll>
                </div>
              )}
            </div>
          </div>

          {isLoading && (
            <div className="loading-overlay">
              <PuffLoader color="#0b453a" loading={isLoading} />
              <p className="loading-text">Loading ...</p>
            </div>
          )}
        </IonContent>

        <IonModal
          className="invoiceIonModal"
          isOpen={hasReceipts}
          onDidDismiss={() => setHasReceipts(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Invoice Receipts</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setHasReceipts(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="">
            <IonList className="ion-margin-top invoiceWrapp">
              {receiptsData.length > 0
                ? receiptsData.map((row: any, index: number) => (
                  <IonCard key={index}>
                  <IonItem lines="none">
                    <div className="myOrderThumbnail">
                      <IonThumbnail slot="start" className="thumbnailIcon">
                        <IonImg src="assets/images/receipt-icon.svg"></IonImg>
                      </IonThumbnail>
                    </div>

                   
                      <IonCardContent>
                        <IonText>
                          <h2>
                            {row.receipt_no}
                          </h2>
                        </IonText>
                        <IonRow>
                          <IonCol>
                            <IonText>

                              <p>{row.payment_mode}</p>

                            </IonText>
                          </IonCol>

                          <IonCol>
                            <IonText>
                              <p>{`${formatDate(row.payment_date)}`}</p>
                            </IonText>
                          </IonCol>

                          <IonCol>
                            <IonText className="d-flex">
                              <p className="pendingColor">{row.remarks}</p>

                            </IonText>
                          </IonCol>
                        </IonRow>
                        <div className="invoiceIonFlexBt ion-justify-content-between">
                          <IonText className="d-flex">
                            <h3>
                              {row.paid_amount} <span>(AED)</span>
                            </h3>
                          </IonText>
                          <div className="invoiceCardButtons">
                            <IonButton
                              shape="round"
                              className="downloadBt"
                              onClick={()=>downloadFile(row.receipt_no+'_receipt',row.encrypted_receipt)}
                            >
                              <IonImg src="assets/images/download-icon.svg" />
                            </IonButton>
                          </div>
                        </div>
                      </IonCardContent>
                      </IonItem>
                    </IonCard>
                 

                ))
                : ""}
            </IonList>
          </IonContent>
        </IonModal>
      </IonPage>
    </>
  );
};

export default Invoice;



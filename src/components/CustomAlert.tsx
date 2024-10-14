import React from 'react';
import { IonAlert, IonButton } from '@ionic/react';

interface CustomAlertProps {
  isOpen: boolean;
  title?: string;
  message: string;
  subtxt?:string;
  buttons: any[];
  onClose?: () => void;
  className: any;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isOpen, title, message, buttons, onClose, className }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      header={title}
      message={message}
      buttons={buttons}
      onDidDismiss={onClose}
      className= {className}
    />
  );
};

export default CustomAlert;
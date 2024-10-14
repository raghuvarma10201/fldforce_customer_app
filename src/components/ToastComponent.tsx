import React, { useEffect, useRef, useState } from 'react';
import { IonToast } from '@ionic/react';
import { useAuth } from './AuthContext';
interface ToastComponentProps {
    message: string;
    duration?: number;
    isError?: boolean;
   
  }
const ToastComponent:React.FC<ToastComponentProps> = ({ message, duration = 3000, isError = false}) => {
  console.log("message", message);
  const [showToast, setShowToast] = useState(false);
 
  
 
useEffect(() => {
  setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, duration);
    return () => clearTimeout(timer);
}, [message, duration, isError]);


  return (
    <IonToast
      isOpen={showToast}
      message={message}
      duration={duration}
      color={isError ? 'danger' : 'success'}
      position="top"
      onDidDismiss={() => setShowToast(false)}
    />
  );
}

export default ToastComponent

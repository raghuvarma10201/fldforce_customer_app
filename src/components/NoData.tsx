import { IonImg, IonText } from '@ionic/react'
import React from 'react'

const NoData:React.FC<any> = () => {
  return (
    <>
        <div className="nodataFound">
        <IonImg src="./assets/images/data-not-found.gif"></IonImg>
        <IonText>No Data Found</IonText>
        </div>
    </>
  )
}

export default NoData

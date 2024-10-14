import { IonBackButton } from "@ionic/react";

const CustomBackButton: React.FC<any> = ({ onClick, path }) => (
    <div onClick={onClick}>
      <IonBackButton defaultHref={path} />
    </div>
  );

  export default CustomBackButton
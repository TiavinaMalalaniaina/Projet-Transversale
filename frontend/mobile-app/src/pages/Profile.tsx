import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

const Profile: React.FC = () => (
  <IonPage>
    <IonHeader className="my-header" >
      <IonToolbar>
        <IonTitle>Accueil</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding">
      Bienvenue sur la page Profile 🚀
    </IonContent>
  </IonPage>
);

export default Profile;

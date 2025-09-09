import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

const Services: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Accueil</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding">
      Bienvenue sur la page de Service 🚀
    </IonContent>
  </IonPage>
);

export default Services;

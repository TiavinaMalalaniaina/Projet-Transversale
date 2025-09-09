import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonChip,
  IonList,
  IonCardSubtitle,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getOrders, addOrder, Order } from "../services/orderService";
import { calendarClear, checkmarkCircle, time } from "ionicons/icons";
import "../assets/styles/Orders.css";
import { useHistory } from "react-router-dom";

const Orders: React.FC = () => {
  const history = useHistory();
  const [orders, setOrders] = useState<Order[]>([]);
  const [client, setClient] = useState("");
  const [article, setArticle] = useState("");
  const [quantite, setQuantite] = useState<number>(1);
  const [statut, setStatut] = useState<Order["statut"]>("En attente");

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleAddOrder = () => {
    if (!client || !article) return;
    const newCmd = addOrder({
      client,
      article,
      quantite,
      date: new Date().toISOString().split("T")[0],
      statut,
    });
    setOrders([...orders, newCmd]);
    // reset form
    setClient("");
    setArticle("");
    setQuantite(1);
    setStatut("En attente");
  };

  return (
    <IonPage>
      <IonHeader className="my-header" >
        <IonToolbar>
          <IonTitle>Commandes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="stat-card-grid">
          <IonCard className="stat-card" color="warning">
            <IonCardContent className="stat-content">
              <div className="stat-info">
                <IonText>
                  <h6 className="stat-title">En Attente</h6>
                  <p className="stat-value">12</p>
                </IonText>
              </div>
              <IonIcon icon={time} className="stat-icon" />
            </IonCardContent>
          </IonCard>
          <IonCard className="stat-card" color="success">
            <IonCardContent className="stat-content">
              <div className="stat-info">
                <IonText>
                  <h6 className="stat-title">Livrées</h6>
                  <p className="stat-value">23</p>
                </IonText>
              </div>
              <IonIcon icon={checkmarkCircle} className="stat-icon" />
            </IonCardContent>
          </IonCard>
        </div>
        <div className="divider" />
        <div className="status-filter">
          <IonChip color="primary">Toutes</IonChip>
          <IonChip color="primary" outline>
            En Attente
          </IonChip>
          <IonChip color="primary" outline>
            En Cours
          </IonChip>
          <IonChip color="primary" outline>
            Livrées
          </IonChip>
        </div>

        <IonList className="order-list">
          {orders.map((order, index) => (
            <IonCard className="order-card" key={index} onClick={()=>history.push('/orders/1')}>
              <IonCardHeader>
                <div className="card-header-flex">
                  <div>
                    <IonCardTitle>#CMD-100029</IonCardTitle>
                    <IonCardSubtitle>Client: John Doe</IonCardSubtitle>
                  </div>
                  <IonChip color="warning">En Attente</IonChip>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <div className="order-item">
                  <IonText color="medium">2x MacBook Pro 13</IonText>
                  <IonText>24 000.00 MGA</IonText>
                </div>
                <div className="order-item">
                  <IonText color="medium">2x MacBook Pro 13</IonText>
                  <IonText>24 000.00 MGA</IonText>
                </div>

                <div className="divider" />

                <div className="order-item order-total">
                  <IonText color="medium">
                    <IonIcon icon={calendarClear}></IonIcon>14/01/25
                  </IonText>
                  <IonText>24 000.00 MGA</IonText>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Orders;

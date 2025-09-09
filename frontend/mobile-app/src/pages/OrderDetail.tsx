import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonText,
  IonChip,
  IonCard,
  IonCardContent,
  IonList,
  IonAvatar,
} from "@ionic/react";
import "../assets/styles/Orders.css";
import { arrowBack, bag, location, people, person } from "ionicons/icons";
import { useHistory } from 'react-router-dom';

import "../assets/styles/OrderDetail.css";

const OrderDetail: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className="my-header" >
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={()=>history.push('/orders')}>
            <IonIcon icon={arrowBack}></IonIcon>
          </IonButton>
          <IonTitle>Détails commande</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="order-detail-content">
        <div className="ion-padding">
          <div className="order-detail-title">
            <IonText>
              <h3>#CMD-203972938</h3>
            </IonText>
            <div className="order-detail-status">
              <IonChip>En Attente</IonChip>
            </div>
          </div>
          <p className="subtitle">Créée le 21/01/2025 à 14:32</p>
          <IonCard className="card-ttc">
            <IonCardContent>
              <p className="value">5000 MGA</p>
              <p className="label">Total TTC</p>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="divider"></div>

        <div className="ion-padding">
          <div className="title-with-icon-header">
            <IonIcon icon={person} color="medium" />
            <h3 className="title-with-icon">Information client</h3>
          </div>
          <div className="client-info">
            <h5>John Doe</h5>
            <p>john.doe@gmail.com</p>
            <h6>Téléphone</h6>
            <p>+261 32 66 131 80</p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="ion-padding">
          <div className="title-with-icon-header">
            <IonIcon icon={location} color="medium" />
            <h3 className="title-with-icon">Addresse de livraison</h3>
          </div>
          <p className="client-delivery-address">123 Rue, Madagascar</p>
        </div>

        <div className="divider"></div>

        <div className="ion-padding">
          <div className="title-with-icon-header">
            <IonIcon icon={bag} color="medium" />
            <h3 className="title-with-icon">Articles Commandés</h3>
          </div>
        </div>
        <IonList className="product-list">
          <IonCard className="product-card">
            <IonCardContent>
              <div className="product-image">
                <IonAvatar>
                  <img
                    src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                    alt=""
                  />
                </IonAvatar>
              </div>
              <div className="product-info">
                <p>MacBook Pro 13</p>
                <p>SKU: MCBOOKPRO13</p>
                <p>Quantité: 2</p>
              </div>
              <div className="product-total">
                <div>
                  <p>25 000 MGA</p>
                  <p>x2</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
          <IonCard className="product-card">
            <IonCardContent>
              <div className="product-image">
                <IonAvatar>
                  <img
                    src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                    alt=""
                  />
                </IonAvatar>
              </div>
              <div className="product-info">
                <p>MacBook Pro 13</p>
                <p>SKU: MCBOOKPRO13</p>
                <p>Quantité: 2</p>
              </div>
              <div className="product-total">
                <div>
                  <p>25 000 MGA</p>
                  <p>x2</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
          <IonCard className="product-card">
            <IonCardContent>
              <div className="product-image">
                <IonAvatar>
                  <img
                    src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                    alt=""
                  />
                </IonAvatar>
              </div>
              <div className="product-info">
                <p>MacBook Pro 13</p>
                <p>SKU: MCBOOKPRO13</p>
                <p>Quantité: 2</p>
              </div>
              <div className="product-total">
                <div>
                  <p>25 000 MGA</p>
                  <p>x2</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default OrderDetail;

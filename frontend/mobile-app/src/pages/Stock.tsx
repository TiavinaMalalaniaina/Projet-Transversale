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
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonSearchbar,
  IonList,
  IonItemSliding,
  IonAvatar,
  IonBadge,
  IonFab,
  IonFabButton,
  IonModal,
  IonButtons,
  IonFooter,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { getStock } from "../services/stockService";
import "../assets/styles/Stock.css";
import {
  add,
  arrowBack,
  backspace,
  cartOutline,
  cube,
  ellipsisVertical,
  funnel,
  funnelOutline,
  searchOutline,
  swapVertical,
  swapVerticalOutline,
  warning,
} from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

const Stock: React.FC = () => {
  const modalAddProduct = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modalAddProduct.current?.dismiss(input.current?.value, "confirm");
  }

  function cancel() {
    modalAddProduct.current?.dismiss(input.current?.value, "cancel");
  }

  function onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === "confirm") {
      alert("Product Added");
    } else if (event.detail.role === "cancel") {
    }
  }

  return (
    <IonPage>
      <IonHeader className="my-header">
        <IonToolbar>
          <IonTitle>Stock</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="stock-content">
        <div className="stat-card-grid">
          <IonCard className="stat-card" color="primary">
            <IonCardContent className="stat-content">
              <div className="stat-info">
                <IonText>
                  <h6 className="stat-title">Total Produit</h6>
                  <p className="stat-value">1.9M</p>
                </IonText>
              </div>
              <IonIcon icon={cube} className="stat-icon" />
            </IonCardContent>
          </IonCard>
          <IonCard className="stat-card" color="warning">
            <IonCardContent className="stat-content">
              <div className="stat-info">
                <IonText>
                  <h6 className="stat-title">Stock Faible</h6>
                  <p className="stat-value">23</p>
                </IonText>
              </div>
              <IonIcon icon={warning} className="stat-icon" />
            </IonCardContent>
          </IonCard>
        </div>

        <div className="divider" />

        <IonRow className="ion-align-items-center ion-margin-bottom toolbar-filter">
          <IonCol size="12">
            <IonSearchbar
              color="medium"
              className="product-searchbar"
              inputMode="text"
              placeholder="Rechercher un produit..."
              showClearButton="focus"
            ></IonSearchbar>
          </IonCol>
          <IonCol size="6">
            <IonButton expand="block" color={"secondary"}>
              <IonIcon slot="end" icon={funnel} />
              Filtrer
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton expand="block" fill="outline" color={"secondary"}>
              <IonIcon slot="end" icon={swapVertical} />
              Trier
            </IonButton>
          </IonCol>
        </IonRow>
        <IonList className="product-list">
          <IonCard className="product-card">
            <IonCardContent>
              <div className="product-item">
                <div className="product-image">
                  <IonAvatar className="square-avatar">
                    <img
                      src="https://d3d71ba2asa5oz.cloudfront.net/12003181/images/iph8goldnew3.jpg"
                      alt=""
                    />
                  </IonAvatar>
                </div>
                <div className="product-box">
                  <div className="product-info">
                    <div className="product-label">
                      <IonText>
                        <h5>MacBook M5 apple</h5>
                        <p>Réf: MACB432387</p>
                        <p>En Stock: 45</p>
                      </IonText>
                    </div>
                    <div className="product-action">
                      <IonButton fill="clear" color="secondary" size="small">
                        <IonIcon icon={ellipsisVertical} />
                      </IonButton>
                    </div>
                  </div>
                  <div className="product-maj">
                    <IonText>Dernière MAJ: 12/05/25</IonText>
                    <IonText>50K MGA</IonText>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </IonList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton id="open-modal-add-product">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonModal
          ref={modalAddProduct}
          trigger="open-modal-add-product"
          onWillDismiss={(event) => onWillDismiss(event)}
        >
          <IonHeader className="my-header">
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modalAddProduct.current?.dismiss()}>
                  <IonIcon icon={arrowBack}></IonIcon>
                </IonButton>
              </IonButtons>
              <IonTitle>Ajouter un produit</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => cancel()}
                  fill="solid"
                  color="secondary"
                >
                  Annuler
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent fullscreen className="product-form">
            <div className="ion-padding">
              <IonText>
                <h3>Information sur le produit</h3>
              </IonText>
              <IonRow className="product-info">
                <IonCol size="12">
                  <IonInput
                    fill="outline"
                    label="Nom du produit"
                    labelPlacement="stacked"
                    ref={input}
                    type="text"
                    placeholder="Iphone 14 "
                    required
                    className="fullwidth"
                  />
                </IonCol>
                <IonCol size="12">
                  <IonInput
                    fill="outline"
                    label="Référence du produit"
                    labelPlacement="stacked"
                    ref={input}
                    type="text"
                    placeholder="IP14"
                    required
                  />
                </IonCol>

                <IonCol size="12">
                  <IonSelect
                    label="Catégorie"
                    labelPlacement="stacked"
                    fill="outline"
                  >
                    <IonSelectOption value="apple">Apple</IonSelectOption>
                    <IonSelectOption value="banana">Banana</IonSelectOption>
                    <IonSelectOption value="orange">Orange</IonSelectOption>
                  </IonSelect>
                </IonCol>
                <IonCol>
                  <IonTextarea
                    label="Description"
                    labelPlacement="stacked"
                    fill="outline"
                    placeholder="Enter text"
                    rows={4}
                  ></IonTextarea>
                </IonCol>
              </IonRow>
            </div>
            <div className="divider" />
            <div className="ion-padding">
              <IonText>
                <h3>Prix & Stock</h3>
              </IonText>
              <IonRow>
                <IonCol size="6">
                  <IonInput
                    fill="outline"
                    label="Prix d'achat"
                    labelPlacement="stacked"
                    ref={input}
                    type="number"
                    placeholder="0"
                    required
                    className="fullwidth"
                  >
                    <span slot="end">MGA</span>
                  </IonInput>
                </IonCol>
                <IonCol size="6">
                  <IonInput
                    fill="outline"
                    label="Prix de vente"
                    labelPlacement="stacked"
                    ref={input}
                    type="number"
                    placeholder="0"
                    required
                    className="fullwidth"
                  >
                    <span slot="end">MGA</span>
                  </IonInput>
                </IonCol>
                <IonCol size="4">
                  <IonInput
                    fill="outline"
                    label="Quantité"
                    labelPlacement="stacked"
                    ref={input}
                    type="number"
                    placeholder="0"
                    required
                    className="fullwidth"
                  ></IonInput>
                </IonCol>
                <IonCol size="4">
                  <IonInput
                    fill="outline"
                    label="Stock Minimum"
                    labelPlacement="stacked"
                    ref={input}
                    type="number"
                    placeholder="0"
                    required
                    className="fullwidth"
                  ></IonInput>
                </IonCol>
                <IonCol size="4">
                  <IonSelect
                    label="Unité"
                    labelPlacement="stacked"
                    fill="outline"
                  >
                    <IonSelectOption value="apple">Apple</IonSelectOption>
                    <IonSelectOption value="banana">Banana</IonSelectOption>
                    <IonSelectOption value="orange">Orange</IonSelectOption>
                  </IonSelect>
                </IonCol>
              </IonRow>
            </div>
          </IonContent>

          <IonFooter className="ion-padding">
            <IonToolbar>
              <IonButton expand="block" onClick={() => confirm()}>
                <IonIcon icon={add} slot="start"></IonIcon>
                Ajouter le produit
              </IonButton>
            </IonToolbar>
          </IonFooter>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Stock;

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
  IonText,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getOrders, Order } from "../services/orderService";
import { getStock } from "../services/stockService";
import { calculator, cart, logoEuro } from "ionicons/icons";
import "../assets/styles/Dashboard.css";
import "../assets/styles/Header.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
];

const data2 = [
  { name: "Révisions", value: 120 },
  { name: "Réparations", value: 90 },
  { name: "Vidanges", value: 60 },
  { name: "Pneumatiques", value: 30 },
];
const COLORS = ["#1976d2", "#f50057", "#ff9800", "#4caf50"];

const Dashboard: React.FC = () => {
  const [commandes, setOrders] = useState<Order[]>([]);
  const [stock, setStock] = useState<any[]>([]);

  useEffect(() => {
    setOrders(getOrders());
    setStock(getStock());
  }, []);

  const commandesEnAttente = commandes.filter(
    (c) => c.statut === "En attente"
  ).length;
  const stockFaible = stock.filter((item) => item.quantite <= 5).length; // seuil faible stock

  return (
    <IonPage>
      <IonHeader className="my-header" >
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonButton>7 jours</IonButton>
          <IonButton fill="outline">30 jours</IonButton>
          <IonButton fill="outline">1 an</IonButton>
        </div>
        <div className="divider"></div>
        <h3 className="ion-padding-inline">Métriques clés</h3>
        <div className="stat-card-grid">
          <IonCard className="stat-card" color="primary">
            <IonCardContent className="stat-content">
              <div className="stat-info">
                <IonText>
                  <h6 className="stat-title">Ventes Totales</h6>
                  <p className="stat-value">50,000 MGA</p>
                </IonText>
              </div>
              <IonIcon icon={logoEuro} className="stat-icon" />
            </IonCardContent>
          </IonCard>
          <IonCard className="stat-card" color="success">
            <IonCardContent className="stat-content">
              <div className="stat-info">
                <IonText>
                  <h6 className="stat-title">Articles vendues</h6>
                  <p className="stat-value">23</p>
                </IonText>
              </div>
              <IonIcon icon={cart} className="stat-icon" />
            </IonCardContent>
          </IonCard>
        </div>
        <div className="stat-card-grid">
          <IonCard className="stat-card" color="warning">
            <IonCardContent className="stat-content">
              <div className="stat-info">
                <IonText>
                  <h6 className="stat-title">Commandes</h6>
                  <p className="stat-value">12</p>
                </IonText>
              </div>
              <IonIcon icon={cart} className="stat-icon" />
            </IonCardContent>
          </IonCard>
          <IonCard className="stat-card" color="secondary">
            <IonCardContent className="stat-content">
              <div className="stat-info">
                <IonText>
                  <h6 className="stat-title">Panier Moyen</h6>
                  <p className="stat-value">4,000 MGA</p>
                </IonText>
              </div>
              <IonIcon icon={calculator} className="stat-icon" />
            </IonCardContent>
          </IonCard>
        </div>
        <div className="divider"></div>
        <h3 className="ion-padding-inline">Evolutions des ventes</h3>
        <div className="dashboard-graphic-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3880ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="divider"></div>
        <h3 className="ion-padding-inline">Ventes par catégorie</h3>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data2}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data2.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

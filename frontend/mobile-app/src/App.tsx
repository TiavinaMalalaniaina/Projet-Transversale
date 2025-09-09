import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

import { home, settings, person, cube, list } from "ionicons/icons";

/* Theme variables */
import "./theme/variables.css";
import Stock from "./pages/Stock";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import OrderDetail from "./pages/OrderDetail";

import "./assets/styles/Header.css";

setupIonicReact();

import { StatusBar, Style } from "@capacitor/status-bar";
import { isPlatform } from "@ionic/react";
import { useEffect } from "react";
import { SplashScreen } from "@capacitor/splash-screen";

SplashScreen.hide();

const App: React.FC = () => {
  const setupStatusBar = async () => {
    if (isPlatform("capacitor")) {
      await StatusBar.setStyle({ style: Style.Default });
      await StatusBar.setBackgroundColor({ color: "#6366f1" });
      await StatusBar.setOverlaysWebView({ overlay: false });
    }
  };

  useEffect(() => {
    setupStatusBar();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/stock" component={Stock} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/orders/:id" component={OrderDetail} />
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="dashboard" href="/dashboard">
              <IonIcon icon={home} />
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton>
            <IonTabButton tab="stock" href="/stock">
              <IonIcon icon={cube} />
              <IonLabel>Stock</IonLabel>
            </IonTabButton>
            <IonTabButton tab="orders" href="/orders">
              <IonIcon icon={list} />
              <IonLabel>Orders</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profil" href="/profil">
              <IonIcon icon={person} />
              <IonLabel>Profil</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;

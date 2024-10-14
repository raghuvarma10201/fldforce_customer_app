import {  Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider, useAuth } from './components/AuthContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './global.scss';
import Login from './pages/authentication/Login';
import LoginWithMobile from './pages/authentication/LoginWithMobile';
import OtpLogin from './pages/authentication/OtpLogin';
import Signup from './pages/authentication/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import AuthGuard from './components/AuthGuard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupforEntity from './pages/SignupforEntity';
import RequestNewTask from './pages/RequestNewTask';
import OrderDetails from './pages/ContractDetails';
import Proposals from './pages/Proposals';
import ProposalDetails from './pages/ProposalDetails';
import { useEffect, useState } from 'react';
import {registerPushHandlers} from './components/pushNotiications'
import MyContracts from './pages/MyContracts';
import ContractDetails from './pages/ContractDetails';
import ScheduledBookings from './pages/ScheduledBookings';
import Reports from './pages/Reports';
import ReportsDetails from './pages/ReportsDetails';
import MainDashboard from './pages/MainDashboard';
import Invoice from './pages/Invoice';
import { App as Appp } from '@capacitor/app';
import { Device } from '@capacitor/device';

setupIonicReact();

const App: React.FC = () => {

  const { isLoggedIn } = useAuth();
  const [appInfo, setAppInfo] = useState<any>([]);
  const [appVersion, setAppVersion] = useState<string>('');
  const token = localStorage.getItem('token');
  console.log("token", token);
  useEffect(()=>{
    registerPushHandlers();
    localStorage.setItem('app_name', 'customer');
    handlePlatform();
  },[]);

async function handlePlatform() {
    try {
        const info = await Device.getInfo();
        const platform = info.platform;
        console.log(platform);
        if (platform === 'ios' || platform === 'android') {
            console.log('Running on Device');
            const appInfos = await Appp.getInfo();
            setAppInfo(appInfos);
            setAppVersion(appInfos.version);
            
            localStorage.setItem('app_version', appInfos.version);
        }else {
            console.log('Running on Web');
            setAppInfo([]);
            localStorage.setItem('app_version', 'web');
        }
    } catch (error) {
        console.error('Error getting device info:', error);
    }finally{
        console.log(appInfo);
        console.log(appVersion);
    }
}
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/otplogin" component={OtpLogin} />
              <Route path="/loginmobile" component={LoginWithMobile} />
              <Route path="/home" component={Home} />
              <Route path="/requestnewtask" component={RequestNewTask} />
              <AuthGuard path="/mycontracts" component={MyContracts} />
             
              <AuthGuard path="/contractdetails/:id" component={ContractDetails} />
              <AuthGuard path="/proposals" component={Proposals} />
              <AuthGuard path="/proposaldetails/:id" component={ProposalDetails} />
              <AuthGuard path="/scheduled-bookings" component={ScheduledBookings} />
              <AuthGuard path="/reports" component={Reports} />            
              <AuthGuard path="/reports-details/:id" component={ReportsDetails} />
              <AuthGuard path="/invoice" component={Invoice} />

              {/* <AuthGuard path="/home" component={Home} /> */}
              <AuthGuard path="/profile" component={Profile} />          
              <AuthGuard path="/notification" component={Notification} />     
              <AuthGuard path="/dashboard" component={Dashboard} />
              <AuthGuard path="/main-dashboard" component={MainDashboard} />

              <AuthGuard path="/signupentity/:entityId" component={SignupforEntity} />
              
               {/* Redirect to dashboard if token exists, otherwise redirect to home */}
               {/* {token ? <Redirect exact from="/" to="/dashboard" /> : <Redirect exact from="/" to="/home" />} */}

               {token ? <Redirect exact from="/" to="/main-dashboard" /> : <Redirect exact from="/" to="/home" />}
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
      <ToastContainer />
    </IonApp>
    
  )
}
 

export default App;

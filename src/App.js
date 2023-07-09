import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import HospitalsTable from "./pages/Hospital/HospitalsTable";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import './assets/styles/public.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from "./pages/Login/Login";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClinicsTable from "./pages/Clinic/ClinicsTable";
import SpecialtyTable from "./pages/Speciatly/SpecialtyTable";
import PatientTable from "./pages/Patient/PatientTable";
import PatientDetails from "./pages/Patient/PatientDetails";
import DoctorTable from "./pages/Doctor/DoctorTable";
import DoctorCreate from "./pages/Doctor/DoctorCreate";
import DoctorEdit from "./pages/Doctor/DoctorEdit";
import SchedulesTable from "./pages/Schedule/ScheduleTable";
import AppointmentsTable from "./pages/Appointment/AppointmentTable";
import Revenue from "./pages/Revenue/Revenue";
import PaymentTable from "./pages/Payment/PaymentTable";
import ChatPage from "./pages/Chat/ChatPage";
import MessageProvider from "./Context/MessageContext";


function App() {
  if (localStorage.getItem("token")) {
    return (
      <div className="App">
        <ToastContainer autoClose={2000} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <Main>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/hospitals" component={HospitalsTable} />
            <Route exact path="/schedule" component={SchedulesTable} />
            <Route exact path="/clinics" component={ClinicsTable} />
            <Route exact path="/specialty" component={SpecialtyTable} />
            <Route exact path="/patient" component={PatientTable} />
            <Route exact path="/revenue" component={Revenue} />
            <Route exact path="/appointment" component={AppointmentsTable} />
            <Route exact path="/payment" component={PaymentTable} />
            <Route exact path="/patient/:id" component={PatientDetails} />
            <Route exact path="/doctor" component={DoctorTable} />
            <Route exact path="/doctor/add" component={DoctorCreate} />
            <Route exact path="/doctor/edit/:id" component={DoctorEdit} />
          </Main>
        </Switch>
        <MessageProvider>
          <Route exact path="/chat" component={ChatPage} />
          <Route exact path="/chat/:id" component={ChatPage} />
        </MessageProvider>
      </div>
    );
  } else {
    return (
      <>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Redirect from="*" to="/login" />
        </Switch>
      </>
    )
  }
}

export default App;

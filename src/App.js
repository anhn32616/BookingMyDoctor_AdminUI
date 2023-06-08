/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import HospitalsTable from "./pages/Hospital/HospitalsTable";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from "./pages/Login/Login.js";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ClinicsTable from "./pages/Clinic/ClinicsTable";
import SpecialtyTable from "./pages/Speciatly/SpecialtyTable";
import PatientTable from "./pages/Patient/PatientTable";
import PatientDetails from "./pages/Patient/PatientDetails";
import './assets/styles/public.css'
import DoctorTable from "./pages/Doctor/DoctorTable";
import DoctorCreate from "./pages/Doctor/DoctorCreate";
import DoctorEdit from "./pages/Doctor/DoctorEdit";
import SchedulesTable from "./pages/Schedule/ScheduleTable";


function App() {
  if (localStorage.getItem("token")) {
    return (
      <div className="App">
        <ToastContainer autoClose={2000}/>
        <Route exact path="/login" component={Login} />
        <Switch>
          <Main>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/hospitals" component={HospitalsTable} />
            <Route exact path="/schedules" component={SchedulesTable} />
            <Route exact path="/clinics" component={ClinicsTable} />
            <Route exact path="/specialty" component={SpecialtyTable} />
            <Route exact path="/patient" component={PatientTable} />
            <Route exact path="/patient/:id" component={PatientDetails} />
            <Route exact path="/doctor" component={DoctorTable} />
            <Route exact path="/doctor/add" component={DoctorCreate} />
            <Route exact path="/doctor/edit/:id" component={DoctorEdit} />
            {/* <Redirect from="*" to="/dashboard"/> */}
          </Main>
        </Switch>
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

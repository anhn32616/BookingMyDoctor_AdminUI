import {
  Card,
  Col,
  Row,
  Typography,
} from "antd";

import { useEffect, useState } from "react";
import statisticalApi from "../../api/statisticalApi";
import { FaClinicMedical, FaHospital, FaUserAlt, FaUserNurse } from 'react-icons/fa'
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MultiBarChart from "../../components/MultiBarChart/index";
import ProfitCompanyChart from "../../components/ProfitCompanyChart/index";


 
function Home() {
  const { Title } = Typography;

  const [countHospital, setCountHospital] = useState()
  const [countClinic, setCountClinic] = useState()
  const [countDoctor, setCountDoctor] = useState()
  const [countPatient, setCountPatient] = useState()
  const [statisticalData, setStatisticalData] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        var res = await statisticalApi.getQuantityStatistical();
        setCountClinic(res.data?.countClinic);
        setCountDoctor(res.data?.countDoctor);
        setCountPatient(res.data?.countPatient);
        setCountHospital(res.data?.countHospital);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])


  useEffect(() => {
    setIsLoading(true);
    var listTime = getStartEndDates(new Date().getFullYear())
    const promises = []
    listTime.forEach(time => {
      promises.push(statisticalApi.getStatistical(time))
    })
    Promise.all(promises).then(resultArr => {
      setStatisticalData(resultArr.map(result => result.data))
      setIsLoading(false)
      console.log(resultArr);

    })
    // eslint-disable-next-line
  }, [])

  function getStartEndDates(year) {
    const startEndDates = [];

    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(year, month - 1, 2);
      const endDate = new Date(year, month, 1);

      const startFormatted = startDate.toISOString().split('T')[0];
      const endFormatted = endDate.toISOString().split('T')[0];

      startEndDates.push({
        startTime: startFormatted,
        endTime: endFormatted
      });
    }

    return startEndDates;
  }

  const count = [
    {
      name: "Hospitals",
      count: countHospital,
      icon: <FaHospital />,
    },
    {
      name: "Clinics",
      count: countClinic,
      icon: <FaClinicMedical />,
    },
    {
      name: "Doctor",
      count: countDoctor,
      icon: <FaUserNurse />,
    },
    {
      name: "Patient",
      count: countPatient,
      icon: <FaUserAlt />,
    },
  ];




  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.name}</span>
                      <Title level={3}>
                        {c.count}
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              {statisticalData.length > 0 && (
                <MultiBarChart dataRevenue={statisticalData} />
              )}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <ProfitCompanyChart dataProfitsCompany={statisticalData} />
            </Card>
          </Col>
        </Row>



      </div>
    </>
  );
}

export default Home;

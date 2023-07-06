import {
  Card,
  Col,
  DatePicker,
  Row,
  Table,
  Typography,
} from "antd";

import { useEffect, useState } from "react";
import statisticalApi from "../../api/statisticalApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { AiFillSchedule } from 'react-icons/ai'
import { FaUserNurse } from 'react-icons/fa'
import dayjs from "dayjs";



// table code start
const columns = [
  {
    key: "doctorId",
    title: "DOCTOR ID",
    dataIndex: "doctorId",
  },
  {
    key: "fullName",
    title: "NAME",
    dataIndex: "fullName",
  },
  {
    key: "email",
    dataIndex: "email",
    title: "EMAIL",
  },
  {
    key: "totalAppointmentDone",
    dataIndex: "totalAppointmentDone",
    title: "APPOINTMENTS DONE",
  },
  {
    key: "revenue",
    dataIndex: "revenue",
    title: "REVENUE",
  },
  {
    key: "profit",
    dataIndex: "profit",
    title: "PROFIT",
  },
  {
    key: "fee",
    dataIndex: "fee",
    title: "FEE",
  },
  {
    key: "feePaid",
    dataIndex: "feePaid",
    title: "FEE PAID",
  }
];

function Revenue() {
  const { Title } = Typography;
  const [statistical, setStatistical] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTime, setSelectedTime] = useState(getStartEndDateOfMonth(getCurrentYearMonth()))
  const [dataSource, setDataSource] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  function getCurrentYearMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    return `${year}-${month}`;
  }


  useEffect(() => {
    setPage(1);
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, selectedTime])

  useEffect(() => {
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])

  const getRecords = async () => {
    setIsLoading(true);

    try {
      let paramQuery = {
        page: page - 1,
        pageSize: pageSize,
        ...selectedTime
      };
      var res = await statisticalApi.getStatistical(paramQuery)
      const data = [];
      if (res.data !== null) {
        res.data.paginationDoctorRevenues.listItem.forEach((item, index) => {
          data.push({
            key: index,
            doctorId: (
              <>{item.doctorId}</>
            ),
            fullName: (
              <>{item.fullName}</>
            ),
            phoneNumber: (
              <>{item.phoneNumber}</>
            ),
            email: (
              <>{item.email}</>
            ),
            totalAppointmentDone: (
              <>{item.totalAppointmentDone}</>
            ),
            revenue: (
              <>{item.revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
            ),
            profit: (
              <>{item.profit.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
            ),
            fee: (
              <>{item.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
            ),
            feePaid: (
              <>{item.feePaid.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
            ),
          })
        })
      }
      setDataSource(data);
      setTotalItem(res.data.paginationDoctorRevenues.totalCount);
      setIsLoading(false);
      setStatistical(res?.data)
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }



  const count = [
    {
      name: "Company Revenue",
      count: statistical?.companyRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      icon: <RiMoneyDollarCircleFill />,
    },
    {
      name: "Total Monthly Fee",
      count: statistical?.totalMonthlyFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      icon: <RiMoneyDollarCircleFill />,
    },
    {
      name: "Doctor Revenue",
      count: statistical?.doctorRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      icon: <RiMoneyDollarCircleFill />,
    },
    {
      name: "Doctor Profit",
      count: statistical?.doctorProfit.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      icon: <FaUserNurse />,
    },
    {
      name: "Total Appointment Done",
      count: statistical?.totalAppointmentDone,
      icon: <AiFillSchedule />,
    },
    {
      name: "Total Doctor Activity",
      count: statistical?.totalDoctorActivity,
      icon: <FaUserNurse />,
    },
    {
      name: "Fee Appointment",
      count: statistical?.feeAppointment.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      icon: <RiMoneyDollarCircleFill />,
    },
    {
      name: "Fee Appointment Paid",
      count: statistical?.feeAppointmentPaid.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      icon: <RiMoneyDollarCircleFill />,
    }
  ];

  function getStartEndDateOfMonth(monthString) {
    const [year, month] = monthString.split('-');
    const startDate = new Date(year, month - 1, 2);
    const endDate = new Date(year, month, 1);
  
    const startFormatted = startDate.toISOString().split('T')[0];
    const endFormatted = endDate.toISOString().split('T')[0];
  
    return {
      startTime: startFormatted,
      endTime: endFormatted
    };
  }
  const onChange = (date, dateString) => {
    let time = getStartEndDateOfMonth(dateString)
    setSelectedTime({...time})
    console.log(time);
  };



  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="layout-content">
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0',gap: '10px' }}>
          <h4>Month</h4>
          <DatePicker defaultValue={dayjs(getCurrentYearMonth(), 'YYYY-MM')} onChange={onChange} picker="month" />
        </div>
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
          <Col span={24} className="mb-24">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={{
                position: ["bottomCenter"],
                current: page,
                pageSize: pageSize,
                total: totalItem,
                showSizeChanger: true,
                pageSizeOptions: ['10', '15', '30'],
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                }
              }}
              className="ant-border-space"
            />
          </Col>
        </Row>



      </div>
    </>
  );
}

export default Revenue;

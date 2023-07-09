import {
  Row,
  Col,
  Card,
  Table,
  Modal,
  Select,
  DatePicker,
  Tag
} from "antd";


import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import doctorApi from "../../api/doctorApi";
import paymentApi from "../../api/paymentApi";
import strftime from 'strftime'

const { Option } = Select;



//styles
const HeaderTableStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 24px",
  borderBottom: "1px solid #f0f0f0",
  borderRadius: "2px 2px 0 0",
}

// table code start
const columns = [
  {
    key: "ID",
    title: "ID",
    dataIndex: "id",
    width: 50
  },
  {
    key: "datePayment",
    title: "DATE PAYMENT",
    dataIndex: "datePayment",
  },
  {
    key: "doctorName",
    dataIndex: "doctorName",
    title: "DOCTOR NAME",
  },
  {
    key: "doctorEmail",
    dataIndex: "doctorEmail",
    title: "DOCTOR EMAIL",
  },
  {
    key: "monthlyFee",
    dataIndex: "monthlyFee",
    title: "MONTHLY FEE",
  },
  {
    key: "appointmentFee",
    dataIndex: "appointmentFee",
    title: "APPOINTMENT FEE",
  },
  {
    key: "totalFee",
    dataIndex: "totalFee",
    title: "TOTAL FEE",
  },
  {
    key: "status",
    dataIndex: "status",
    title: "STATUS",
  },
  {
    key: "actions",
    dataIndex: "actions",
    title: "ACTIONS",
  },
];



function PaymentTable() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [dataDoctor, setDataDoctor] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();





  const handleSelectDateTime = (date, dateString) => {
    const parts = dateString.split('/');
    const convertedDate = parts.reverse().join('-');
    setSelectedDate(convertedDate);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        var res = await doctorApi.getAllDoctor();
        setDataDoctor(res?.data?.listItem);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData()
  }, [])


  useEffect(() => {
    setPage(1);
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, selectedDate, selectedDoctor, selectedStatus])

  useEffect(() => {
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize])


  

  const onDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        paymentApi.deletePayment(id).then((response) => {
          toast.success(response.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          getRecords(page, pageSize);

        }).catch(err => {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        });
      }
    });
  }

  const getRecords = async () => {
    try {
      setLoading(true);
      let paramQuery = {
        page: page - 1,
        pageSize: pageSize
      };
      if (selectedDate) {
        paramQuery.date = selectedDate;
      }
      if (selectedDoctor) {
        paramQuery.doctorId = selectedDoctor;
      }
      if (selectedStatus !== null && selectedStatus !== undefined) {
        paramQuery.status = selectedStatus;
      }
      let resApi = await paymentApi.getAllPayment(paramQuery);
      const data = [];
      if (resApi.data !== null) {
        resApi.data.listItem.forEach((item, index) => {
          data.push({
            key: index,
            id: (
              <>{item.id}</>
            ),
            doctorName: (
              <>{item.doctorName}</>
            ),
            doctorEmail: (
              <>{item.doctorEmail}</>
            ),
            status: (
              <>{item.status}</>
            ),
            appointmentFee: (
              <>{item.appointmentFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
            ),
            monthlyFee: (
              <>{item.monthlyFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
            ),
            totalFee: (
              <>{item.totalFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
            ),
            datePayment: (
              <>{strftime('%d/%m/%y %Hh%M',new Date(item.datePayment))}</>
            ),
            status: (
              <Tag color={item.status === true ? 'green' : 'red'} key={item.status}>
                {item.status === true ? 'Success' : 'Failure'}
              </Tag>
            ),
            actions: (
              <>
                <DeleteOutlined onClick={() => onDelete(item.id)} style={{ fontSize: 18, color: "red", marginLeft: 12, cursor: "pointer" }}></DeleteOutlined>
              </>
            )
          })
        })
      }
      console.log(data);
      setDataSource(data);
      setTotalItem(resApi.data.totalCount);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const filterDoctor = () => (
    <div className="filter-item">
      <div className="filter-item-label">DOCTOR</div>
      <Select
        showSearch
        placeholder="Select Doctor"
        allowClear
        style={{ width: 300 }}
        onChange={(value) => { setSelectedDoctor(value) }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      >
        {dataDoctor?.map((doctor) => (
          <Option value={doctor.id} key={doctor.id} label={doctor.user.fullName}>
            {doctor.user.fullName}
          </Option>
        ))}
      </Select>
    </div>
  )

  const filterDate = () => (
    <div className="filter-item">
      <div className="filter-item-label">DATE</div>
      <DatePicker
        name="startTime"
        format={'DD/MM/YYYY'}
        onChange={handleSelectDateTime}
        inputReadOnly
        inputStyle={{ color: 'red' }}
        className="searchDateTime"
        style={{
          height: "auto",
          width: "auto",
          borderRadius: "6px",
          fontSize: "14px",
          padding: "8px",
          border: "1px solid #d9d9d9"
        }}
      />
    </div>
  )
  const filterStatus = () => (
    <div className="filter-item">
      <div className="filter-item-label">STATUS</div>
      <Select
        showSearch
        placeholder="Status"
        allowClear
        style={{ width: 100 }}
        onChange={(value) => { setSelectedStatus(value) }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      >
        <Option value={true} key={true}>
          Success
        </Option>
        <Option value={false} key={false}>
          Failure
        </Option>
      </Select>
    </div>
  )





  

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
            >
              <div style={HeaderTableStyles}>
                <span style={{ fontSize: 20, fontWeight: 600 }}>List payment</span>
                <div className="filter" style={{ display: "flex", alignItems: "center" }}>
                  {filterDate()}
                  {filterDoctor()}
                  {filterStatus()}
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  loading={loading}
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

              </div>
            </Card>
          </Col>
        </Row>

      </div >
    </>
  );
}

export default PaymentTable;

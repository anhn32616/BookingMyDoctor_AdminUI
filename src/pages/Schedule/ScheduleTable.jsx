import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Select,
  DatePicker,
  Tag
} from "antd";


import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import './ScheduleTable.css';
import doctorApi from "../../api/doctorApi";
import appointmentApi from "../../api/appointmentApi";
import scheduleApi from "../../api/scheduleApi";
import FormDataSchedule from "../../components/schedule/FormDataSchedule";
import Calendar from '../../components/calendar/Calendar'
import ModalAppointmentDetail from "../../components/appointment/ModalAppointmentDetail";
import ModalSelectAppointment from "../../components/appointment/ModalSelectAppointment";
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
    key: "DOCTOR",
    title: "DOCTOR",
    dataIndex: "doctor",
  },
  {
    key: "date",
    dataIndex: "date",
    title: "DATE",
  },
  {
    key: "time",
    dataIndex: "time",
    title: "TIME",
  },
  {
    key: "cost",
    dataIndex: "cost",
    title: "PRICE",
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



function SchedulesTable() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState();
  const [isShowForm, setIsShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [dataDoctor, setDataDoctor] = useState([]);
  const [scheduleOfDoctor, setScheduleOfDoctor] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
  const [appointmentDetail, setAppointmentDetail] = useState();
  const [visibleModalAppointmentDetail, setVisibleModalAppointmentDetail] = useState(false);
  const [visibleModalSelectAppointment, setVisibleModalSelectAppointment] = useState(false);
  const [listAppointment, setListAppointment] = useState([]);




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

  useEffect(() => {
    getScheduleOfDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDoctor, dataSource])

  const getScheduleOfDoctor = async () => {
    try {
      var res = await scheduleApi.getAllSchedule({ doctorId: selectedDoctor });
      var listSchedule = [];
      res?.data?.listItem?.forEach(item => {
        listSchedule.push(
          {
            scheduleId: item?.id,
            title: item?.status,
            start: item.startTime,
            end: item.endTime,
            status: item?.status
          });
      })
      setScheduleOfDoctor(listSchedule);
    } catch (error) {
      console.log(error.message);
    }
  }

  const onDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        scheduleApi.deleteSchedule(id).then((response) => {
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
      if (selectedStatus) {
        paramQuery.status = selectedStatus;
      }
      let resApi = await scheduleApi.getAllSchedule(paramQuery);
      const data = [];
      if (resApi.data !== null) {
        resApi.data.listItem.forEach((item, index) => {
          data.push({
            key: index,
            id: (
              <>{item.id}</>
            ),
            date: (
              <>{strftime('%d/%m/%y',new Date(item.startTime))}</>
            ),
            time: (
              <>{strftime('%H: %M',new Date(item.startTime))} - {strftime('%H: %M',new Date(item.endTime))}</>
            ),
            doctor: (
              <>{item.doctorName}</>
            ),
            cost: (
              <>{item.cost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
            ),
            status: (
              <Tag color={item.status === "Available" ? 'green' :
                item.status === "Pending" ? 'geekblue' :
                  item.status === "Booked" ? 'volcano' : 'default'} key={item.status}>
                {item.status.toUpperCase()}
              </Tag>
            ),
            actions: (
              <>
                <EditTwoTone
                  onClick={() => {
                    setIsEditing(true);
                    setItem({ ...item });
                    setIsShowForm(true);
                  }} style={{ fontSize: 18, cursor: "pointer" }}></EditTwoTone>
                <DeleteOutlined onClick={() => onDelete(item.id)} style={{ fontSize: 18, color: "red", marginLeft: 12, cursor: "pointer" }}></DeleteOutlined>
              </>
            )
          })
        })
      }
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
        <Option value={"Available"} key={"Available"}>
          Available
        </Option>
        <Option value={"Pending"} key={"Pending"}>
          Pending
        </Option>
        <Option value={"Booked"} key={"Booked"}>
          Booked
        </Option>
        <Option value={"Expired"} key={"Expired"}>
          Expired
        </Option>
      </Select>
    </div>
  )

  const handleShowAppointmentDetail = async (scheduleId) => {
    var res = await appointmentApi.getAllAppointment({ scheduleId: scheduleId });
    var appointment = res?.data?.listItem?.find(a => a.status !== 'Cancel');
    setAppointmentDetail(appointment);
    setVisibleModalAppointmentDetail(true);
  }

  const handleShowSelectPatient = async (scheduleId) => {
    var res = await appointmentApi.getAllAppointment({ scheduleId: scheduleId, status: "Pending" });
    setListAppointment(res?.data?.listItem);
    setVisibleModalSelectAppointment(true);
  }

  const handleClickEvent = async (scheduleId) => {
    try {
      var res = await scheduleApi.getDetailSchedule(scheduleId);
      switch (res?.data?.status) {
        case "Available":
          setIsEditing(true);
          setItem({ ...res.data });
          setIsShowForm(true);
          break;
        case "Pending":
          handleShowSelectPatient(scheduleId);
          break;
        case "Booked":
          handleShowAppointmentDetail(scheduleId);
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }


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
                <span style={{ fontSize: 20, fontWeight: 600 }}>List schedule</span>
                <div className="filter" style={{ display: "flex", alignItems: "center" }}>
                  {filterDate()}
                  {filterDoctor()}
                  {filterStatus()}
                  <div className="filter-item">
                    <div className="filter-item-label hidden">Add</div>
                    <Button
                      onClick={() => {
                        setItem(null)
                        setIsAdding(true);
                        setIsShowForm(true);
                      }}
                      style={{ background: "#1890ff", color: "#ffffff" }}>
                      <i className="fa-solid fa-plus" style={{ marginRight: 6 }}></i>
                      Add</Button>
                  </div>
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
                {/* form edit add */}
                <FormDataSchedule getRecords={getRecords} item={item}
                  setIsShowForm={setIsShowForm} setIsAdding={setIsAdding} setIsEditing={setIsEditing}
                  isAdding={isAdding} isEditing={isEditing} isShowForm={isShowForm} />
              </div>
            </Card>
          </Col>
        </Row>


        {/* Calendar schedules of doctor */}

        {selectedDoctor && <Row>
          <Col span={24}>
            <Card>
              <Calendar events={scheduleOfDoctor} handleClickEvent={handleClickEvent} />
            </Card>
          </Col>
        </Row>}
        {appointmentDetail && <ModalAppointmentDetail appointment={appointmentDetail} modalVisible={visibleModalAppointmentDetail} setModalVisible={setVisibleModalAppointmentDetail} />}
        {listAppointment && <ModalSelectAppointment listAppointment={listAppointment} modalVisible={visibleModalSelectAppointment} setModalVisible={setVisibleModalSelectAppointment} />}
      </div >
    </>
  );
}

export default SchedulesTable;

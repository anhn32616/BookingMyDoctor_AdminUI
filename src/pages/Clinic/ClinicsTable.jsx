
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Space,
} from "antd";

import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";


import { useEffect, useState } from "react";

import clinicApi from "../../api/clinicApi";
import FormDataClinic from "../../components/clinic/FormDataClinic";
import { toast } from 'react-toastify'
import TextboxSearch from "../../components/TextboxSearch/TextboxSearch";


// table code start
const columns = [
  {
    key: "ID",
    title: "ID",
    dataIndex: "id",
    width: 50
  },
  {
    key: "image",
    title: "",
    dataIndex: "imageUrl",
    width: 200
  },
  {
    key: "name",
    dataIndex: "name",
    title: "NAME",
  },
  {
    key: "address",
    dataIndex: "address",
    title: "ADDRESS",
  },
  {
    key: "city",
    dataIndex: "city",
    title: "CITY",
  },
  {
    key: "actions",
    dataIndex: "actions",
    title: "ACTIONS",
  },
];



function ClinicsTable() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState();
  const [isShowForm, setIsShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [key, setKey] = useState('')





  useEffect(() => {
    setPage(1);
  }, [pageSize, key])

  useEffect(() => {
    getRecords();
    // eslint-disable-next-line
  }, [page, pageSize, key])



  const onDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        clinicApi.deleteClinic(id).then((response) => {
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
      const param = { page: page - 1, pageSize: pageSize };
      if (key) param.keyword = key;
      let resApi = await clinicApi.getAllClinic(param);
      const data = [];
      if (resApi.data !== null) {
        resApi.data.listItem.forEach((item, index) => {
          console.log(item);
          data.push({
            key: index,
            imageUrl: (
              <img src={item.imageUrl} alt="clinic" style={{ width: 200, height: 100, objectFit: 'cover' }} />
            ),
            id: (
              <>{item.id}</>
            ),
            name: (
              <>{item.name}</>
            ),
            address: (
              <>{item.address}, {item.ward}, {item.district}</>
            ),
            city: (
              <>{item.city}</>
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

  const handleSearch = (value) => {
    setKey(value);
  }



  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="List Clinic"
              extra={
                <>
                  <Space direction="horizontal">
                    <TextboxSearch handleSearch={handleSearch} />
                    <Button
                      onClick={() => {
                        setItem(null)
                        setIsAdding(true);
                        setIsShowForm(true);
                      }}
                      style={{ background: "#1890ff", color: "#ffffff" }}>
                      <i className="fa-solid fa-plus" style={{ marginRight: 6 }}></i>
                      Add
                    </Button>
                  </Space>
                </>
              }
            >
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
                    pageSizeOptions: ['5', '10', '15'],
                    onChange: (page, pageSize) => {
                      setPage(page);
                      setPageSize(pageSize);
                    }
                  }}
                  className="ant-border-space"
                />
                {/* form edit add */}
                <FormDataClinic getRecords={getRecords} item={item}
                  setIsShowForm={setIsShowForm} setIsAdding={setIsAdding} setIsEditing={setIsEditing}
                  isAdding={isAdding} isEditing={isEditing} isShowForm={isShowForm} />
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default ClinicsTable;

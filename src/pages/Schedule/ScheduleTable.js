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
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
} from "antd";

import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";


import { useEffect, useState } from "react";

import hospitalApi from "../../api/hospitalApi";
import FormDataHospital from "../../components/hospital/FormDataHospital";
import { toast } from 'react-toastify'






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
    key: "image",
    title: "",
    dataIndex: "imageUrl",
    width: 200
  },
  {
    key: "NAME",
    dataIndex: "name",
    title: "NAME",
  },
  {
    key: "ADDRESS",
    dataIndex: "address",
    title: "ADDRESS",
  },
  {
    key: "CITY",
    dataIndex: "city",
    title: "CITY",
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
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState();
  const [isShowForm, setIsShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);



  useEffect(() => {
    setPage(1);
  }, [pageSize])

  useEffect(() => {
    getRecords();
  }, [page, pageSize])



  const onDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        hospitalApi.deleteHospital(id).then((response) => {
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
      let resApi = await hospitalApi.getAllHospital({
        page: page - 1,
        pageSize: pageSize
      }
      );
      const data = [];
      if (resApi.data != null) {
        resApi.data.listItem.map((item, index) => {
          console.log(item);
          data.push({
            key: index,
            imageUrl: (
              <img src={item.imageUrl} alt="image specialty" style={{width: 200, height: 100, objectFit: 'cover'}}/>
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
                <FormDataHospital getRecords={getRecords} item={item}
                  setIsShowForm={setIsShowForm} setIsAdding={setIsAdding} setIsEditing={setIsEditing}
                  isAdding={isAdding} isEditing={isEditing} isShowForm={isShowForm}/>
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default SchedulesTable;

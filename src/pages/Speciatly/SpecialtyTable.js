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

import specialtyApi from "../../api/specialtyApi";
import FormDataSpecialty from "../../components/specialty/FormDataSpecialty";
import { toast } from 'react-toastify'
import CardSpecialty from "../../components/specialty/CardSpecialty.js";






//styles
const HeaderTableStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 24px",
  borderBottom: "1px solid #f0f0f0",
  borderRadius: "2px 2px 0 0",
}




function SpecialtyTable() {
  const [item, setItem] = useState();
  const [isShowForm, setIsShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [listSpecialty, setListSpecialty] = useState([]);


  const onDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        specialtyApi.deleteSpecialty(id).then((response) => {
          toast.success(response.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          getRecords();

        }).catch(err => {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        });
      }
    });
  }

  const handleEdit = (item) => {
    setIsEditing(true);
    setItem({ ...item });
    setIsShowForm(true);
  }

  useEffect(() => {
    getRecords();
  },[])

  const getRecords = async () => {
    try {
      // setLoading(true);
      let resApi = await specialtyApi.getAllSpecialty();
      console.log(resApi.data);
      if (resApi.data != null) {
        setListSpecialty(resApi.data.listItem);
      }
      // setLoading(false);
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
                <span style={{ fontSize: 20, fontWeight: 600 }}>List specialty</span>
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
            </Card>
          </Col>

        </Row>
      </div >
      <div className="table-responsive" style={{ margin: 15, overflowX: 'hidden' }}>
        <Row gutter={[12, 12]}>
          {listSpecialty.map((item, index) =>
          (<Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
            <CardSpecialty item={item} handleEdit={handleEdit} handleDelete={onDelete} />
          </Col>)
          )}
        </Row>
      </div>
      {/* form edit add */}
      <FormDataSpecialty getRecords={getRecords} item={item}
        setIsShowForm={setIsShowForm} setIsAdding={setIsAdding} setIsEditing={setIsEditing}
        isAdding={isAdding} isEditing={isEditing} isShowForm={isShowForm} />
    </>
  );
}

export default SpecialtyTable;

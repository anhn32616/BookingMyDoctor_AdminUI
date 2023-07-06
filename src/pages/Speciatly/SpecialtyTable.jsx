import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Space,
} from "antd";



import { useEffect, useState } from "react";

import specialtyApi from "../../api/specialtyApi";
import FormDataSpecialty from "../../components/specialty/FormDataSpecialty";
import { toast } from 'react-toastify'
import CardSpecialty from "../../components/specialty/CardSpecialty";
import TextboxSearch from "../../components/TextboxSearch/TextboxSearch";






function SpecialtyTable() {
  const [item, setItem] = useState();
  const [isShowForm, setIsShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [listSpecialty, setListSpecialty] = useState([]);
  const [key, setKey] = useState('')


  useEffect(() => {
    getRecords();
    // eslint-disable-next-line
  }, [key])


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

  const getRecords = async () => {
    try {
      // setLoading(true);
      const param = {};
      if (key) param.keyword = key;
      let resApi = await specialtyApi.getAllSpecialty(param);
      console.log(resApi.data);
      if (resApi.data !== null) {
        setListSpecialty(resApi.data.listItem);
      }
      // setLoading(false);
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
          <Col span={24} xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="List Specialty"
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

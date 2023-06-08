import {
    Row,
    Col,
    Card,
    Table,
    Button,
    Avatar,
    Typography,
    Popconfirm,
    Space,
} from "antd";

import { DeleteOutlined, EditTwoTone, UserAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import doctorApi from "../../api/doctorApi";

const { Title } = Typography;


// table code start
const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "NAME",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "CITY",
        key: "city",
        dataIndex: "city",
    },
    {
        title: "CLINIC",
        key: "clinic",
        dataIndex: "clinic",
    },
    {
        title: "SPECIATLY",
        key: "specialty",
        dataIndex: "specialty",
    },
    {
        title: "VIOLATION",
        key: "violation",
        dataIndex: "violation",
    },
    {
        title: "STATUS",
        key: "status",
        dataIndex: "status",
    },
    {
        title: "ACTIONS",
        key: "function",
        dataIndex: "function",
    },
];

//Show list user in database 
function DoctorTable() {
    const history = useHistory()
    const [key, setKey] = useState('')
    const [loading, setLoading] = useState(true)
    const [users, setUser] = useState()
    const [totalItem, setTotalItem] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [pageSize])

    useEffect(() => {
        fecthData();
    }, [page, pageSize])

    //Get data when page load 
    const fecthData = async () => {
        try {
            setLoading(true)
            var res = await doctorApi.getAllDoctor({page: page -1, pageSize: pageSize});
            console.log(res.data);
            const data = []
            //Convert records to rows for display 
            res.data?.listItem.map((item, index) => (
                data.push({
                    key: index,
                    id: (
                        <>
                            <div className="ant-employed">
                                <span>{item?.id}</span>
                            </div>
                        </>
                    ),
                    name: (
                        <>
                            <Avatar.Group>
                                <Avatar
                                    className="shape-avatar"
                                    shape="square"
                                    size={60}
                                    src={item?.user.image}
                                ></Avatar>
                                {console.log(item)}
                                <div className="avatar-info">
                                    <Title level={5}>{item?.user.fullName}</Title>
                                    <p>{item?.user.email}</p>
                                </div>
                            </Avatar.Group>{" "}
                        </>
                    ),

                    status: (
                        <>
                            {
                                item?.user.isDelete ?
                                    <Button type="danger" className="tag-primary">
                                        DENINE
                                    </Button>
                                    :
                                    <Button type="primary" className="tag-primary">
                                        ACTIVE
                                    </Button>
                            }
                        </>
                    ),
                    specialty: (
                        <>
                            <div className="ant-employed">
                                <span>{item?.speciatly.name}</span>
                            </div>
                        </>
                    ),
                    city: (
                        <>
                            <div className="ant-employed">
                                <span>{item?.user.city}</span>
                                {/* <div dangerouslySetInnerHTML={{ __html: item.description }}></div> */}
                            </div>
                        </>
                    ),
                    violation: (
                        <>
                            <div className="ant-employed">
                                <span style={{marginLeft: 25}}>{item?.user.countViolation}</span>
                            </div>
                        </>
                    ),
                    clinic: (
                        <>
                            <div className="ant-employed">
                                <span>{item?.clinic.name}</span>
                            </div>
                        </>
                    ),
                    function: (
                        <>
                            <EditTwoTone
                                style={{ fontSize: 18, color: "blue", marginLeft: 12, cursor: "pointer" }}
                                onClick={() => history.push("doctor/edit/" + item?.id)}
                            />
                            <Popconfirm title="Are you sure to delete this doctor?"
                                onConfirm={() => handleDeleteUser(item?.id)}>
                                <DeleteOutlined
                                    style={{ fontSize: 18, color: "red", marginLeft: 12, cursor: "pointer" }}
                                />
                            </Popconfirm>
                        </>
                    )
                })
            ));

            setUser(data);
            setTotalItem(res.data?.totalCount)
            setLoading(false);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }


    }

    //Request API to disable user 
    const handleDeleteUser = async (id) => {
        try {
            var res = await doctorApi.deleteDoctor(id);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              })
            fecthData();
        } catch (err) {
            toast.error(err.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }

    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    //Show form create new user 
    const showModal = () => {
        setIsModalOpen(true);
    };


    //Request API to search user by name 
    const handleSearch = () => {
        fecthData(page, 10, key)
    }

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="List Doctor"
                            extra={
                                <>
                                    <Space direction="horizontal">
                                        <div className="search-container">
                                            <div className="search-input-container">
                                                <input type="text" className="search-input" placeholder="Search" onChange={(e) => setKey(e.target.value)} />
                                            </div>
                                            <div className="search-button-container">
                                                <button className="search-button" onClick={handleSearch}>
                                                    <i className="fas fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                        <Button type="primary" onClick={() => window.location = '/doctor/add'}>
                                            <UserAddOutlined style={{ fontSize: 18 }} />
                                            Add
                                        </Button>
                                    </Space>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={users}
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
                                    loading={loading}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default DoctorTable;

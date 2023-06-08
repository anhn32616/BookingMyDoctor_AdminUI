import React from 'react';
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { Avatar, Card } from 'antd';
const { Meta } = Card;

function CardSpecialty(props) {
    return (
        <div>
            <Card
                style={{
                    paddingTop: 13
                }}
                cover={
                    <img
                        alt="example"
                        style={{height: 200, width: 200, margin: 'auto', marginTop: 10}}
                        src={props.item.imageUrl}
                    />
                }
                actions={[
                    <EditTwoTone key="edit" onClick={() => props.handleEdit(props.item)}/>,
                    <DeleteOutlined style={{color: 'red'}} key="delete" onClick={() => props.handleDelete(props.item.id)}/>
                ]}
                bordered={false}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 8 }}
            >
                <h4 style={{textAlign: 'center'}}>{props.item.name}</h4>
            </Card>
        </div>
    );
}

export default CardSpecialty;
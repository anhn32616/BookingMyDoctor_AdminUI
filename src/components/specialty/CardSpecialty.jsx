import React from 'react';
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { Card } from 'antd';

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
                        style={{height: 100, width: 100, margin: 'auto', marginTop: 10}}
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
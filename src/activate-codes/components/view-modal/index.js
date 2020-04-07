import React from 'react';

let { Row, Col, Modal,Tag } = antd;

import './style.scss';

export default class ViewModal extends React.Component {
    constructor(props){
        super(props)
    }
    okHandle(){
        this.props.viewActions.setShow(false);
    }
    cancelHandle(){
        this.props.viewActions.setShow(false);
    }
    render(){
        return (
            <Modal
                title="Activate Code Detail"
                width="800px"
                visible={this.props.show}
                onOk={this.okHandle.bind(this)}
                onCancel={this.cancelHandle.bind(this)}
                confirmLoading={this.props.view_modal_loading}
                >
                {this.generateContent()}
            </Modal>
        );
    }
    generateContent(){
        let d = this.props.codeData.toJS();
        //console.log(d.permissionNames)
        return(
            <div className="acti_code_view_detail">
                <Row gutter={15}>
                    <Col span={6} className="view_head">id</Col>
                    <Col span={6}>{d.id}</Col>
                    <Col span={6} className="view_head">code</Col>
                    <Col span={6}>{d.hasPermission?d.code:d.code_name}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">Permission code</Col>
                    <Col span={18}>{d.permission_code}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">Permissions</Col>
                    <Col span={18}>{d.permissionNames?d.permissionNames.map(item=>{
                        return(<Tag>{item}</Tag>);
                    }):''}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">Code Expire</Col>
                    <Col span={6}>{d.code_expire_str}</Col>
                    <Col span={6} className="view_head">Feature Expire</Col>
                    <Col span={6}>{d.feature_expire_str==''?0:d.feature_expire_str + ' days'}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">Feature Expire Date</Col>
                    <Col span={6}>{d.feature_expire_date_str}</Col>
                    <Col span={6} className="view_head">Is Trial</Col>
                    <Col span={6}>{d.is_trial_str}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">Receiver Max</Col>
                    <Col span={6}>{d.receiver_max}</Col>
                    <Col span={6} className="view_head">Sender Max</Col>
                    <Col span={6}>{d.sender_max}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">Used(Receiver/Sender)</Col>
                    <Col span={6}>{`${d.receiver_used}/${d.sender_used}`}</Col>
                    <Col span={6} className="view_head">Status</Col>
                    <Col span={6}>{d.status_name}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">Note</Col>
                    <Col span={18}>{d.note}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">created by</Col>
                    <Col span={6}>{d.created_by_name}</Col>
                    <Col span={6} className="view_head">created at</Col>
                    <Col span={6}>{d.created_str}</Col>
                </Row>
                <Row gutter={15}>
                    <Col span={6} className="view_head">updated by</Col>
                    <Col span={6}>{d.updated_by_name}</Col>
                    <Col span={6} className="view_head">updated at</Col>
                    <Col span={6}>{d.updated_str}</Col>
                </Row>
            </div>
        );
    }
}

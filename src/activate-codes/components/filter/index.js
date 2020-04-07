import React from 'react';

let {Form, Row, Col, Button,Tag} = antd;
const CheckableTag = Tag.CheckableTag;

import DeviceInput from '../device-input';

import './style.scss';

export default class Filter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return(
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
                >
                <Row gutter={24}>
                  
                </Row>
                <div className="bline"></div>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" 
                            onClick={e=>{
                                this.props.filterSearchHandle()
                            }}>Search</Button>
                        <Button style={{ marginLeft: 8 }} 
                            onClick={e=>{
                                this.filterReset();
                            }}
                            >Clear</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
    filterReset(){
        this.props.appActions.setSearchFilter({});
        this.props.filterResetHandle();
        this.refs.device.setValue([]);
    }
}

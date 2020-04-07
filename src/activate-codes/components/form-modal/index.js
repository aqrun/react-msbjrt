import React from 'react';
import moment from 'moment';

import * as modalTypes from '../../constants/modal-constants';
let { Table,Icon,Dropdown,Menu, Input,  Button, Badge, Modal, Form, Select, 
    Switch, Spin,Cascader,DatePicker, InputNumber  } = antd;
let FormItem = Form.Item;
let Option = Select.Option;
const Group = Input.Group;
const { TextArea } = Input;

import { initialModelData } from '../../reducers/modal-reducer'
import * as appServices from '../../services/app-services';
import DeviceInput from '../device-input';

import './style.scss';
export class FormModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            permissionStatus: '',
            permissionHelp: '',
            permissionError: false,
            deviceStatus: '',
            deviceHelp: '',
            codeStatus: '',
            codeHelp: '',
            codeNum: '1',
        }
    }
    okHandle(){
        let { form, modelData } = this.props;
        if(modelData.get('permission_id') == ''){
            this.setState({permissionStatus: 'error',permissionHelp: 'Permission is required',});
            return;
        }else{
            this.setState({permissionStatus: '',permissionHelp: '',});
            form.setFieldsValue({permission_id: modelData.get('permission_id')});
        }
        if(modelData.get('code')==''){
            this.setState({codeStatus:'error', codeHelp:'Code is required'})
            return;
        }else{
            form.setFieldsValue({code: modelData.get('code')});
            this.setState({codeStatus:'', codeHelp:''})
        }
        
        //console.log(this.props.productModal);
        if(this.props.modalData.get('type') == 'add'){
            this.props.modalActions.fetchAddModelData(modelData.toJS());
        }else{
            this.props.modalActions.fetchUpdateModelData(modelData.toJS());
        }
        this.resetValue();
        //this.props.modalActions.setPermissionOptions([]);
    }
    componentDidMount() {
        window.mform = this.props.form;
        window.bb = this;
        $('body').on('form_modal_set_value', this.setFormData.bind(this))
        $('body').on('set_code_data', (e,data)=>{this.setValue({code: data})})
    }
    setFormData(e, data){
        //console.log(data.code_expire, data.feature_expire_date);
        let params = {
            permission_id: data.permission_id,
            code: data.code,
            code_expire: this.generateMoment(data.code_expire),
            feature_expire: data.feature_expire,
            feature_expire_date: this.generateMoment(data.feature_expire_date),
            sender_max: data.sender_max,
            receiver_max: data.receiver_max,
            is_trial: data.is_trial=='1'?true:false,
            status: data.status,
            note: data.note,
        };
        this.setValue(params);
    }
    setValue(params){
        this.props.form.setFieldsValue(params);
    }
    resetValue(){
        let data = {
            permission_id: '',
            code: [],
            code_expire: '',
            feature_expire: '0',
            feature_expire_date: '',
            sender_max: '1',
            receiver_max: '1',
            is_trial: false,
            status: '10',
            note: '',
        };
        this.props.form.setFieldsValue(data)
    }
    render(){
        let {modalData, versionData} = this.props;
        return (
            <Modal
                title={modalData.get('name')}
                width="800px"
                visible={modalData.get('show')? true: false}
                destroyOnClose={false}
                maskClosable={false}
                onOk={()=>this.okHandle()}
                onCancel={() => {
                    this.props.modalActions.setShow(false);
                    this.resetValue();
                    //this.props.modalActions.setPermissionOptions([]);
                }}
                confirmLoading={modalData.get('loading')?true:false}
                >
                {this.generateFormItem()}
            </Modal>
        );
    }
    setModelData(params){
        //console.log(params);
        this.props.modalActions.setModelData(Object.assign({}, this.props.modelData.toJS(), params))
    }
    generateFormItem(){
        let { form, modelData, modalData } = this.props;
        const setModelData = this.props.modalActions.setModelData;
        let btnStyle = {marginLeft:'5px'};
        if(modalData.get('type')==modalTypes.TYPE_EDIT){
            btnStyle = {marginLeft:'5px', display:'none'};
        }
        //console.log('modal_product', product.toJS())

        return(
            <div>
                <FormItem labelCol={{span:5}} 
                    wrapperCol={{span:15}} label="Feature"
                    validateStatus={this.state.permissionStatus}
                    help={this.state.permissionHelp}
                    >
                    {form.getFieldDecorator('permission_id', {
                        rules: [{
                            required: true, message: 'Permissions required!'
                        }],
                        initialValue: modelData.get('permission_id')
                    })(
                        <Select
                            mode="single"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={value=> { 
                                this.setModelData({permission_id:value});
                            }}
                            >
                            <Option value="">--Choose permission--</Option>
                            {this.generatePermissionOptions()}
                        </Select>
                    )}
                </FormItem>

                
                <FormItem labelCol={{span:5}} wrapperCol={{span:15}} label="Code Expire"
                    >
                    {form.getFieldDecorator('code_expire', {
                        initialValue: this.generateMoment(modelData.get('code_expire')),
                    })(
                        <DatePicker placeholder="Code expire"
                            onChange={(date, dateStr)=>{this.setModelData({code_expire:dateStr})}}
                            />
                    )}
                </FormItem>
                <FormItem labelCol={{span:5}} wrapperCol={{span:15}} label="Feature Expire"
                    >
                    {form.getFieldDecorator('feature_expire', {
                        initialValue: modelData.get('feature_expire'),
                    })(
                        <Select placeholder="feature expire" style={{width:'150px'}}
                            onChange={value=>this.setModelData({feature_expire:value})}
                            >
                            <Option value="0">0</Option>
                            <Option value="15">15 days</Option>
                            <Option value="30">30 days</Option>
                            <Option value="60">60 days</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem labelCol={{span:5}} wrapperCol={{span:15}} label="Feature Expire Date"
                    >
                    {form.getFieldDecorator('feature_expire_date', {
                        initialValue: this.generateMoment(modelData.get('feature_expire_date')),
                    })(
                        <DatePicker placeholder="Feature Expire Date"
                            onChange={(date, dateStr)=>{this.setModelData({feature_expire_date:dateStr})}}
                            />
                    )}
                </FormItem>
                <FormItem labelCol={{span:5}}
                    wrapperCol={{span:4}} label="Receiver Max"
                    >
                    {form.getFieldDecorator('receiver_max', {
                        initialValue:modelData.get('receiver_max'),
                    })(
                        <InputNumber min={0}
                            onChange={val=>this.setModelData({receiver_max: val})}
                            />
                    )}
                </FormItem>
                <FormItem labelCol={{span:5}}
                    wrapperCol={{span:4}} label="Sender Max"
                    >
                    {form.getFieldDecorator('sender_max', {
                        initialValue:modelData.get('sender_max'),
                    })(
                        <InputNumber min={0}
                            onChange={val=>this.setModelData({sender_max: val})}
                            />
                    )}
                </FormItem>
                <FormItem labelCol={{span:5}}
                    wrapperCol={{span:4}} label="Is Trial"
                    >
                    {form.getFieldDecorator('is_trial', {
                        initialValue:modelData.get('is_trial')=='1'?true:false,
                        valuePropName: 'checked',
                    })(
                        <Switch onChange={checked=>this.setModelData({is_trial: checked?'1':'0'})} />,
                    )}
                </FormItem>
                {this.generateCodeField()}
                
                <FormItem labelCol={{span:5}} wrapperCol={{span:15}} label="Status"
                    >
                    {form.getFieldDecorator('status', {
                        initialValue: modelData.get('status'),
                    })(
                        <Select placeholder="Status" style={{width:'150px'}}
                            onChange={value=>this.setModelData({status:value})}
                            >
                            <Option value="0">Disable</Option>
                            <Option value="10">Active</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem labelCol={{span:5}} wrapperCol={{span:15}} label="Note"
                    >
                    {form.getFieldDecorator('note', {
                        initialValue: modelData.get('note'),
                    })(
                        <TextArea rows={2} 
                            onChange={e=>{this.setModelData({note:e.target.value})}}
                        />
                    )}
                </FormItem>
            </div>
        );
    }
    generateCodeField(){
        let { form, modelData, modalData } = this.props;
        const setModelData = this.props.modalActions.setModelData;
        let bstyle = {display:'flex'};
        if(modalData.get('type')==modalTypes.TYPE_EDIT){
            bstyle = {display:'none'};
        }
        let html = '';
        html = (
            <FormItem labelCol={{span:5}}
                wrapperCol={{span:15}} label="Codes"
                validateStatus={this.state.codeStatus}
                help={this.state.codeHelp}
                >
                <div className="ipt_codew">
                    <div style={bstyle}>
                        <Select value={this.state.codeNum}
                            onChange={value=>this.setState({codeNum: value})}
                            >
                            <Option value="1">1</Option>
                            <Option value="5">5</Option>
                            <Option value="10">10</Option>
                            <Option value="20">20</Option>
                        </Select>
                        <Button 
                            icon="reload"
                            loading={this.props.generate_code_loading}
                            onClick={this.generateCodeHandle.bind(this)}
                            style={{marginLeft:'5px'}}>Generate Code</Button>
                    </div>
                    {form.getFieldDecorator('code', {
                            rules: [{
                                required: true, message: 'code required!'
                            }],
                            initialValue: modelData.get('code'),
                        })(
                            <TextArea disabled={true} rows={2}
                                style={{marginTop:'10px', cursor:'text'}}
                                onChange={e=>this.setState({codeStatus:'', codeHelp:''})}/>
                    )}
                </div>
            </FormItem>
        );
        return html;
    }
    generateMoment(str){
        return str==''?'':moment(str,'YYYY-MM-DD');
    }
    generateCodeHandle(){
        this.props.modalActions.fetchCode(this.state.codeNum);
        this.setState({codeStatus:'', codeHelp:''})
    }
    generateGroupOptions(){
        let data = [];
        this.props.group_list.map(item => {
            data.push(<Option value={item.get('vid')} key={'pitem'+item.get('vid')}
                >{item.get('name')}</Option>);
        })
        return data;
    }
    generatePermissionOptions(){
        let data = [];
        this.props.permissionOptions.map(item => {
            data.push(<Option value={item.get('id')} key={'pitem'+item.get('id')}
                >{item.get('name')}</Option>);
        })
        return data;
    }
   

}

export default Form.create()(FormModal);

import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    ContentHeader,
    Content,
    Filter,
    NewButton,
    FormModal,
    ViewModal,
} from '../components';
import { initialOrder } from '../reducers/app-reducer';
import * as appActions from '../actions/app-actions';
import * as appSelectors from '../selectors/app-selectors';
import * as modalActions from '../actions/modal-actions';
import * as viewActions from '../actions/view-actions';
import * as modalSelectors from '../selectors/modal-selectors';
import * as modalTypes from '../constants/modal-constants';
import { initialModelData } from '../reducers/modal-reducer';

let { Table,Icon, Dropdown,Menu, Input,  Button, Badge } = antd;

const mapStateToProps = (state, props) => {
    window.state = state;
    return {
        table_list: appSelectors.tableListSelector(state.app),
        pagination: appSelectors.paginationSelector(state.app),
        table_list_loading: appSelectors.tableListLoadingSelector(state.app),
        searchFilter: appSelectors.searchFilterSelector(state.app),
        tableFilter: appSelectors.tableFilterSelector(state.app),
        order: appSelectors.orderSelector(state.app),
        showFormModal : appSelectors.showFormModalSelector(state.app),
        tableListFetchParams: appSelectors.tableListFetchParamsSelector(state.app),

        modalData: modalSelectors.modalDataSelector(state.modal),
        modelData: modalSelectors.modelDataSelector(state.modal),
        generate_code_loading: state.modal.get('generate_code_loading'),
        permissionOptions: state.modal.get('permissionOptions'),

        viewShow: state.view.get('show'),
        viewCodeData: state.view.get('codeData'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators({...appActions}, dispatch),
        modalActions: bindActionCreators({...modalActions}, dispatch),
        viewActions: bindActionCreators({...viewActions}, dispatch),
    }
}

class PageActivateCodesList extends React.Component
{  
    constructor(props){
        super(props);
        this.state = {

        };
    }
    componentDidMount(){
        window.aa = this;
        this.fetchTableList();
        $('body').on('refresh', e=>{
            this.fetchTableList();
        })
    }
    fetchTableList(){
        this.props.appActions.refreshTableList(this.props.pagination.toJS(), this.props.tableListFetchParams);
    }
    render(){
        return(
            <div>
                <ContentHeader title="Activate Code List"/>
                <Content boxTitle="Activate Code List">
                    <Filter 
                        appActions={this.props.appActions}
                        filterSearchHandle={this.filterSearchHandle.bind(this)}
                        filterResetHandle={this.filterResetHandle.bind(this)}
                        />
                    {this.generateButtons()}
                    
                    <Table dataSource={this.props.table_list.toJS()}
                        columns={this.generateColumns()}
                        loading={this.props.table_list_loading}
                        pagination={this.props.pagination.toJS()}
                        onChange={this.handleTableChange.bind(this)}
                        rowKey="id"
                        />
                    
                    <FormModal modalData={this.props.modalData}
                        modalActions={this.props.modalActions}
                        appActions={this.props.appActions}
                        modelData={this.props.modelData}
                        generate_code_loading={this.props.generate_code_loading}
                        permissionOptions={this.props.permissionOptions}
                        ref="formModal"
                        />
                    <ViewModal show={this.props.viewShow} 
                        viewActions={this.props.viewActions}
                        codeData={this.props.viewCodeData}/>
                </Content>
            </div>
        );
    }
    generateColumns(){
        return [
            {title: 'ID',dataIndex: 'id',key: 'id',
                sorter: false, width: 60
            }, 
            {title: 'Code',dataIndex: 'code',key: 'code',
                sorter: false, 
                render: (text, record) => record.hasPermission?text:record.code_name,
            }, 
            {title: 'features', dataIndex: 'permissionNames', key: 'permissionNames',
                render:(text, record) => text.join(''),
            },
            {title:'code_expire', dataIndex:'code_expire', key: 'code_expire',
                render:(text, record) => record.code_expire_str,
            },
            {title:'feature_expire', dataIndex:'feature_expire', key: 'feature_expire',
                render:(text, record) => record.feature_expire_str==''?0:record.feature_expire_str + ' days',
            },
            {title:'feature_expire_date', dataIndex:'feature_expire_date_str', key: 'feature_expire_date'},
            {title:'receiver_max', dataIndex:'receiver_max', key: 'receiver_max',
            },
            {title:'sender_max', dataIndex:'sender_max', key: 'sender_max',
            },
            {title:'Used(R/S)', dataIndex:'receiver_used', key: 'receiver_used',
                render:(text, record) => record.receiver_used + '/' + record.sender_used,
            },
            {title:'Is Trial', dataIndex:'is_trial_str', key: 'is_trial',
            },
            {title:'status', dataIndex:'status', key: 'status',
                render:(text, record) => record.status_name,
            },
            {title:'note', dataIndex:'note', key: 'note',
                render:(text, record) => record.note,
            },
            {title:'created_at', dataIndex:'created_at', key: 'created_at',
                sorter: true, 
                render:(text, record) => record.created_str,
            },
            {title: 'Action', key: 'action', render: (text, record) => {
                return (
                    <Dropdown.Button onClick={e=>this.viewHandle(e, text, record)}
                        overlay={this.generateActionMenu(record)}
                        >View</Dropdown.Button>
                );
            }},
        ];
    }
    generateButtons(){
        return (
            <div className="clearfix" style={{margin:'10px 0'}}>
                <NewButton onClick={this.openFormModal.bind(this)}/>
                <Button type="default" 
                    size="small"
                    style={{marginLeft:'15px'}}
                    onClick={() =>location.href=g.baseUrl + '/activate-code/remove-by-device'}
                    >Remove Device History</Button>
            </div>
        );
    }
    openFormModal(){
        this.props.modalActions.setModelData(initialModelData);
        this.props.modalActions.setType(modalTypes.TYPE_ADD);
        this.props.modalActions.setName('Generate New Code');
        this.props.modalActions.setShow(true);

    }
    handleTableChange(pagination, filters, sorter){
        let pager = Object.assign({}, this.props.pagination.toJS(), {
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
        let current = pager.current;
        let order = {};
        let hasOrder = false;
        if(typeof sorter.columnKey!='undefined'){
            let key = sorter.columnKey;
            let dir = sorter.order == 'ascend'?'asc':'desc';
            order[key] = {name: key, dir: dir};
            //current = 1;
            hasOrder = true;
        }
        order = hasOrder?order:initialOrder;
        pager.current = current;

        this.props.appActions.setPagination(pager);
        this.props.appActions.setOrder(order);
       
        setTimeout(()=>{
            this.fetchTableList();
        },0)
    }
    filterSearchHandle(){
        this.fetchTableList();
    }
    filterResetHandle(){
        this.props.appActions.setSearchFilter({});
        this.props.appActions.setTableFilter({});
    }
    generateActionMenu(record){
        return (
            <Menu onClick={e=>this.actionMenuHandle(e, record)}>
                <Menu.Item key="edit" >Edit</Menu.Item>
                <Menu.Item key="delete">Delete</Menu.Item>
            </Menu>
        );
    }
    actionMenuHandle(e, record){
        let type = e.key;
        if('edit' == type){
            let data = {
                id: record.id,
                permission_id: record.permission_id,
                code: record.code,
                code_expire: record.code_expire_str,
                feature_expire: record.feature_expire_str + '',
                feature_expire_date: record.feature_expire_date_str,
                receiver_max: record.receiver_max,
                sender_max: record.sender_max,
                is_trial: record.is_trial + '',
                status: record.status + '',
                note: record.note,
            };
            this.props.modalActions.showEditModal(data);
        }
        if('delete' == type){
            antd.Modal.confirm({
                title: 'Code remove',
                content: 'Are you sure to remove ' + record.id,
                onOk:()=>{
                    this.props.modalActions.fetchDeleteCode(record.id);
                },
                onCancel(){}
            });
            return;
        }
        //console.log(type, record)
    }
    viewHandle(e, text, record){
        this.props.viewActions.setCodeData(record);
        this.props.viewActions.setShow(true);
    }
}

export const ActivateCodesList = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageActivateCodesList);


/*

*/
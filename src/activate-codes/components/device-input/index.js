import React from 'react';

let { Table, Icon, Dropdown, Menu, Input, Button, Badge, Modal, Form, Select,
    Switch, Spin, Cascader, } = antd;
let FormItem = Form.Item;
let Option = Select.Option;
const Group = Input.Group;

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': g.csrfToken,
    // 'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'multipart/form-data'
};

export default class DeviceInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: g.device_list,
            value: [],
        }
    }
    setValue(val){
        this.setState({value: val})
    }
    onChange(value, selectedOptions) {
        //console.log('value, selectedOptions', value, selectedOptions);
        let device = '', product_type = '',
            device_name = 0, product_type_name = '';
        let len = selectedOptions.length;
        if (len >= 1) {
            let deviceData = selectedOptions[0];
            device = deviceData.value;
            device_name = deviceData.label;
        }
        if (len >= 2) {
            let productTypeData = selectedOptions[1]
            product_type = productTypeData.value;
            product_type_name = productTypeData.label;
        }

        let data = {
            device: device,
            product_type: product_type,
            device_name: device_name,
            product_type_name: product_type_name,
        };
        this.setValue(value);
        //  console.log(data);
        if (typeof this.props.onChange != 'undefined') {
            this.props.onChange(data);
        }
    }
    loadData(selectedOptions) {
        //console.log('selectedOptions',selectedOptions)
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        if (targetOption.type == 'device') {
            let device_code = targetOption.value;
            fetchProductTypes(device_code).then(data => {
                //console.log('fetch data', data);
                targetOption.children = data.list
                this.setState({
                    options: [...this.state.options],
                });
                targetOption.loading = false;
            }).catch(e => {
                targetOption.loading = false;
                console.log('[device-input]fetch product type list error: ', e);
            })
        }
    }
    render() {
        return (
            <Cascader
                options={this.state.options}
                loadData={this.loadData.bind(this)}
                onChange={this.onChange.bind(this)}
                changeOnSelect={false}
                disabled={this.props.disabled ? true : false}
                placeholder={this.props.placeholder||''}
                style={this.props.style||{}}
                value={this.state.value}
            />
        );
    }
}

export function fetchProductTypes(device_code) {
    let url = `${g.baseUrl}device/get-product-list?code=${device_code}&datatype=array`;

    return fetch(url, {
        method: 'get',
        headers: defaultHeaders,
        credentials: 'same-origin',
    }).then(response => {
        return response.json().then(res => {
            if (res.result == 1) {
                return res;
            } else {
                throw res;
            }
        })
    }).catch(error => {
        throw error;
    });
}

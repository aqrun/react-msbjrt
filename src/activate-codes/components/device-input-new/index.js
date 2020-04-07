import React from 'react';

let { Table, Icon, Dropdown, Menu, Input, Button, Badge, Modal, Form, Select,
    Switch, Spin, Cascader, } = antd;
let FormItem = Form.Item;
let Option = Select.Option;
const Group = Input.Group;

export default class DeviceInputNew extends React.Component {
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
                onChange={this.props.onChange}
                changeOnSelect={false}
                disabled={this.props.disabled ? true : false}
                placeholder={this.props.placeholder||''}
                style={this.props.style||{}}
                value={this.props.value}
            />
        );
    }
}



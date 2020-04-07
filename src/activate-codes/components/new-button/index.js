import React from 'react';
let { Button } = antd;

export default class NewButton extends React.Component {
    render(){
        return(
            <Button icon="plus" type="primary" 
                size="small"
                onClick={() =>this.props.onClick()}
                >Generate New Code</Button>
        );
    }
}

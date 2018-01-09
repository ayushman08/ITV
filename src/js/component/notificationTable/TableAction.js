import React, { Component } from 'react';
import { STRINGS, IMAGES, IMAGE_COLOR, BUTTON_MAPPING } from '../commons/Constants';

class TableAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionElement: props.actions
        };
        // this.getOnClickOpen = ;
    }


    render() {
        const that = this;
        return (
            <td>
                {this.state.actionElement.map((value, key) => (
                        <span key={key} style={{ "paddingLeft": "10px" }}><a><img src={value.imgUrl}/></a></span>
                    ))}
            </td>
        );
    }
}


export default TableAction;

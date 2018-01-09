import React, { Component } from 'react';
import ChartAction from './charts/ChartsAction';
import Charts from './charts/Charts';

class RequestSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionElement: props.actions
        };
    }

    render() {
        return (
            <div>
                <Charts />
            </div>
        );
    }
}


export default RequestSummary;

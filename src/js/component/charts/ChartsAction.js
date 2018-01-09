import React, { Component } from 'react';

class ChartsAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartActions: [
                'Weekly',
                'Monthly',
                'Quartly',
                'Yearly'
            ]
        };
    }

    render() {
        return (
            <div className="chart-right">
                <ul className="timeline">
                    {this.state.chartActions.map((value, key) => (
                            <li key={key}><a key={key} href="#">{value}</a></li>
                        ))}
                </ul>
            </div>
        );
    }
}


export default ChartsAction;

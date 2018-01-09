import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header/Header';
import HeadTitle from './HeadTitle';
import CustomerBoard from '../customer/CustomerBoard';
import RequestBoard from '../request/RequestBoard';
import ReportBoard from './reports/ReportBoard';
import { STRINGS, MAPPING } from './Constants';

class CommonPlate extends Component {
    constructor(props) {
        super(props);
    }

    getBody() {
        if (window.location.href.toLowerCase().indexOf(STRINGS.CUSTOMER) > -1) {
            return (
                <CustomerBoard />
            );
        } else if (window.location.href.toLowerCase().indexOf(STRINGS.REPORTS) > -1) {
            return (
                <ReportBoard />
            );
        }
            return (
                <RequestBoard />
            );
    }

    render() {
        return (
            <div>
            <Header dashboardTitle={false} />
            <div className="container-fluid">
                <HeadTitle title={MAPPING[window.location.hash.split('/')[1].toLowerCase()]} />
                <div className="row">
                   {this.getBody()}
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        something: !state.techRep.dashboardTitle
    };
}

export default connect(mapStateToProps)(CommonPlate);

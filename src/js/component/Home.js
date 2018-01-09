import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './commons/header/Header';
import TopNav from './commons/TopNav';
import NotificationTable from './notificationTable/NotificationTable';
import RequestSummary from './RequestSummary';
import RecentRequest from './RecentRequest';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header dashboardTitle />
                <div className="container-fluid">
                    <TopNav history={this.props.history} />
                    <div className="row">
                        <NotificationTable />
                        <div className="col-md-5 right" >
                            <RequestSummary />
                            <RecentRequest />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.users
    };
}

export default connect(mapStateToProps)(Home);

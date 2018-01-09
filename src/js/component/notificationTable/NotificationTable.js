import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableAction from './TableAction';
import AddCustomerModel from '../commons/AddCustomerPopup';
import CreateCustomerModel from '../commons/CreateCustomerPopup';
import AssignmentPopup from '../commons/AssignmentPopup';
import Api from '../libs/Api';

class NotificationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popStatus: false,
            popStatusCreate: false,
            screen: null,
            notificationData: []
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.openCreateCustomer = this.openCreateCustomer.bind(this);
        this.openAssignment = this.openAssignment.bind(this);
    }
 

    componentWillMount() {
        const that = this;
        const email = sessionStorage.getItem('email');
        const status = 'true';
        const url = 'tech/listTRepDashboardNotification/';
        Api.get(`${url}${email}/${status}`).then(response => {
            const dashboardData = response.dash_notifi;
            if (dashboardData) {
                const notify = [];
                for (let i = 0; i < dashboardData.length; i++) {
                    const data = {
                        companyName: dashboardData[i].cpname,
                        customerName: dashboardData[i].cname,
                        requestDate: dashboardData[i].date,
                        partNumber: dashboardData[i].p_num,
                        group: dashboardData[i].group,
                        actionElement: [
                            {
                                name: 'view',
                                imgUrl: 'images/view.png',
                                action: ''
                            },
                            {
                                name: 'flag',
                                imgUrl: 'images/flag.png',
                                action: ''
                            },
                            {
                                name: 'edit',
                                imgUrl: 'images/edit.png',
                                action: ''
                            }
                        ]
                    };
                    notify.push(data);
                }

                that.setState({ notificationData: notify });
            }
        })
            .catch((error) => {
                console.error(url, error.toString());
            });
    }

    open(screen) {
        console.log('open', screen);
        this.setState({ popStatus: true, screen });
    }
    openCreateCustomer() {
        this.setState({ popStatusCreate: true });
    }
    openAssignment() {
        this.setState({ popStatusAssign: true });
    }
    close() {
        this.setState({ popStatus: false, popStatusCreate: false, popStatusAssign: false, screen: null });
    }
    render() {
        const that = this;
        return (

            <div className="col-md-7 left" >
                <div className="table-head">
                    <div className="table-left"><h2>NOTIFICATIONS</h2></div>
                    <div className="table-right"><h2>VIEW ALL</h2> </div>
                </div>
                <AssignmentPopup status={this.state.popStatusAssign} closeAction={this.close} />
                <AddCustomerModel screen={this.state.screen} status={this.state.popStatus} closeAction={this.close} />
                <CreateCustomerModel status={this.state.popStatusCreate} closeAction={this.close} />
                <div className="table-responsive">
                    <table className="table no-margin">
                        <thead>
                            <tr>
                                {this.props.notificationData.headers.map((value, key) => (
                                        <th key={key}>{value}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {that.state.notificationData.map((value, key) => (
                                    <tr key={key}>
                                        <td>
                                            <small className="cmp-name">{value.companyName}</small>
                                            <span className="c_name">{value.customerName}</span>
                                        </td>
                                        <td><span className="req-date">{value.requestDate}</span><span className="req-id">{value.requestID}</span></td>
                                        <td>{value.partNumber}</td>
                                        <td>{value.group}</td>
                                        <TableAction actions={value.actionElement} open={(screen) => { that.open(screen); }} openAssignment={this.openAssignment} openCreateCustomer={this.openCreateCustomer} close={this.close} />
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notificationData: state.techRep.notificationData
    };
}

export default connect(mapStateToProps)(NotificationTable);

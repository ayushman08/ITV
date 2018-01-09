import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from './libs/Api';

class RecentRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentRequest: []
        };
    }

    componentWillMount() {
        const that = this;

        const email = sessionStorage.getItem('email');
        const url = 'tech/loadRecentRequestHistory/';
        Api.get(`${url}${email}`).then(response => {
            const dashboardData = response.recent_req;
            if (dashboardData) {
                const notify = [];
                for (let i = 0; i < dashboardData.length; i++) {
                    if (i < 5) {
                        const data = {
                            name: dashboardData[i].cname,
                            email: dashboardData[i].cpname,
                            requestId: dashboardData[i].reqId,
                            date: new Date(dashboardData[i].date).toDateString(),
                            status: (dashboardData[i].status === 'Completed'),
                        };
                        notify.push(data);
                    }
                }

                that.setState({ recentRequest: notify });
            }
        })
            .catch((error) => {
                console.error(url, error.toString());
            });
    }

    render() {
        return (
            <div className="col-md-12"><div className="table-responsive req-table">
                <div className="recent-request">Requests</div>
                <table className="table no-margin">

                    <tbody>
                        {
                            this.state.recentRequest.map((value, key) => (
                                    <tr key={key}>
                                        <td><small className="c_name">{value.name}</small>
                                            <span className="cmp-name">{value.email}</span></td>
                                        <td>Req.ID:{value.requestId}</td>
                                        <td>{value.date}</td>
                                        <td><span className={'label label-' + ((value.status) ? 'success' : 'danger')}>{(value.status) ? 'Completed' : 'Pending'}</span></td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        recentRequest: state.techRep.recentRequest
    };
}

export default connect(mapStateToProps)(RecentRequest);

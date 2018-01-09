import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header';
import HeadTitle from '../HeadTitle';
import TableAction from '../../notificationTable/TableAction';
import AddCustomerModel from '../AddCustomerPopup';
import CreateCustomerModel from '../CreateCustomerPopup';
import { STRINGS } from '../Constants';
import Api from '../../libs/Api';

class ReportBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popStatus: false,
            popStatusCreate: false,
            screen: null,
            headersReports: [
                "Company Name",
                "Group",
                "Part Number",
                "Date",
                "Request Id",
                "Action"
            ],
            reportData: []
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.openCreateCustomer = this.openCreateCustomer.bind(this);
    }

    componentWillMount() {
        var that = this;
        let email = sessionStorage.getItem("email");
        let url = "main/loadReports/";
        Api.get(`${url}${email}`).then(response => {
            console.log(response);
            var reportData = response.rprts_lst;
            if (reportData) {
                var notify = [];
                for (var i = 0; i < reportData.length; i++) {
                    var data = {
                        "companyName": reportData[i].cpname,
                        "requestID": reportData[i].reqId,
                        "partNumber": reportData[i].p_num,
                        "requestDate": new Date(reportData[i].date).toDateString(),
                        "group": reportData[i].group,
                        "actionElement": [
                            {
                                name: "view",
                                imgUrl: "images/view.png",
                                action: ""
                            },
                            {
                                name: "download",
                                imgUrl: "images/download.png",
                                action: ""
                            }
                        ]
                    }
                    notify.push(data);
                }

                that.setState({ reportData: notify }, () => {
                    that.initiateTable();
                });
            }
        })
            .catch((error) => {
                console.error(url, error.toString());
            });

    }

    initiateTable() {
        var table = $('#cust-table').dataTable({
            "scrollX": true,
            responsive: true,
            columnDefs: [{ orderable: false, targets: [5] }]
        });


        $('.dataTables_filter').find('input').attr('placeholder', 'Search');
        var input = $('.dataTables_filter').find('label');
        input.css({ "font-size": "0px" });
        $('.dataTables_filter input[type="search"]').css({ 'padding-top': '0px', 'padding-bottom': '0px', 'background-repeat': 'no-repeat', 'background-image': 'url(images/search-light.png)', 'background-position': 'right', "width": "123%" });
    }


    open(screen) {
        this.setState({ popStatus: true, screen: screen });
    }
    openCreateCustomer() {
        this.setState({ popStatusCreate: true });
    }
    close() {
        this.setState({ popStatus: false, popStatusCreate: false, screen: null });
    }

    render() {
        console.log("this.state", this.state);
        let that = this;
        return (
            <div>
                <AddCustomerModel screen={this.state.screen} status={this.state.popStatus} closeAction={this.close} />
                <CreateCustomerModel status={this.state.popStatusCreate} closeAction={this.close} />
                <div className="tab_container well" >

                    {/*<div className="add-btn"><button type="button" className="btn btn-sm btn-warning pull-right" onClick={this.open.bind(this, STRINGS.ADD)}>Add Customer</button></div>*/}
                    <table id="cust-table" className="table table-bordered table-style" cellSpacing="0" width="100%">

                        <thead>
                            <tr>
                                {this.state.headersReports.map((value, key) => {
                                    return (
                                        <th key={key}>{value}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reportData.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            {value.companyName}
                                        </td>
                                        <td>{value.group}</td>
                                        <td>{value.partNumber}</td>
                                        <td>{value.requestDate}</td>
                                        <td>{value.requestID}</td>
                                        <TableAction actions={value.actionElement} open={(screen) => { that.open(screen) }} openCreateCustomer={this.openCreateCustomer} close={this.close} />
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>




                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tableData: state.techRep.customerTableData
    }
}

export default connect(mapStateToProps)(ReportBoard);
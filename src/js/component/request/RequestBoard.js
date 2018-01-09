import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../commons/header/Header';
import HeadTitle from '../commons/HeadTitle';
import TableAction from '../notificationTable/TableAction';
import AddCustomerModel from '../commons/AddCustomerPopup';
import CreateCustomerModel from '../commons/CreateCustomerPopup';
import { STRINGS } from '../commons/Constants';
import Api from '../libs/Api';

class RequestBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popStatus: false,
            popStatusCreate: false,
            screen: null,
            sectionFlag: true,
            initialFlag: true,
            pendingRequest: [],
            completeRequest: []
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.openCreateCustomer = this.openCreateCustomer.bind(this);
        this.initTable = this.initTable.bind(this);
        this.pendTableInt = {};
    }

    componentWillMount() {
        const that = this;
        const email = sessionStorage.getItem('email');
        const status = 'Pending';
        Api.get(`tech/loadRequests/${email}/${status}`).then(resp => {
            console.log(resp);
            const data = resp.comp_reqs;
            
            if (data) {
                that.setState({ pendingRequest: that.constructData(data) }, () => {
                    that.initiateDataTable();
                });
            }
          }).catch((ex) => {
            console.log(ex);
          });
    }


    constructData(data) {
        const notify = [];
        for (let i = 0; i < data.length; i++) {
            const dataArr = {
                customerName: data[i].cname,
                companyName: data[i].cpname,
                requestDate: new Date(data[i].date).toDateString(),
                group: data[i].group,
                partNumber: data[i].p_num,
                requestID: data[i].reqId,
                actionElement: [
                    {
                        name: 'edit',
                        imgUrl: 'images/edit.png',
                        action: ''
                    }
                ]
            };
            notify.push(dataArr);  
        }
        return notify;
    }

    initTable() {
        this.setState({ sectionFlag: false }, function () {
            if (this.state.initialFlag) {
                const that = this;
                const email = 'Joanna.Shaffer@pall.com';
                const status = 'Completed';
                Api.get(`tech/loadRequests/${email}/${status}`).then(resp => {
                    console.log(resp);
                    const data = resp.comp_reqs;
                    
                    if (data) {
                        that.setState({ completeRequest: that.constructData(data), initialFlag: false }, () => {
                            const table1 = $('#cust-table').dataTable({
                                scrollX: true,
                                responsive: true,
                                lengthMenu: [[20], [20]],
                                initComplete() {
                                    $('.dataTables_filter').find('input').attr('placeholder', 'Search');
                                    let input = $('.dataTables_filter').find('label');
                                    input.css({ 'font-size': '0px' });
                                    $('.dataTables_filter input[type="search"]').css({ 'padding-top': '0px', 'padding-bottom': '0px', 'background-repeat': 'no-repeat', 'background-image': 'url(images/search-light.png)', 'background-position': 'right', 'width': '123%' });
                                },
                                columnDefs: [{ orderable: false, targets: [6] }]
                            });
                        });
                    }
                  }).catch((ex) => {
                    console.log(ex);
                  });
            }
        });
    }

initiateDataTable() {
    const that = this;
    
    this.pendTableInt = $('#cust-table1').dataTable({
        scrollX: true,
        responsive: true,
        initComplete() {
            $('.dataTables_filter').find('input').attr('placeholder', 'Search');
            let input = $('.dataTables_filter').find('label');
            input.css({ 'font-size': '0px' });
            $('.dataTables_filter input[type="search"]').css({ 'padding-top': '0px', 'padding-bottom': '0px', 'background-repeat': 'no-repeat', 'background-image': 'url(images/search-light.png)', 'background-position': 'right', width: '123%' });
        },
        columnDefs: [{ orderable: false, targets: [6] }]
    });
}

open(screen) {
    this.setState({ popStatus: true, screen });
}
openCreateCustomer() {
    this.setState({ popStatusCreate: true });
}
close() {
    this.setState({ popStatus: false, popStatusCreate: false, screen: null });
}

render() {
    const that = this;
    return (
        <div>
            <AddCustomerModel screen={this.state.screen} status={this.state.popStatus} closeAction={this.close} />
            <CreateCustomerModel status={this.state.popStatusCreate} closeAction={this.close} />
            <div className="tab_container well" >
                <input id="tab1" type="radio" name="tabs" defaultChecked />
                <label htmlFor="tab1" onClick={() => { that.setState({ sectionFlag: true }); }} htmlFor="tab1"><span>PENDING REQUESTS</span></label>

                <input id="tab2" type="radio" name="tabs" />
                <label htmlFor="tab2" onClick={() => this.initTable()} htmlFor="tab2"><span>COMPLETED REQUESTS</span></label>


                <section style={{ display: (that.state.sectionFlag ? 'block' : 'none') }} className="tab-content">
                    <table id="cust-table1" className="table table-bordered table-style" cellSpacing="0" width="100%">

                        <thead>
                            <tr>
                                {that.props.tableData.headersPendingRequest.map((value, key) => (
                                        <th key={key}>{value}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {that.state.pendingRequest.map((value, key) => (
                                    <tr key={key}>
                                        <td>{value.companyName}</td>
                                        <td>{value.customerName}</td>
                                        <td>{value.group}</td>
                                        <td>{value.partNumber}</td>
                                        <td>{value.requestDate}</td>
                                        <td>{value.requestID}</td>
                                        <TableAction actions={value.actionElement} open={(screen) => { that.open(screen); }} openCreateCustomer={this.openCreateCustomer} close={this.close} />
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </section>
                <section style={{ display: (that.state.sectionFlag ? 'none' : 'block') }} className="tab-content">
                    <table id="cust-table" className="table table-bordered table-style" cellSpacing="0" width="100%">

                        <thead>
                            <tr>
                                {this.props.tableData.headersCompletedRequest.map((value, key) => (
                                        <th key={key}>{value}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.completeRequest.map((value, key) => (
                                    <tr key={key}>
                                        <td>{value.companyName}</td>
                                        <td>{value.customerName}</td>
                                        <td>{value.group}</td>
                                        <td>{value.partNumber}</td>
                                        <td>{value.requestDate}</td>
                                        <td>{value.requestID}</td>
                                        <TableAction actions={value.actionElement} open={(screen) => { that.open(screen); }} openCreateCustomer={this.openCreateCustomer} close={this.close} />
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}
}

function mapStateToProps(state) {
    return {
        tableData: state.techRep.customerTableData
    };
}

export default connect(mapStateToProps)(RequestBoard);

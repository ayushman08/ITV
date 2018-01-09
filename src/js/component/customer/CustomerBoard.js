import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../commons/header/Header';
import HeadTitle from '../commons/HeadTitle';
import TableAction from '../notificationTable/TableAction';
import AddCustomerModel from '../commons/AddCustomerPopup';
import CreateCustomerModel from '../commons/CreateCustomerPopup';
import { STRINGS } from '../commons/Constants';
import Api from '../libs/Api';


class CustomerBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popStatus: false,
            popStatusCreate: false,
            screen: null,
            tableHeaders: [
                'Company Name',
                'Customer',
                'Email',
                'Phone',
                'Action'
            ],
            reportData: [],
            table: {}
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.openCreateCustomer = this.openCreateCustomer.bind(this);
        this.initiateTable = this.initiateTable.bind(this);
        this.initiate = this.initiate.bind(this);
    }

    componentDidMount() {
        this.initiate();
    }

    initiate() {
        const that = this;
        const email = sessionStorage.getItem('email');
        const url = 'main/loadCustomersList/';
        Api.get(`${url}${email}`).then(response => {
            console.log(response);
            const reportData = response.customers;
            if (reportData) {
                const notify = [];
                for (let i = 0; i < reportData.length; i++) {
                    const data = {
                        companyName: reportData[i].cpname,
                        customer: reportData[i].cname,
                        email: reportData[i].email,
                        phone: reportData[i].phone,
                        actionElement: [
                            {
                                name: 'view',
                                imgUrl: 'images/view.png',
                                action: ''
                            },
                            {
                                name: 'edit',
                                imgUrl: 'images/edit.png',
                                action: ''
                            },
                            {
                                name: 'create',
                                imgUrl: 'images/create-new.png',
                                action: ''
                            }
                        ]
                    };
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
        const table = $('#cust-table').dataTable({
            scrollX: true,
            responsive: true,
            lengthMenu: [[20], [20]],
            columnDefs: [{ orderable: false, targets: [4] }]
        });

        $('.dataTables_filter').find('input').attr('placeholder', 'Search');
        const input = $('.dataTables_filter').find('label');
        input.css({ 'font-size': '0px' });
        $('.dataTables_filter input[type="search"]').css({ 'padding-top': '0px', 'padding-bottom': '0px', 'background-repeat': 'no-repeat', 'background-image': 'url(images/search-light.png)', 'background-position': 'right', width: '100%' });
        this.setState({ table });
    }

    open(screen) {
        console.log('open', screen);
        this.setState({ popStatus: true, screen });
    }
    openCreateCustomer() {
        this.setState({ popStatusCreate: true });
    }
    close() {
        this.setState({ popStatus: false, popStatusCreate: false, screen: null });
    }

    render() {
        console.log('this.state', this.state);
        const that = this;
        return (
            <div><AddCustomerModel initiate={this.initiate} table={this.state.table} screen={this.state.screen} status={this.state.popStatus} closeAction={this.close} />
                <CreateCustomerModel status={this.state.popStatusCreate} closeAction={this.close} />
                <div className="tab_container well" >

                    <div className="add-btn"><button type="button" className="btn btn-sm btn-warning pull-right" onClick={this.open.bind(this, STRINGS.ADD)}>Add Customer</button></div>
                    <table id="cust-table" className="table table-bordered table-style" cellSpacing="0" width="100%">

                        <thead>
                            <tr>
                                {this.state.tableHeaders.map((value, key) => (
                                        <th key={key}>{value}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reportData.map((value, key) => (
                                    <tr key={key}>
                                        <td>
                                            {value.companyName}
                                        </td>
                                        <td>{value.customer}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone}</td>
                                        <TableAction actions={value.actionElement} open={(screen) => { that.open(screen); }} openCreateCustomer={this.openCreateCustomer} close={this.close} />
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
        tableData: state.techRep.customerTableData
    };
}

export default connect(mapStateToProps)(CustomerBoard);

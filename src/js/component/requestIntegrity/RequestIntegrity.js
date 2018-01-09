import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from 'react-search-bar';
import Header from '../commons/header/Header';
import RequestIntegrityForm from './RequestIntegrityForm';
import Api from '../libs/Api';

class RequestIntegrity extends Component {
    constructor(props) {
        super(props);
        this.state = {

            companyName: '',
            contactName: '',
            contactNameAttr: '',
            email: '',
            phoneNo: '',
            companyNameError: false,
            contactNameError: false,
            emailError: false,
            phoneNoError: false,
            companyNameErrorMsg: '',
            contactNameErrorMsg: '',
            emailErrorMsg: '',
            phoneNoErrorMsg: '',
            suggestions: [],
            customersData: [],
            words: []

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.suggestionRenderer = this.suggestionRenderer.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }


    componentDidMount() {
        const that = this;


        const email = sessionStorage.getItem('email');
        const url = 'main/loadCustomersList/';
        Api.get(`${url}${email}`).then(response => {
            console.log(response);
            const customerData = response.customers;
            if (customerData) {
                const notify = [];
                const customerName = [];
                for (let i = 0; i < customerData.length; i++) {
                    customerName.push(customerData[i].cname);
                    const data = {
                        companyName: customerData[i].cpname,
                        customer: customerData[i].cname,
                        email: customerData[i].email,
                        phone: customerData[i].phone
                        
                    };
                    notify.push(data);
                }
                that.setState({ words: customerName });
                that.setState({ customersData: notify });
            }
        })
            .catch((error) => {
                console.error(url, error.toString());
            });
    }


    handleSearch(value) {
        if (value) {
            console.info(`Searching "${value}"`);
        }
    }

    suggestionRenderer(suggestion, searchTerm) {
        return (
          <span>
            {/* <span>{searchTerm}</span> */}
            <strong>{suggestion}</strong>
          </span>
        );
      }

    handleSelection(value) {
        if (value) {
            const data = this.state.customersData;
            for (let i = 0; i < data.length; i++) {
                if (data[i].customer === value) {
                    console.log(data[i]);
                    const customer = data[i];
                    this.setState({
                        companyName: customer.companyName,
                        contactName: customer.customer,
                        email: customer.email,
                        phoneNo: customer.phone
                    });
                }
            }
            console.info(`Selected "${value}"`);
        }
    }

    handleSearchChange(input) {
        const resultArray = [];
        const arr = this.state.words;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].toLocaleLowerCase().search(input.toString()) > -1) {
               resultArray.push(arr[i]); 
            }
        }
        this.setState({
            suggestions: resultArray
        });
    }

    handleClear() {
        this.setState({
            suggestions: []
        });
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;


        switch (name) {
            case 'companyName':
                console.log('companyName');
                this.state.companyNameErrorMsg = value ? (value.length < 5 ? 'Name is too short.' : null) : 'Name is required.';
                this.setState({
                    companyNameError: !!this.state.companyNameErrorMsg,
                    companyNameErrorMsg: this.state.companyNameErrorMsg,
                    companyName: value
                });
                break;
            case 'contactName':

                this.state.contactNameErrorMsg = value ? (value.length < 5 ? 'Name is too short.' : null) : 'Name is required.';
                this.setState({
                    contactNameError: !!this.state.contactNameErrorMsg,
                    contactNameErrorMsg: this.state.contactNameErrorMsg,
                    contactName: value
                });

                break;

            case 'email':

                const emailRegex = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
                var emailValid = value.match(emailRegex);
                this.state.emailErrorMsg = value ? (!emailValid ? 'Invalid email address.' : null) : 'Email is required.';

                this.setState({
                    emailError: !!this.state.emailErrorMsg,
                    emailErrorMsg: this.state.emailErrorMsg,
                    email: value
                });
                console.log(`emailValue${this.state.email}`);
                break;

            case 'phoneNo':

                const numberRegex = '^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$';
                var numberValid = value.match(numberRegex);
                var numberRequired = 'Moblie Number is required.';
                var numberTooLong = 'Moblie Number is too long.';
                var numberTooShort = 'Moblie Number is too Short.';
                var numberInvalid = 'Mobile Number is Invalid.';

                this.state.phoneNoErrorMsg = value ? (numberValid ? (value.length < 10 ? numberTooShort : (value.length > 10 ? numberTooLong : null)) : numberInvalid) : numberRequired;
                this.setState({
                    phoneNoError: !!this.state.phoneNoErrorMsg,
                    phoneNoErrorMsg: this.state.phoneNoErrorMsg,
                    phoneNo: value
                });
                console.log(`emailValue${this.state.phoneNo}`);
                break;


            default:
                break;
        }
    }

    render() {
        const that = this;
        //console.log(this.state);
        return (
            <div>
                <Header dashboardTitle={false} />
                <div className="container-fluid">
                    <div className="row">

                        <div className="req-outer">

                            <div className="row">


                                <div className=" searchbox">

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="srchhead">Request Integrity test certificate</div>
                                            <div className="input-group col-xs-9 col-sm-6 col-md-4" id="adv-search">

                                            <SearchBar
                                            autoFocus
                                            renderSearchButton
                                            placeholder="select a user"
                                            onChange={this.handleSearchChange}
                                            onClear={this.handleClear}
                                            onSelection={this.handleSelection}
                                            onSearch={this.handleSearch}
                                            suggestions={this.state.suggestions}
                                            suggestionRenderer={this.suggestionRenderer}
                                            />
                                                {/* <input type="text" className="form-control" placeholder="Search and Select Customer" />
                                                <div className="input-group-btn">
                                                    <div className="btn-group" role="group">
                                                        <div className="dropdown dropdown-lg">
                                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span className="caret"></span></button>

                                                            <button type="button" className="btn btn-primary"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="custinfo-box">
                                    <div className=" row">
                                        <h4 className="head">Customer Information </h4>
                                    </div>
                                    <div className="row">

                                        <div className="col-md-12">
                                            <div className="form-group col-xs-12 col-sm-4 col-lg-2">
                                                <label htmlFor="title">Company Name <sup> *</sup></label>
                                                <input type="text" className="form-control" id="title" placeholder="" name="companyName" value={this.state.companyName} onChange={this.handleChange} />
                                                {this.state.companyNameError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.companyNameErrorMsg}</span> : ''}
                                            </div>


                                            <div className="form-group col-xs-12 col-sm-4 col-lg-2">
                                                <label htmlFor="add">Contact Name <sup>*</sup>  </label>
                                                <input type="text" className="form-control" id="add" placeholder="" name="contactName" value={this.state.contactName} onChange={this.handleChange} />
                                                {this.state.contactNameError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.contactNameErrorMsg}</span> : ''}
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-4 col-lg-2">
                                                <label htmlFor="email">Email <sup>*</sup>  </label>
                                                <input type="text" className="form-control" id="email" placeholder="" name="email" value={this.state.email} onChange={this.handleChange} />
                                                {this.state.emailError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.emailErrorMsg}</span> : ''}

                                            </div>
                                            <div className="form-group col-xs-12 col-sm-4 col-lg-2">
                                                <label htmlFor="phn">Phone Number <sup> *</sup>  </label>
                                                <input type="tel" className="form-control" id="phn" placeholder="" name="phoneNo" value={this.state.phoneNo} onChange={this.handleChange} />
                                                {this.state.phoneNoError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.phoneNoErrorMsg}</span> : ''}

                                            </div>
                                            <div className="form-group col-xs-6 col-sm-4 col-lg-2">
                                                <span className="custspan">  Request No: 105  </span>

                                            </div>
                                            <div className="form-group col-xs-6 col-sm-4 col-lg-2">
                                                <span className="custspan"> Date: August 17, 2017  </span>

                                            </div>


                                        </div>


                                    </div>

                                </div>
                               
                                <RequestIntegrityForm companyName={this.state.companyName} contactName={this.state.contactName} email={this.state.email} phoneNo={this.state.phoneNo} />


                            </div>


                        </div>


                    </div>
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

export default connect(mapStateToProps)(RequestIntegrity);

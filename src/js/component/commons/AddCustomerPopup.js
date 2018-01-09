import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Header from './header/Header';
import HeadTitle from './HeadTitle';
import CustomerBoard from '../customer/CustomerBoard';
import { STRINGS, IMAGES } from './Constants';
import Api from '../libs/Api';

class RecentRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            contactName: '',
            email: '',
            phoneNo: '',
            title: '',
            address: '',
            companyNameError: false,
            contactNameError: false,
            emailError: false,
            phoneNoError: false,
            titleError: false,
            addressError: false,
            departmentError: false,
            companyNameErrorMsg: '',
            contactNameErrorMsg: '',
            emailErrorMsg: '',
            phoneNoErrorMsg: '',
            titleErrorMsg: '',
            addressErrorMsg: '',
            showModal: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        if (this.props.screen === STRINGS.VIEW || this.props.screen === STRINGS.UPDATE) {
  }
    }


         getButton() {
        console.log('getButton', this.props.screen);
        if (this.state.phoneNo.length === 10) {
            return (<div>{'phone error'}</div>);
        }
      
        
        if (this.props.screen === STRINGS.ADD) {
            return (
                <input type="submit" className="btn save" value="submit" onClick={this.addCustomer.bind(this)} />
            );
        } else if (this.props.screen === STRINGS.VIEW) {
            return (
                <div />
            );
        } else if (this.props.screen === STRINGS.UPDATE) {
            return (
                <input type="submit" className="btn save" value="update" />
            );
        }
}


componentDidReceiveContext() {
    this.setState({ showModal: this.props.status });
}


addCustomer(event) {
    debugger;
    // const name = event.target.name;
    //const value = event.target.value;
    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;
    const add = document.getElementById('add').value;
    const email = document.getElementById('email').value;
    const depatment = document.getElementById('depatment').value;
    const phone_no = document.getElementById('phone_no').value;
    const data = {

        cpname: this.state.companyName,
        title: this.state.title,
        cname: this.state.contactName,
        addrs: this.state.address,
        dpt: this.state.depatment,
        country: this.state.country,
        email: this.state.email,
        phone: this.state.phoneNo
    };
    console.log(data);
    const url = 'main/addNewCustomer/';
    const mail = sessionStorage.getItem('email');
    Api.post(`${url}${mail}`, data).then(response => {
        if (response) {
            this.props.table.fnDestroy();
            this.props.initiate();
            this.props.closeAction();
        }
    });
}

initiateTable() {
    const table = $('#cust-table').dataTable({
        scrollX: true,
        responsive: true,
        columnDefs: [{ orderable: false, targets: [4] }]
    });

    $('.dataTables_filter').find('input').attr('placeholder', 'Search');
    const input = $('.dataTables_filter').find('label');
    input.css({ 'font-size': '0px' });
    $('.dataTables_filter input[type="search"]').css({ 'padding-top': '0px', 'padding-bottom': '0px', 'background-repeat': 'no-repeat', 'background-image': 'url(images/search-light.png)', 'background-position': 'right', width: '100%' });
}

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
  case 'contactName':
                this.state.contactNameErrorMsg = value ? (value.length < 5 ? 'Name is too short.' : null) : 'Name is required.';
                this.setState({
                    contactNameError: !!this.state.contactNameErrorMsg,
                    contactNameErrorMsg: this.state.contactNameErrorMsg,
                    contactName: value
                });
                break;

            case 'companyName':
                console.log('companyName');
                this.state.companyNameErrorMsg = value ? (value.length < 5 ? 'Company Name is too short.' : null) : 'Company Name is required.';
                this.setState({
                    companyNameError: !!this.state.companyNameErrorMsg,
                    companyNameErrorMsg: this.state.companyNameErrorMsg,
                    companyName: value
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

                break;


            case 'phoneNo':

                const numberRegex = '^\[0-9]{10}\$';//"^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$";
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

                break;

            case 'title':
                console.log('title');
                this.state.titleErrorMsg = value ? (value.length < 2 ? 'Title is too short.' : null) : 'Name is required.';
                this.setState({
                    titleError: !!this.state.titleErrorMsg,
                    titleErrorMsg: this.state.titleErrorMsg,
                    title: value
                });
                break;

            case 'address':

                this.state.addressErrorMsg = value ? (value.length < 5 ? 'Address is too short.' : null) : 'Address is required.';
                this.setState({
                    addressError: !!this.state.addressErrorMsg,
                    addressErrorMsg: this.state.addressErrorMsg,
                    address: value
                });
                break;

            case 'department':

                this.state.departmentErrorMsg = value ? (value.length < 5 ? 'Department Name is too short.' : null) : 'Department Name is required.';
                this.setState({
                    departmentError: !!this.state.departmentErrorMsg,
                    departmentErrorMsg: this.state.departmentErrorMsg,
                    depatment: value
                });
                break;
            case 'country':

                this.setState({ country: value });
                break;

            default:
                break;
        }
    }

    render() {
        console.log('this.state', this.state);
        return (

            <Modal show={this.props.status} onHide={this.props.closeAction}>
                <Modal.Header>
                    <button type="button" className="close" onClick={this.props.closeAction}> <span className="glyphicon glyphicon-remove" /></button>
                    <h4 className="modal-title">{IMAGES[this.props.screen]} CUSTOMER</h4>
                </Modal.Header>

                <Modal.Body>
                    <div className="row">

                        

                        <div className="col-md-12">
                            <div className="form-group col-xs-12 col-sm-6">
                                <label htmlFor="title">Title</label>
                               <select className="name form-control" name="title" onChange={this.handleChange} placeholder="" id="title">
                                    <option value="">Please Select</option>
                                    <option value="USA">Mr</option>
                                    <option value="France">Ms</option>
                                    <option value="Germany">Mrs</option>
                                </select>

                            </div>

                            <div className="form-group col-xs-12 col-sm-6">
                                <label htmlFor="company">Company</label>
                                <input type="text" className="form-control" id="company" name="companyName" placeholder="" value={this.state.value} onChange={this.handleChange} placeholder="" />
                                {this.state.companyNameError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.companyNameErrorMsg}</span> : ''}
                            </div>

                            <div className="form-group col-xs-12 col-sm-6">
                                <label htmlFor="name">Name <sup>*</sup> </label>
                                <input type="text" className="form-control" id="name" placeholder="" name="contactName" value={this.state.value} onChange={this.handleChange} placeholder="" />
                                {this.state.contactNameError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.contactNameErrorMsg}</span> : ''}
                            </div>

                            <div className="form-group col-xs-12 col-sm-6">
                                <label htmlFor="country">Country</label>
                                <select className="name form-control" name="country" onChange={this.handleChange} placeholder="" id="country">
                                    <option value="">Please Select</option>
                                    <option value="USA">USA</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Spain">Spain</option>
                                </select>
                            </div>

                            <div className="form-group col-xs-12 col-sm-6">
                                <label htmlFor="add">Address  </label>
                                <input type="text" className="form-control" id="add" name="address" placeholder="" value={this.state.value} onChange={this.handleChange} placeholder="" />
                                {this.state.addressError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.addressErrorMsg}</span> : ''}
                            </div>

                            <div className="form-group col-xs-12 col-sm-6">
                                <label htmlFor="email">Email<sup>*</sup>  </label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="" value={this.state.value} onChange={this.handleChange} placeholder="" />
                                {this.state.emailError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.emailErrorMsg}</span> : ''}

                            </div>
                            <div className="form-group col-xs-12 col-sm-6">
                                <label htmlFor="depatment">Department  </label>
                                <input type="text" className="form-control" id="depatment" name="department" placeholder="" value={this.state.value} onChange={this.handleChange} placeholder="" />
                                {this.state.departmentError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.departmentErrorMsg}</span> : ''}
                            </div>
                            <div className="form-group col-xs-12 col-sm-6">
                                <label htmlFor="phone_no">Phone  </label>
                                <input type="number" className="form-control" id="phone_no" name="phoneNo" placeholder="" value={this.state.value} onChange={this.handleChange} placeholder="" />
                                {this.state.phoneNoError ? <span ref="nameError" style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{this.state.phoneNoErrorMsg}</span> : ''}
                            </div>
                            <div className="form-group col-xs-12 col-sm-12 text-center lastrow">


                                {this.getButton()}
                            </div>

                        </div>


                    </div>
                </Modal.Body>

            </Modal>

        );
    }
}

function mapStateToProps(state) {
    return {
        something: !state.techRep.dashboardTitle
    };
}

export default connect(mapStateToProps)(RecentRequest);

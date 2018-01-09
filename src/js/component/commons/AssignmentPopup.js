import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Header from './header/Header';
import HeadTitle from './HeadTitle';
import CustomerBoard from '../customer/CustomerBoard';
import { STRINGS, IMAGES } from './Constants';

class AssignmentPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    componentDidReceiveContext() {
        this.setState({ showModal: this.props.status });
    }


    render() {
        return (

            <Modal show={this.props.status} onHide={this.props.closeAction}>
                <Modal.Header>
                    <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.closeAction}> <img src="images/cross.png" /></button>
                    <h4 className="modal-title">ASSIGNMENT CONFIRMATION </h4>
                    </div>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <div className="modal-body">
                        <p>A confirmation message appears on selection of flat. After confirmation, you will be assigned for the request and this request will not be available for other tech rep to take action on it. </p>
                    </div>
                    <div className="modal-footer">
                        <div className=" col-xs-12 col-sm-12 text-center lastrow">

                            <input type="submit" className="btn save" value="OK" />
                                <input type="button" className="btn genrated" value="CANCEL" />
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

export default connect(mapStateToProps)(AssignmentPopup);

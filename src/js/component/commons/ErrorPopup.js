import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Header from './header/Header';
import HeadTitle from './HeadTitle';
import CustomerBoard from '../customer/CustomerBoard';
import { STRINGS, IMAGES } from './Constants';

class RecentRequest extends Component {
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
                        <button type="button" className="close" onClick={this.props.closeAction}> 
                            <span className="glyphicon glyphicon-remove" />
                        </button>
                        <h4 bsStyle="danger" className="modal-title">
                            {IMAGES[this.props.screen]} Error</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row">
                            <p bsStyle="danger">{this.props.errorMessage}</p>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Header from './header/Header';
import HeadTitle from './HeadTitle';
import CustomerBoard from '../customer/CustomerBoard';

class CreateRequest extends Component {
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
                        <span className="glyphicon glyphicon-remove" /></button>
                    <h4 className="modal-title">REQUEST INTEGRITY TEST CERTIFICATE</h4>
                            <div className="cust-info">
                                <div>Customer NAME: John1,ABC Company</div>

                            </div>

                </Modal.Header>

                <Modal.Body>

                       
                        <div className="modal-body">
                            <div className="certi tabbing_container well">
                                <ul className="nav nav-tabs">
                                    <li className="active">
                                        <a data-toggle="tab" href="#sectionA">METRIC</a>
                                        <span className="chkouter">

                                            <label className="radio-inline" htmlFor="mbar">
<input type="radio" name="Training" id="mbar" value="yes" defaultValue />
                                                MBAR </label>
                                            <label className="radio-inline" htmlFor="kpa">
                                                <input type="radio" name="Training" id="kpa" value="no" />
                                                KPA</label></span> </li>
                                    <li><a data-toggle="tab" href="#sectionA">IMPERIAL</a></li>

                                </ul>
                                <div className="tab-content">
                                    <div id="sectionA" className="tab-pane  in active">

                                        <div className="row">
                                            <form>

                                                <div className="col-md-4">
                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="indus">Application/industry<sup>*</sup></label>
                                                        <select className="name form-control" placeholder="Please Select" id="indus">
                                                            <option>Please Select</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="part-name">Filter Part Name<sup>*</sup></label>
                                                        <input type="text" className="form-control" id="part-name" placeholder="" required="" />
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="housing">Number of Filters in Housing<sup>*</sup></label>
                                                        <input type="text" className="form-control" id="housing" placeholder="" required="" />
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="test-type">Test Type<sup>*</sup></label>
                                                        <select className="name form-control" placeholder="" id="test-type" required="">
                                                            <option>Please Select</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                        </select>
                                                    </div>


                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="fluid">Wetting Fluid<sup>*</sup></label>
                                                        <select className="name form-control" placeholder="Please Select" id="fluid" required="">
                                                            <option>Please Select</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="fluid">Pressure Source<sup>*</sup></label>
                                                        <input type="text" className="form-control" id="part-name" placeholder="" required="" />
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="fluid" className="invisible">Pressure Source<sup>*</sup></label>
                                                        <div className="col-md-12 chkblock">
                                                            <label className="radio-inline" htmlFor="Training-0">
                                                                <input type="radio" name="Training" id="Training-0" value="yes" defaultValue />
                                                                Critical
    </label>
                                                            <label className="radio-inline" htmlFor="Training-1">
                                                                <input type="radio" name="Training" id="Training-1" value="no" />
                                                                Non-Critical
    </label>

                                                            <span className="tooltip"><img src="images/info.png" alt="" />
                                                                <span className="tooltiptext">Tooltip text</span>
                                                            </span>

                                                        </div>
                                                    </div>



                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="exampleInputEmail1">Output Language<sup>*</sup></label>
                                                        <select className="name form-control" placeholder="Please Select" required="">
                                                            <option>Please Select</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-md-12 test" id="competeyes">
                                                        <label htmlFor="exampleInputEmail1">Output Languagetest<sup>*</sup></label>
                                                        <select className="name form-control" placeholder="Please Select" required="">
                                                            <option>Please Select</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                            <option>Name 1</option>
                                                        </select>
                                                    </div>


                                                </div>
                                                <div className="col-sm-4">

                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="fluid">Housing Part Number <sup>*</sup></label>
                                                        <select className="name form-control" placeholder="Please Select" id="part-no" required="">
                                                            <option value="" selected="">Please Select</option>
                                                            <option value="1">Name 1</option>
                                                            <option value="2">Name 1</option>
                                                            <option value="3">Name 1</option>
                                                            <option value="4">Other</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-md-12" id="showMe">
                                                        <label htmlFor="part-name" className="invisible">Additional Volume <sup>*</sup> </label>
                                                        <input type="text" className="form-control" id="add-vol" placeholder="" required="" />
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="part-name">Additional Volume <sup>*</sup> </label>
                                                        <input type="text" className="form-control vol" id="add-vol" placeholder="" required="" /><span>ml</span>
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="part-name">Empty Housing Volume <sup>*</sup> </label>
                                                        <input type="text" className="form-control vol" id="emty-vol" placeholder="" required="" /><span>ml</span>
                                                    </div>
                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="part-name">Paltronic Tubing Length <sup>*</sup> </label>
                                                        <input type="text" className="form-control vol" id="tube" placeholder="" required="" /><span>ml</span>
                                                    </div>
                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="part-name">Test Time<sup>*</sup> </label>
                                                        <input type="text" className="form-control vol" id="time" placeholder="" required="" /><span>min</span>
                                                    </div>

                                                </div>
                                                <div className="form-group col-xs-12 col-sm-12 text-center lastrow" required="">

                                                    
                                                    <a href="recommended-letter.html" type="button" className="btn genrated">generate</a>
                                                </div>

                                            </form>
                                        </div>

                                        {/*<!-- form end -->*/}
              </div>
                                    <div id="sectionB" className="tab-pane fade">
                                        <h3>Section B</h3>
                                        <p>Vestibulum nec erat eu nulla rhoncus fringilla ut non neque. Vivamus nibh urna, ornare id gravida ut, mollis
                  a magna. Aliquam porttitor condimentum nisi, eu viverra ipsum porta ut. Nam hendrerit bibendum turpis,
                  sed molestie mi fermentum id. Aenean volutpat velit sem. Sed consequat ante in rutrum convallis. Nunc facilisis
                  leo at faucibus adipiscing.</p>
                                    </div>


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

export default connect(mapStateToProps)(CreateRequest);

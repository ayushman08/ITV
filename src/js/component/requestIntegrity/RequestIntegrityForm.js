import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../libs/Api'

class RequestIntegrityForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

            housePartList: [],
            applicationIndustry: '',
            wettingFluid: '',
            filterPartName: '',
            pressureSource: '',
            noOfFiltersHousing: '',
            testType: '',
            outputLanguage: '',
            housingPartNumber: '',
            emptyHousingVolume: '',
            additionVolume: '',
            paltronicTubeingLength: '',
            testTime: '10',
            applicationIndustryError: false,
            wettingFluidError: false,
            filterPartNameError: false,
            pressureSourceError: false,
            noOfFiltersHousingError: false,
            testTypeError: false,
            outputLanguageError: false,
            housingPartNumberError: false,
            emptyHousingVolumeError: false,
            additionVolumeError: false,
            paltronicTubeingLengthError: false,
            testTimeError: false,
            applicationIndustryErrorMsg: '',
            wettingFluidErrorMsg: '',
            filterPartNameErrorMsg: '',
            pressureSourceErrorMsg: '',
            noOfFiltersHousingErrorMsg: '',
            testTypeErrorMsg: '',
            outputLanguageErrorMsg: '',
            housingPartNumberErrorMsg: '',
            emptyHousingVolumeErrorMsg: '',
            additionVolumeErrorMsg: '',
            paltronicTubeingLengthErrorMsg: '',
            testTimeErrorMsg: '',
            fieterPartNameAttr: '',
            navActive: true,
            flagShow: false,
            cricFlag: false,
            wettingList: [],
            housingOtherFlag: false,
            hosePartList: [],
            typeTest: [],
            testType: [
                {
                    name: "Water Intrusion Test (WIT)",
                    value: "WIT"
                },
                {
                    name: "Pressure Hold (PH)",
                    value: "PH"
                },
                {
                    name: "Bubble Point (BP)",
                    value: "BP"
                },
                {
                    name: "Forward Flow (FF)",
                    value: "FF"
                }

            ]

        }
        this.handleChange = this.handleChange.bind(this);
        this.generateValue = this.generateValue.bind(this);
        this.filterPartRequest = this.filterPartRequest.bind(this);
    }

    componentDidMount() {
        var that = this;
        $('.chosen-select').chosen().change(
            function (evt) {
                console.log($(this).val());
                var type = $(this).val();
                var testValue = "";
                for (var i = 0; i < type.length; i++) {
                    if (i === (type.length - 1)) {
                        testValue += type[i]
                    } else {
                        testValue += type[i] + ","
                    }

                }
                console.log(testValue);
                that.setState({ typeTest: testValue });
                hiddenDiv = (this.value.toString() === "PH");
                var hiddenDiv = document.getElementById("showMe2");
                var flagShow = (this.value.toString() == "PH") ? true : false;

                var testValue = [
                    {
                        name: "",
                        value: ""
                    },
                    {
                        name: "Pressure Hold (PH)",
                        value: "PH"
                    },
                    {
                        name: "Bubble Point (BP)",
                        value: "BP"
                    },
                    {
                        name: "Forward Flow (FF)",
                        value: "FF"
                    }
                ]
                var witvalue = [
                    {
                        name: "Water Intrusion Test (WIT)",
                        value: "WIT"
                    }
                ]
                if (this.value.toString() == "WIT") {
                    that.setState({ testType: witvalue }, function () {
                        $('.chosen-select').trigger("chosen:updated");
                    })

                } else if (this.value.toString() == "PH" || this.value.toString() == "FF" || this.value.toString() == "BP") {
                    that.setState({ testType: testValue, phDisplay: flagShow }, function () {
                        $('.chosen-select').trigger("chosen:updated");
                    })

                } else {
                    var arr = [];
                    arr.push(witvalue[0]);
                    arr.push(testValue[1]);
                    arr.push(testValue[2]);
                    arr.push(testValue[3]);
                    that.setState({ testType: arr, phDisplay: flagShow }, function () {
                        $('.chosen-select').trigger("chosen:updated");
                    })

                }
            }
        );

        $('.chosen-select').chosen();
        $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
        this.housingPartRequest();
    }

    housingPartRequest() {
        var that = this;
        var url = 'main/getHousingPartNums';
        Api.get(`${url}`).then(response => {
            var housePartData = response.housing_list;
            that.setState({ housePartList: housePartData });
        })


    }

    filterPartRequest(e) {
        var that = this;
        var partNumber = e.target.value;
        if (partNumber) {
            var url = 'main/getWettingFluid/?partNumber=';
            var partNum = partNumber;
            Api.get(`${url}${partNum}`).then(response => {

                var filterData = response.wet_fl;
                console.log(filterData);
                if (filterData.status === false) {
                    that.setState({ wettingList: [] });
                } else {
                    that.setState({ wettingList: filterData });
                }

            })
                .catch((error) => {
                    console.error(url, error.toString());
                });
        }
    }

    handleChange(event) {


        const name = event.target.name;
        const value = event.target.value;
        console.log('handleChange', name, value);

        switch (name) {


            case "housingPartNumber":

                if (value === "other") {
                    this.setState({
                        housingOtherFlag: true,

                    })
                } else {
                    this.setState({
                        housingOtherFlag: false
                    })
                }

                var that = this;
                var url = 'main/getHousingPNDetails?housingType=';
                var housingType = value;
                Api.get(`${url}${housingType}`).then(response => {
                    var housingDetails = response.housing_details;
                    if (housingDetails) {
                        that.setState({ housingDetails: housingDetails.housingVol });
                    }
                })


                this.setState({ housingPartNumber: value })
                break;

            case "filterPartName":
                debugger

                let filterPartNameRegex = "^[a-zA-Z0-9]*$";
                var filterPartNameValid = value.match(filterPartNameRegex);
                this.state.filterPartNameErrorMsg = value ? (!filterPartNameValid ? 'Please Enter Correct Filter Part Name.' : null) : 'Filter Part Name is required.'

                this.setState({
                    filterPartNameError: this.state.filterPartNameErrorMsg ? true : false,
                    filterPartNameErrorMsg: this.state.filterPartNameErrorMsg,
                    filterPartName: value
                })
                break;

            case "noOfFiltersHousing":

                var reg = new RegExp(/^[0-9]\d*(\.\d+)?$/);
                var validate = reg.test(value);
                if (value === "0" || value === "1") {
                    this.setState({ cricFlag: true });
                } else {
                    this.setState({ cricFlag: false });
                }
                //console.log("validateValue  "+validate)
                var noOfFiltersHousingErrorMsg = value ? (!validate ? 'This field accepts number with decimal.' : null) : ''
                //  console.log("pressureSourceErrorMsg" +pressureSourceErrorMsg)
                this.setState({
                    noOfFiltersHousingError: noOfFiltersHousingErrorMsg ? true : false,
                    noOfFiltersHousingErrorMsg: noOfFiltersHousingErrorMsg,
                    noOfFiltersHousing: value
                });



                break;

            case "emptyHousingVolume":

                var reg = new RegExp(/^[1-9]\d*(\.\d+)?$/);
                var validate = reg.test(value);

                //console.log("validateValue  "+validate)
                var emptyHousingVolumeErrorMsg = value ? (!validate ? 'This field accepts number with decimal.' : null) : ''
                //  console.log("pressureSourceErrorMsg" +pressureSourceErrorMsg)
                this.setState({
                    emptyHousingVolumeError: emptyHousingVolumeErrorMsg ? true : false,
                    emptyHousingVolumeErrorMsg: emptyHousingVolumeErrorMsg,
                    emptyHousingVolume: value
                });



                break;

            case "additionVolume":

                var reg = new RegExp(/^[1-9]\d*(\.\d+)?$/);
                var validate = reg.test(value);

                //console.log("validateValue  "+validate)
                var additionVolumeErrorMsg = value ? (!validate ? 'This field accepts number with decimal.' : null) : ''
                //  console.log("pressureSourceErrorMsg" +pressureSourceErrorMsg)
                this.setState({
                    additionVolumeError: additionVolumeErrorMsg ? true : false,
                    additionVolumeErrorMsg: additionVolumeErrorMsg,
                    additionVolume: value
                });

                break;

            case "paltronicTubeingLength":

                var reg = new RegExp(/^[1-9]\d*(\.\d+)?$/);
                var validate = reg.test(value);

                //console.log("validateValue  "+validate)
                var paltronicTubeingLengthErrorMsg = value ? (!validate ? 'This field accepts number with decimal.' : null) : ''
                //  console.log("pressureSourceErrorMsg" +pressureSourceErrorMsg)
                this.setState({
                    paltronicTubeingLengthError: paltronicTubeingLengthErrorMsg ? true : false,
                    paltronicTubeingLengthErrorMsg: paltronicTubeingLengthErrorMsg,
                    paltronicTubeingLength: value
                });
                break;

            case "testTime":

                var reg = new RegExp(/^[1-9]\d*(\.\d+)?$/);
                var validate = reg.test(value);

                //console.log("validateValue  "+validate)
                var testTimeErrorMsg = value ? (!validate ? 'This field accepts number with decimal.' : null) : ''
                //  console.log("pressureSourceErrorMsg" +pressureSourceErrorMsg)
                this.setState({
                    testTimeError: testTimeErrorMsg ? true : false,
                    testTimeErrorMsg: testTimeErrorMsg,
                    testTime: value
                });
                break;

            // case "filterPartName":
            // this.setState({filterPartName: value });
            // break;
            case "applicationIndustry":
                this.setState({ applicationIndustry: value });
                break;

            case "wettingFluid":
                debugger
                this.setState({ wettingFluid: value });
                break;

            case "pressureSource":
                this.setState({ pressureSource: value });
                break;

            case "outputLanguage":
                this.setState({ outputLanguage: value });
                break;



            default:
                break;
        }
    }

    generateValue() {
        debugger

        // var farma = document.getElementById("indus").value;
        // testTypeOption = document.getElementById("testType").value;
        debugger
        var data = {
            noOfFiltersHousing: this.state.noOfFiltersHousing,
            name: this.props.contactName,
            // filterpart: this.state.fieterPartNameAttr,
            applicationIndustry: this.state.applicationIndustry,
            filterPartName: this.state.filterPartName,
            paltronicTubeingLength: this.state.paltronicTubeingLength,
            additionVolume: this.state.additionVolume,
            emptyHousingVolume: this.state.housingDetails,
            testTime: this.state.testTime,
            housingPartNumber: this.state.housingPartNumber,
            outputLanguage: this.state.outputLanguage,
            pressureSource: this.state.pressureSource,
            wettingFluid: this.state.wettingFluid,
            testType: this.state.typeTest

        }
        // var url = "http://146.20.3.64:8080/pall_itv/main/getTestLimits";
        // var params = {

        //     "pres_unit": "kpa",
        //       "app_ind": "biopharma",
        //       "fil_prt_no": "AVF021V002PV",
        //       "no_filt": "2",
        //       "test_typ": "PH",
        //       "wet_fluid": "70/30 ETHANOL/WATER",
        //       "pres_sorce": "air",
        //       "critical": "C",
        //       "lang": "US",
        //       "hous_prt": "05FT111",
        //       "empt_hous_vol": "7000",
        //       "add_vol": "100",
        //       "pal_tub_len": "100",
        //       "tst_time": "10"

        //     }
        // Api.post(`${url}`,params).then(response => {

        //     if(response){
        //         // window.location.href = "/#/pdf";
        //         console.log("responseeeeeeeee" +response)

        //     }

        // })
        //     .catch((error) => {
        //         console.error(url, error.toString());
        //     });

        localStorage.setItem('pdf', JSON.stringify(data));
        window.location.href = "/#/pdf";

    }

    render() {
        var that = this;
        console.log('render', that.state);
        //   if(fetch){
        var housePartListOption = this.state.housePartList.map((value, key) => {
            return (<option key={key} value={value}>{value}</option>)
        }

        )
        // }
        return (
            <div>
                <div className="certi tabbing_container ">
                    <h5 className="tabbinghead"> Pressure Unit*</h5>
                    <ul className="nav nav-tabs">
                        <li onClick={() => { this.setState({ navActive: true }) }} className={this.state.navActive ? "active" : ""}><a>METRIC</a>
                            <span className="chkouter">
                                <label className="radio-inline" htmlFor="mbar">
                                    <input type="radio" name="Training" id="mbar" value="yes" defaultChecked="checked" />MBAR</label>
                                <label className="radio-inline" htmlFor="kpa">
                                    <input type="radio" name="Training" id="kpa" value="no" />
                                    KPA</label></span>
                        </li>

                        <li className={this.state.navActive ? "" : "active"}><a onClick={() => { this.setState({ navActive: false }) }} data-toggle="tab" >IMPERIAL</a></li>

                    </ul>
                    <div className="tab-content">
                        <div id="sectionA" className="tab-pane  in active">

                            <div className="row">
                                <form className="custinfo-form">
                                    <div className="well firstbox">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="indus">Application/industry<sup>*</sup></label>
                                                <select className="name form-control" placeholder="Please Select" id="indus" name="applicationIndustry" value={this.props.value} onChange={this.handleChange}>
                                                    <option>Please Select</option>
                                                    <option>Biopharma </option>
                                                    <option>Food & Beverage</option>

                                                </select>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label htmlFor="part-name">Filter Part Name<sup>*</sup></label>
                                                <input type="text" className="form-control" id="part-name" placeholder="" required="" name="filterPartName" onBlur={this.filterPartRequest} value={this.state.value} onChange={this.handleChange} />
                                                {this.state.filterPartNameError ? <span ref="nameError" style={{ color: "red", fontSize: "13px", fontStyle: "italic" }}>{this.state.filterPartNameErrorMsg}</span> : ''}
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label htmlFor="housing">Number of Filters in Housing<sup>*</sup></label>
                                                <input type="text" className="form-control" id="housing" placeholder="" required="" name="noOfFiltersHousing" value={this.state.noOfFiltersHousing} onChange={this.handleChange} />
                                                {this.state.noOfFiltersHousingError ? <span ref="nameError" style={{ color: "red", fontSize: "13px", fontStyle: "italic" }}>{this.state.noOfFiltersHousingErrorMsg}</span> : ''}
                                            </div>

                                            <div className="form-group col-md-12">

                                                <label htmlFor="test-type">Test Type<sup>*</sup></label>



                                                <select data-placeholder="Select" multiple className="chosen-select name form-control" tabIndex="8" id="testType" name="testType" value={this.state.value} onChange={this.handleChange}>
                                                    <option value=""></option>
                                                    {
                                                        this.state.testType.map((value, key) => {
                                                            return (<option key={key} value={value.value}>{value.name} </option>)
                                                        }

                                                        )
                                                    }


                                                </select>
                                            </div>


                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="fluid">Wetting Fluid<sup>*</sup></label>
                                                <select className="name form-control" placeholder="Please Select" id="fluid" required="" name="wettingFluid" value={this.state.value} onChange={this.handleChange}>
                                                    <option>Please Select</option>
                                                    {
                                                        this.state.wettingList.map((value, key) => {
                                                            return (<option key={key} value={value}>{value} </option>)
                                                        }

                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="presure">Pressure Source<sup>*</sup></label>
                                                <select className="name form-control" placeholder="Please Select" id="fluid" required="" name="pressureSource" value={this.state.value} onChange={this.handleChange}>
                                                    <option>Please Select</option>
                                                    <option>Air</option>
                                                    <option>Nitrogen</option>
                                                </select>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label htmlFor="" className="invisible">Pressure Source<sup>*</sup></label>
                                                <div style={{ "visibility": this.state.cricFlag ? "hidden" : "visible" }} className="col-md-12 chkblock">
                                                    <label className="radio-inline" htmlFor="Training-0">
                                                        <input type="radio" name="Training" id="Training-0" value="yes" defaultChecked="checked" />
                                                        Critical
                                                                    </label>
                                                    <label className="radio-inline" htmlFor="Training-1">
                                                        <input type="radio" name="Training" id="Training-1" value="no" />
                                                        Non-Critical
                                                                </label>

                                                    <span className="tooltip"><img src="images/info.png" />
                                                        <span className="tooltiptext">Tooltip text</span>
                                                    </span>

                                                </div>
                                            </div>



                                            <div className="form-group col-md-12">
                                                <label htmlFor="out-lng">Output Language<sup>*</sup></label>
                                                <select className="name form-control" placeholder="Please Select" required="" id="out-lng" name="outputLanguage" value={this.state.value} onChange={this.handleChange}>
                                                    <option>Please Select</option>
                                                    <option>English</option>
                                                    <option>French</option>
                                                    <option>UK English</option>
                                                    <option>Japan</option>
                                                    <option>Italian</option>
                                                    <option>German</option>
                                                    <option>Spanish</option>
                                                </select>
                                            </div>



                                        </div>
                                    </div>



                                    <div className="well firstbox boxtwo" style={{ "display": this.state.phDisplay ? "block" : "none" }}>

                                        <div className="col-sm-6 ">

                                            <div className="form-group col-md-12">
                                                <label htmlFor="hpart-no">Housing Part Number <sup>*</sup></label>
                                                <select className="name form-control" placeholder="Please Select" id="hpart-no" required="" name="housingPartNumber" value={this.state.value} onChange={this.handleChange}>
                                                    <option value="" >Please Select</option>
                                                    {
                                                        housePartListOption
                                                    }
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div style={{ "display": this.state.housingOtherFlag ? "block" : "none" }} className="form-group col-md-12" >
                                                <label htmlFor="hpart-no">Other <sup>*</sup></label>
                                                <input type="text" className="form-control" id="add-vol" placeholder="" required="" />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label htmlFor="add-vol">Additional Volume <sup>*</sup> </label>
                                                <input type="text" className="form-control vol" id="add-vol" placeholder="" required="" name="additionVolume" value={this.state.value} onChange={this.handleChange} /><span>ml</span>
                                                {this.state.additionVolumeError ? <span ref="pressureSourceError" style={{ color: "red", fontSize: "13px", fontStyle: "italic" }}>{this.state.additionVolumeErrorMsg}</span> : ''}
                                            </div>



                                        </div>


                                        <div className="col-sm-6 ">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="emty-vol">Empty Housing Volume <sup>*</sup> </label>
                                                <input type="text" className="form-control vol" id="emty-vol" placeholder="" required="" name="emptyHousingVolume" value={this.state.housingDetails} readOnly onChange={this.handleChange} /><span>ml</span>

                                                {this.state.emptyHousingVolumeError ? <span ref="pressureSourceError" style={{ color: "red", fontSize: "13px", fontStyle: "italic" }}>{this.state.emptyHousingVolumeErrorMsg}</span> : ''}
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="tube">Paltronic Tubing Length <sup>*</sup> </label>
                                                <input type="text" className="form-control vol" id="tube" placeholder="" required="" name="paltronicTubeingLength" value={this.state.value} onChange={this.handleChange} /><span>ml</span>
                                                {this.state.paltronicTubeingLengthError ? <span ref="pressureSourceError" style={{ color: "red", fontSize: "13px", fontStyle: "italic" }}>{this.state.paltronicTubeingLengthErrorMsg}</span> : ''}
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="time">Test Time<sup>*</sup> </label>
                                                <input type="text" className="form-control vol" id="time" placeholder="" required="" name="testTime" value={this.state.testTime} onChange={this.handleChange} /><span>min</span>
                                                {this.state.testTimeError ? <span ref="pressureSourceError" style={{ color: "red", fontSize: "13px", fontStyle: "italic" }}>{this.state.testTimeErrorMsg}</span> : ''}
                                            </div>


                                        </div>

                                        <div className="col-sm-12 ">


                                        </div>

                                    </div>


                                    <div className="form-group col-xs-12 col-sm-12 text-center lastrow" required="">


                                        <a type="button" onClick={() => { that.generateValue() }} className="btn genrated sitebtn">generate</a>
                                    </div>

                                </form>
                            </div>

                        </div>
                        <div id="sectionB" className="tab-pane fade">
                            <h3>Section B</h3>
                            <p>Vestibulum nec erat eu nulla rhoncus fringilla ut non neque. Vivamus nibh urna, ornare
                                        id gravida ut, mollis a magna. Aliquam porttitor condimentum nisi, eu viverra ipsum
                                        porta ut. Nam hendrerit bibendum turpis, sed molestie mi fermentum id. Aenean volutpat
                                        velit sem. Sed consequat ante in rutrum convallis. Nunc facilisis leo at faucibus
                                        adipiscing.</p>
                        </div>


                    </div>
                </div>



            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.users
    };
}

export default connect(mapStateToProps)(RequestIntegrityForm);
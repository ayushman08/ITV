import React, { Component } from 'react';


class HeaderSideOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userEmail: sessionStorage.getItem('email')
        };
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-4" >
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">

                                
                                <li className="dropdown user user-menu">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <span style={{ float: 'left', width: '100%' }}>
                                            <small>Welcome</small></span>
                                        <span className="hidden-xs adminname">{this.state.userEmail}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" data-toggle="control-sidebar"><i className="fa fa-power-off" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default HeaderSideOptions;

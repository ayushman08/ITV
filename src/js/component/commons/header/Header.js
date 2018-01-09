import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderSideOptions from './HeaderSideOptions';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main" style={{ width: '97%', margin: '0 auto' }}>
                <div className="row">
                    <div className="col-xs-12 col-sm-4" ><div className="admin-name">
                        <NavLink to="/Home" style={{ fontSize: '30px', cursor: 'pointer', float: 'left', width: '40px' }}>&#9776; </NavLink>
                        <div style={{ float: 'left', width: '77%', marginTop: '7px' }}>
                            <span>INTEGRITY TEST LIMIT CALCULATOR</span>
                            <span>Powered by Pall Corporation</span></div>

                    </div></div>
                    <div className="col-xs-12 col-sm-4 page-name" >{(this.props.dashboardTitle) ? 'DASHBOARD' : ''}</div>
                    <HeaderSideOptions />
                </div>
            </div>
        );
    }
}


export default Header;

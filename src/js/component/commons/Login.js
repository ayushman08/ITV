import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    redirect() {
        sessionStorage.setItem('email', this.state.username);
            this.props.history.push('/home');
        }
    

    render() {
        return (
            <div className="wrapper">
         
                {/* <div className="left-block col-md-7">
                    <div className="row">
                        <div className="inner-wrapper">
                            <div className="col-md-12 logo"><img src="./images/login/pall-logo.png" /></div>
                        </div>
                        <div className="login-banner"><img src="./images/login/pic1.png" /></div>
                        <div className="inner-wrapper"><p className="login-para">Pall Corporation is a filtration, separation
                            and purification leader providing
                            solutions to meet the critical fluid management needs of customers across the broad spectrum
                            of life sciences and industry. Pall works with customers to advance health, safety and
                            environmentally responsible technologies. The Company's engineered products enable process
                            and product innovation and minimize emissions and waste </p>
                        </div>
                        <div className="inner-wrapper"><p className="copyright">Copyright 2017 Pall Corporation. All rights reserved. <a href="#">Terms and Conditions of Use</a></p>
                        </div>
                    </div>
                </div> */}
                <div className="right-block col-md-12">
                    <div className="row dot"><img src="images/login/dots.png" /></div>
                    <div className="row">
                        <div className="col-md-12" style={{ height: '800px' }}>
                            <div id="login-form" className="form-container" >
                                <div className="row form-heading">
                                    <p className="login_head">integrity test limit calculator</p>
                                    <span className="right-logo"><img src="images/login/logo2.png" /></span>
                                    <div className="form-title">
                                        <span>Login to your pall account</span>
                                    </div>
                                </div>
                                <form id="loginform" className="form-horizontal" role="form">
                                    <div className="input-group">
                                        <input id="login-username" onChange={(e) => { this.setState({ username: e.target.value }); }} className="form-control" name="username" placeholder="username " type="text" />
                                    </div>
                                    <div className="input-group">

                                        <input id="login-password" className="form-control" name="password" placeholder="password" type="password" />
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12 controls">
                                            <input onClick={() => { this.redirect(); }} className="login-btn" type="button" value="Login" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12 control">
                                            <div >
                                                <a href="#"> Forgot password?</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;

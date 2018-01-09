import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../commons/Constants';

class TopNav extends Component {
    constructor(props) {
        super(props);
    }

    navigate(value) {
        this.props.history.push(NAVIGATION[value]);
        window.location.reload();
    }

    render() {
        const that = this;
        return (
            <div className="row">
                <div className="col-md-12 top-bar">
                    <ul className="btn-bar">
                        {this.props.navElement.map((value, key) => (
                                <li key={key}><button onClick={that.navigate.bind(that, value.text)} type="button" className={'btn btn-block btn-' + value.type}>{value.text}</button></li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        navElement: state.techRep.navElement
    };
}

export default connect(mapStateToProps)(TopNav);

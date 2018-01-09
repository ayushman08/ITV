import React, { Component } from 'react';


class HeadTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-12 top-bar">

                    <p>{this.props.title}</p>

                </div>
            </div>

        );
    }
}


export default HeadTitle;

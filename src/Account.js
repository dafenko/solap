
import React, { Component } from 'react';
import './Account.css';

function Account(props) {
    return (
      <div className="account-row">
        <button className="Account" onClick={props.onClick}>
            {props.name}
        </button>
        15
      </div>
    );
}

class Accounts extends Component {
    render () {
        return (
            <div>
            <Account 
                name="xsdddddd"
            />
            </div>
        );
    }
}

export default Accounts;
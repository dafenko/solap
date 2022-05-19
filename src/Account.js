
import React, { Component } from 'react';
import * as solanaWeb3 from '@solana/web3.js';
import * as fs from 'fs';
import './Account.css';

class Account extends Component {

    getBalance() {
        fs.readFile(this.props.path, (err, data) => {
            if (err) throw err;
            let keypair = JSON.parse(data);
            console.log(student);
        });
    }

    render() {
        return (
        <div className="account-row">
            <button className="account-name">
                {this.props.name}
            </button>
            <button className="account-balance"> 
                {this.getBalance()} 
            </button>
        </div>
        );
    };
}

class Accounts extends Component {
    render () {
        return (
            <div>
            <Account 
                name="xsdddddd"
                path="/home/dafe/.solana-devel/solana-devel-account.json"
            />
            <Account 
                name="aaaaaaa"
                balance="14"
            />
            </div>
        );
    }
}

export default Accounts;
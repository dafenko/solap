
import React, { Component } from 'react';
import './Account.css';
const { URL, URLSearchParams } = require('url');

class Account extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
            name: props.name,
            balance: 0,
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch("/api/account/balance?account=" + this.state.name)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                name: json.name,
                balance: json.balance,
                DataisLoaded: true
            });
        })
        
    };

    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
            
        return (
        <div className="account-row">
            <button className="account-name">
                {this.state.name}
            </button>
            <button className="account-balance"> 
                {this.state.balance} 
            </button>
        </div>
        );
    };
}

class Accounts extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
            accounts: [],
        };
    }

    componentDidMount() {
        fetch("/api/accounts")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                accounts: json,
            });
        })
        
    };

    renderAccount(fileName) {
        return (
            <Account 
                name={fileName}
            />
        )
    }

    render () {
        return (
            <div>
            {this.state.accounts.map((accountName, i) => {
                return(<Account key={accountName} name={accountName} />)
            })}
            </div>
        );
    }
}

export default Accounts;
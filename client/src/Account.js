
import React, { Component } from 'react';
import './Account.css';

class Account extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
            name: "",
            balance: 0,
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch("/api/account/balance")
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
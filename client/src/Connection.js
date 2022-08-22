
import React, { Component } from 'react';
const { URL, URLSearchParams } = require('url');
import Select from 'react-select';
 
class Connection extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
            activeConnection: -1,
            availableConnections: [],
            dataIsLoaded: false
        };
    }

    componentDidMount() {
        fetch("/api/connections")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                availableConnections: json.availableConnections,
                activeConnection: json.active,
                dataIsLoaded: true
            });
        });
    };

    setActiveConnection = (index, value) => {
        fetch(`/api/connections/active`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"index": index, "value": value})
          })
        .then((res) => console.log(res));
    }

    handleChange = selectedOption => {
        console.log(`Option selected:`, selectedOption);
        this.setActiveConnection(selectedOption.value, selectedOption.label);
    };

    render() {
        const { availableConnections, activeConnection, dataIsLoaded} = this.state;
        if (!dataIsLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;

        var connections = [];

        availableConnections.forEach((invalue, inindex) => {
            connections.push({value: inindex, label: invalue});
        });

        console.log(activeConnection);
        console.log(connections);
        console.log(connections[activeConnection]);

        return (
            <Select 
                options={connections}
                defaultValue={{label: connections[activeConnection].label, value: connections[activeConnection].value}}
                onChange={this.handleChange}
            />
        );
    };
}

export default Connection;
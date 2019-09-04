import React, { Component } from "react";
import EmployeePages from "./components/EmployeePages";
import "./App.css";

class App extends Component {
  state = {data: []}
  
  componentDidMount() {
    this.getEmployeeData()
  }

  getEmployeeData = () => {
    let data;
    fetch("http://localhost:3000/employees")
    .then(function(response) {
      return response.json();
    })
    .then(myJson => data = myJson)
    .then(() => this.setState({data}));
  }

  waitForData() {
    if (Object.keys(this.state.data).length > 0) {
      return (<div className="App">
      <EmployeePages employees={this.state.data} />
    </div>)
    } else {
      return <h2>Loading, please wait.</h2>;
    }
  }

  render() {
    return (
      this.waitForData()
    );
  }
}

export default App;

import React, { Component } from "react";
// import logo from '../logo.svg';
import EmployeePages from "./EmployeePages";
import "../App.css";
import employees from "./sample-employees";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <EmployeePages employees={employees} />
      </div>
    );
  }
}

export default App;

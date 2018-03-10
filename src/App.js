import React, { Component } from "react";
import "./App.css";
import AddressTable from "./Components/AddressTable";
import data from "./data";
import ContactDetailsModal from "./Components/ContactDetailsModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      contacts: data,
      contactDetails: {
        data: [
          {
            guid: "27ca13da-01f2-4d96-9144-40c0cd8529a9",
            isActive: true,
            balance: "$2,831.50",
            picture: "http://placehold.it/32x32",
            age: 40,
            eyeColor: "blue",
            name: "Mullen Kemp",
            gender: "male",
            company: "DIGIGEN",
            email: "mullenkemp@digigen.com",
            phone: "+1 (920) 478-3609",
            address: "797 Bushwick Avenue, Monument, Palau, 8479",
            about:
              "Commodo in nostrud ex ea pariatur elit ex tempor. Excepteur esse officia quis adipisicing dolor aliqua deserunt voluptate eiusmod veniam excepteur ea. Amet mollit aliquip eiusmod occaecat anim mollit eiusmod.\r\n",
            registered: "2015-03-21T04:02:32 -01:00",
            latitude: -48.05881,
            longitude: 155.038239
          }
        ],
        error: "Ok"
      }
    }
  }

  render() {
    return <div className="App container">
        <header className="App-header">
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand">
              <img src="https://www.doublestruck.co.uk/wp-content/themes/html5blank-doublestruck/img/logo-ds.svg" width="150" height="auto" className="d-inline-block align-top" alt="logo" />
              Super Address Book
            </a>
            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                <i className="material-icons">search</i>
              </button>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
          </nav>
        </header>
        <ContactDetailsModal contactDetails={this.state.contactDetails.data[0]} />
        <AddressTable contacts={this.state.contacts} />
        {this.state.modal && <div className="modal-backdrop fade show" />}
      </div>;
  }
}

export default App;

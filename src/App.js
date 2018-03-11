import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import AddressTable from "./Components/AddressTable";
// import data from "./data";
import ContactDetailsModal from "./Components/ContactDetailsModal";

const apiURL = "https://pass.doublestruck.eu/test/get.php";
const authURL = "https://pass.doublestruck.eu/test/auth.php";

// get the auth key using axios
const getKey = () =>
  axios
    .get(authURL, { params: { u: "cwatson1988@gmail.com", p: "p4ssw0rd" } })
    .then(function(response) {
      const key = response.data.authenticationkey;
      // console.log(response);
      return key;
    })
    .catch(function(error) {
      console.log(error);
    });

const getAllContacts = authenticationkey =>
  axios
    .get(apiURL, { params: { k: authenticationkey } })
    .then(function(response) {
      // console.log(response);
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });

const getSearchContacts = (searchString, authenticationkey) =>
  axios
    .get(apiURL, { params: { search: searchString, k: authenticationkey } })
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });

const getContactDetails = (guid, authenticationkey) =>
  axios
    .get(apiURL, { params: { guid: guid, k: authenticationkey } })
    .then(function(response) {
      // console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });

// begin react
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      modal: false,
      contacts: null,
      contactDetails: {
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
    };

    this.searchContacts = this.searchContacts.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
  }

  componentWillMount() {
    // before the component mounts get the contacts from the api using an immediatley invoked function
    (async () => {
      const key = await getKey(); // wait untill the key has been retrieved or it will be undefined
      getAllContacts(key).then(data => {
        this.setState({ contacts: data });
      });
    })();
  }

  updateSearchValue = event => {
    this.setState({ search: event.target.value });
  };

  searchContacts = async event => {
    event.preventDefault();
    const searchString = this.state.search;
    //    if (this.state.search === '' ){
    //   const getAllContacts = async () => {
    //     const key = await getKey(); // wait untill the key has been retrieved or it will be undefined
    //     getAllContacts(key).then(data => {
    //       this.setState({ contacts: data });
    //     });
    //   }
    //   getAllContacts()
    // } else {
    const key = await getKey(); // wait untill the key has been retrieved or it will be undefined
    getSearchContacts(searchString, key).then(res => {
      const data = res.data;
      this.setState({ contacts: data });
    });
    // }
  };

  updateContactDetails = async (contactUID, updatedName) => {
    const key = await getKey();
    return getContactDetails(contactUID, key).then(res => {
      const data = { ...res.data.data[0] };
      this.setState({ contactDetails: data });
    });
  };

  render() {
    return <div className="App container">
        <div className="row">
          <header className="App-header col-12">
            <nav className="navbar navbar-light bg-light">
              <a className="navbar-brand">
                <img src="https://www.doublestruck.co.uk/wp-content/themes/html5blank-doublestruck/img/logo-ds.svg" width="150" height="auto" className="d-inline-block align-top" alt="logo" />
              </a>
              <h1 className="App-title">Super Address Book</h1>
              <form className="form-inline my-2 my-lg-0" onSubmit={this.searchContacts}>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                  <i className="material-icons">search</i>
                </button>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" search={this.state.search} onChange={this.updateSearchValue} />
              </form>
            </nav>
          </header>
        </div>
        <div className="row">
          {/* make sure the api data has loaded before loading the DOM element */
          this.state.contacts && <AddressTable contacts={this.state.contacts} updateContactDetails={this.updateContactDetails} />}
        </div>
        <ContactDetailsModal contactDetails={this.state.contactDetails} />
        {this.state.modal && <div className="modal-backdrop fade show" />}
      </div>;
  }
}

export default App;

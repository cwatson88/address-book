import React, { Component } from "react";

import bull from "../profileIcons/bull.svg";
import chick from "../profileIcons/chick.svg";
import crab from "../profileIcons/crab.svg";
import fox from "../profileIcons/fox.svg";
import hedgehog from "../profileIcons/hedgehog.svg";
import hippopotamus from "../profileIcons/hippopotamus.svg";
import koala from "../profileIcons/koala.svg";
import lemur from "../profileIcons/lemur.svg";
import tiger from "../profileIcons/tiger.svg";
import zebra from "../profileIcons/zebra.svg";

class AddressTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: props.contacts.data,
      emailAtoZ: false,
      nameAtoZ: true
    };

    this.sortContacts = this.sortContacts.bind(this);
  }

  /**
   * sortContacts()
   *
   * @memberof AddressTable
   *
   * Sort depending on the string passed in, this could be either email or name (type of Arrray).
   * 
   * sortDirection argument will be passed the state for either this.state.emailAtoZ or nameAtoZ this will allow the function to know if the email or name is sorted AtoZ (true) or ZtoA (false) 
   *
   */
  sortContacts(elementName, sortDirection) {
    let contactsArray = { ...this.state }; // get a deep copy of the state data to avoid state mutation
    if (sortDirection) {
      contactsArray = contactsArray.contacts.sort((a, b) =>
        a[elementName].localeCompare(b[elementName])
      );
    } else {
      contactsArray = contactsArray.contacts.sort((a, b) =>
        b[elementName].localeCompare(a[elementName])
      );
    }

    this.setState({ contacts: contactsArray });
  }

  render() {
    // functions

    const getCompanyName = email => {
      // get the company name from the email address and then convert the first letter to upper case
      const regex = /(?=)[^@]*(?=\.)/g; // get everything after the @ and before the . in the email
      const regexResult = email.match(regex)[0];
      const company =
        regexResult.charAt(0).toUpperCase() + regexResult.substr(1);

      return company;
    };

    const profileSVG = [
      bull,
      chick,
      crab,
      fox,
      hedgehog,
      hippopotamus,
      koala,
      lemur,
      tiger,
      zebra
    ];

    const profilePicture = profileImageArray =>
      profileSVG[
        Math.floor(Math.random() * Math.floor(profileImageArray.length))
      ];

    // jsx
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th name="picture" scope="col">
                Picture
              </th>
              <th
                onClick={this.sortContacts.bind(this, "name")}
                name="name"
                scope="col"
              >
                Name
              </th>
              <th
                onClick={this.sortContacts.bind(this, "email")}
                name="email"
                scope="col"
              >
                Email
              </th>
              <th name="Company" scope="col">
                Company
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map(person => {
              return (
                <tr
                  key={person.guid}
                  data-toggle="modal"
                  data-target="#contactModal"
                >
                  <td>
                    <img alt="profile" src={profilePicture(profileSVG)} />
                  </td>
                  <td>{person.name}</td>
                  <td>{person.email}</td>
                  <td>{getCompanyName(person.email)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AddressTable;

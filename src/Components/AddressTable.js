import React, { Component } from "react";
import PropTypes from "prop-types";

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

// array of the profile images that are imported above
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

/**
 * profilePicture:
 * get a random picture from the list and return it to be added to the page
 *
 * @param {array} profileImageArray
 */
const profilePictureCreator = profileImageArray =>
  profileSVG[Math.floor(Math.random() * Math.floor(profileImageArray.length))];

//reactClass start
class AddressTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: props.contacts.data,
      sortAtoZ: {
        email: false,
        name: false
      }
    };

    this.sortContacts = this.sortContacts.bind(this);
    this.getContactDetails = this.getContactDetails.bind(this);
  }

  componentDidMount() {
    // when the AddressTable is mounted as a component add a new attribute to the contacts object
    // for a profile picture
    const contacts = this.props.contacts.data.map(contact => {
      contact.profilePicture = profilePictureCreator(profileSVG); // use the picture randomizer above to creat profile pictures
      return contact;
    });
    this.setState({ contacts });
  }

  // used to update the local state - ideally lift the state into the parent component to avoid this
  componentWillReceiveProps(nextProps) {

    // when the AddressTable props are updated, update the state and add the profile pictures
    const contacts = nextProps.contacts.data.map(contact => {
      contact.profilePicture = profilePictureCreator(profileSVG); // use the picture randomizer above to creat profile pictures
      return contact;
    });
    this.setState({
      contacts
    });
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

    // if the element name is true ie email or name
    if (this.state.sortAtoZ[elementName]) {
      //sort the conatcts is AtoZ order
      contactsArray = contactsArray.contacts.sort((a, b) =>
        a[elementName].localeCompare(b[elementName])
      );
      //   update the state with the new contacts array and set the elementName to false eg: sortAtoZ.name: false
      this.setState({
        contacts: contactsArray,
        sortAtoZ: { [elementName]: false }
      });
    } else {
      //same as above but in ZtoA order
      contactsArray = contactsArray.contacts.sort((a, b) =>
        b[elementName].localeCompare(a[elementName])
      );
      this.setState({
        contacts: contactsArray,
        sortAtoZ: { [elementName]: true }
      });
    }
  }

  getContactDetails(guid, name) {
    // console.log(guid, name);
    this.props.updateContactDetails(guid, name);
  }

  render() {
    // functions

    /**
     * getComapanyName:
     * the company name is taken from the email address
     *
     * @param {string} email
     */
    const getCompanyName = email => {
      // get the company name from the email address and then convert the first letter to upper case
      const regex = /(?=)[^@]*(?=\.)/g; // get everything after the @ and before the . in the email
      const regexResult = email.match(regex)[0];
      const company =
        regexResult.charAt(0).toUpperCase() + regexResult.substr(1); // uppercase the first letter of the company

      return company;
    };

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
                className="clickable interactive-header"
              >
                <span>Name</span>
                {this.state.sortAtoZ.name ? (
                  <i className="material-icons">arrow_drop_up</i>
                ) : (
                  <i className="material-icons">arrow_drop_down</i>
                )}
              </th>
              <th
                onClick={this.sortContacts.bind(this, "email")}
                name="email"
                scope="col"
                className="clickable interactive-header"
              >
                <span>Email</span>
                {this.state.sortAtoZ.email ? (
                  <i className="material-icons">arrow_drop_up</i>
                ) : (
                  <i className="material-icons">arrow_drop_down</i>
                )}
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
                  onClick={this.getContactDetails.bind(
                    this,
                    person.guid,
                    person.name
                  )}
                  key={person.guid}
                  data-toggle="modal"
                  data-target="#contactModal"
                  className="clickable"
                >
                  <td>
                    <img alt="profile" src={person.profilePicture} />
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

AddressTable.propTypes = {
  contacts: PropTypes.object,
  contactDetails: PropTypes.func
};

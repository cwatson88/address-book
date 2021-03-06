import React from "react";
import PropTypes from "prop-types";
import GoogleMap from "./GoogleMap";

/**
 * formatDate -- type:function:
 * Take the date string that is an non date object and split it into date and time
 *
 * @param {string} dateString
 */
const formatDate = dateString => {
  const formatedDateString = dateString.replace(" ", ""); // remove the white space or the date cannot be formatted properley

  // change the format of the date to be in date , time e.g. 22/02/18, 13:00
  let dateAndTime = new Date(formatedDateString).toLocaleString();

  dateAndTime = dateAndTime.split(",");
  //split will create an array with the date and time values
  const date = dateAndTime[0];
  const time = dateAndTime[1];

  // es6 object no need to declare the values of the same name
  return { date, time };
};

const ContactDetailsModal = props => {
  // define contactDetails from props.contactDetails with es6 destructuring
  const { contactDetails } = props;

  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        className={"modal fade show"}
        id="contactModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="contactModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <img
                alt="profile pic"
                className={"modal-header__profile-image"}
                src={contactDetails.picture}
              />
              <h5 className="modal-title" id="exampleModalLongTitle">
                {contactDetails.name}
              </h5>
              <span>
                {// if the person is active then show a green dot if not show a red one
                contactDetails.isActive ? (
                  <span className="contact-online">
                    <i className="material-icons">notifications</i> <br />Online
                  </span>
                ) : (
                  <span className="contact-offline">
                    <i className="material-icons">notifications_off</i> <br />Offline
                  </span>
                )}
              </span>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <i className="material-icons">child_care</i>
                <b>Age:</b> <br />{" "}
                <span className="contact__details">{contactDetails.age}</span>
              </p>
              <p>
                <i className="material-icons">visibility</i>
                <b>Eye Colour:</b> <br />{" "}
                <span className="contact__details">
                  {contactDetails.eyeColor}
                </span>
              </p>
              <p>
                <i className="material-icons">accessibility</i>
                <b>Gender: </b> <br />
                <span className="contact__details">
                  {contactDetails.gender}
                </span>
              </p>
              <p>
                <i className="material-icons">business</i>
                <b>Company: </b> <br />
                <span className="contact__details">
                  {contactDetails.company}
                </span>
              </p>
              <p>
                <i className="material-icons">email</i>
                <b>Email: </b> <br />
                <span className="contact__details">
                  <a href={`mailto:contactDetails.email`}>
                    {contactDetails.email}
                  </a>
                </span>
              </p>
              <p>
                <i className="material-icons">phone</i>
                <b>Phone:</b> <br />{" "}
                <span className="contact__details">
                  <a href={`tel:${contactDetails.phone}`}>
                    {contactDetails.phone}
                  </a>
                </span>
              </p>
              <p>
                <i className="material-icons">assignment</i>
                <b>Address:</b> <br />{" "}
                <span className="contact__details">
                  {contactDetails.address}
                </span>
              </p>
              <p>
                <i className="material-icons">account_box</i>
                <b>About: </b> <br />
                <span className="contact__details">{contactDetails.about}</span>
              </p>
              <p>
                <i className="material-icons">date_range</i>
                <b>Registered:</b> <br />{" "}
                <span className="contact__details">
                  {
                    <span>
                      on - <i>{formatDate(contactDetails.registered).date}</i>{" "}
                      at: <i>{formatDate(contactDetails.registered).time}</i>
                    </span>
                  }
                </span>
              </p>
              <p>
                <i className="material-icons">person_pin_circle</i>
                <b>LatLong: </b> <br />
                <GoogleMap
                  coordinates={[
                    contactDetails.latitude,
                    contactDetails.longitude
                  ]}
                />
              </p>
              <p>
                <i className="material-icons">attach_money</i>
                <b>Balance: </b> <br />
                <span className="contact__details">
                  {contactDetails.balance}
                </span>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsModal;

ContactDetailsModal.propTypes = {
  contactDetails: PropTypes.object
};

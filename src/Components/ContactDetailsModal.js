import React from "react";

const ContactDetailsModal = (props) => {
/*
            guid: "27ca13da-01f2-4d96-9144-40c0cd8529a9", // key
            isActive: true, // green dot top right
            balance: "$2,831.50", //bottom of the list
            picture: "http://placehold.it/32x32", // top right next to name in circle
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

            */
           // define contactDetails from props.contactDetails with es6 destructuring
           const {contactDetails} = props;

  return <div>
      {/* <!-- Modal --> */}
      <div className={"modal fade show"} id="contactModal" tabIndex="-1" role="dialog" aria-labelledby="contactModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {contactDetails.name}
              </h5>
              <p>{contactDetails.isActive}</p>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
               <p><i className="material-icons">child_care</i><b>Age:</b>  <br/> <span className="contact__details">{contactDetails.age}</span></p>
               <p><i className="material-icons">visibility</i><b>Eye Colour:</b>  <br/> <span className="contact__details">{contactDetails.eyeColor}</span></p>
               <p><i className="material-icons">accessibility</i><b>Gender: </b>  <br/><span className="contact__details">{contactDetails.gender}</span></p>
               <p><i className="material-icons">business</i><b>Company: </b>  <br/><span className="contact__details">{contactDetails.company}</span></p>
               <p><i className="material-icons">email</i><b>Email: </b>  <br/><span className="contact__details">{contactDetails.email}</span></p>
               <p><i className="material-icons">phone</i><b>Phone:</b>  <br/> <span className="contact__details">{contactDetails.phone}</span></p>
               <p><i className="material-icons">assignment</i><b>Address:</b>  <br/> <span className="contact__details">{contactDetails.address}</span></p>
               <p><i className="material-icons">account_box</i><b>About: </b>  <br/><span className="contact__details">{contactDetails.about}</span></p>
               <p><i className="material-icons">date_range</i><b>Registered:</b>  <br/> <span className="contact__details">{contactDetails.registered}</span></p>
               <p><i className="material-icons">person_pin_circle</i><b>LatLong: </b>  <br/><span className="contact__details">{contactDetails.latitude}, {contactDetails.longitude}</span></p>
               <p><i className="material-icons">attach_money</i><b>Balance: </b>  <br/><span className="contact__details">{contactDetails.balance}</span></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default ContactDetailsModal;

import React from "react";

const GoogleMap = props => {
  const { ...coordinates } = props.coordinates; //destructure props to get coordinates

  const lat = coordinates[0];
  const long = coordinates[1];

  return (
    <iframe
      title="Google Map"
      width="100%"
      height="450"
      frameBorder="0"
      style={{ border: 0 }}
      src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyB8-jssVMJLdXL8ic8Dlq9l1xW1j1eTUTI&center=${lat},${long}&zoom=10`}
      allowFullScreen
    />
  );
};

export default GoogleMap;

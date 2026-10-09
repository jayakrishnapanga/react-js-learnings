import React from "react";

class UserClass extends React.Component {
  render() {
    console.log("i amjust trying to see the this value", this);
    return <h1>Welcome {this.props?.name}</h1>;
  }
}

export default UserClass;

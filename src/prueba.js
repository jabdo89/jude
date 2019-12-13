import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { signOut } from "./Actions/authActions";

class Prueba extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.signOut();
  };
  render() {
    const { JobOffers } = this.props;
    const { profile } = this.props;
    console.log(JobOffers);
    return (
      <div>
        <button onClick={this.handleSubmit}>Log Out</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    JobOffers: state.firestore.ordered.JobOffers,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "JobOffers" }, { collection: "Usuarios" }])
)(Prueba);

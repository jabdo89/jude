import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from './Actions/authActions';
import './LoginScreen.css';
import Target from './img/target.png';
import Logo from './img/jude_logo.png';
import BlueBackground from './img/jude_homescreen_backgroung.png';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    fireError: '',
    rol: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { signIn: localeSignin } = this.props;

    localeSignin(this.state);
  };

  render() {
    const { authError } = this.props;
    const { email, password } = this.state;
    return (
      <div>
        <img src={BlueBackground} className="HomeScreen_Blue_Background" alt="logo" />
        <img src={Target} className="Target_Icon" alt="logo" />
        <div className="Connecting_Word">Connecting Students With Companies</div>
        <div className="Welcome_Word">WELCOME BACK!</div>
        <div className="Enter_Word">Enter your Email and Password to continue</div>
        <img src={Logo} className="Jude_Logo" alt="logo" />
        <img src={Logo} className="Jude_Logo2" alt="logo" />
        <div className="UDE_Word">UDE</div>
        <form>
          <input
            type="text"
            className="usernameBox"
            placeholder="Enter Email Here "
            value={email}
            onChange={this.handleChange}
            name="email"
          />
          <input
            type="password"
            className="passwordBox"
            placeholder="Enter Password "
            value={password}
            onChange={this.handleChange}
            name="password"
          />
          <div className="Sign_In_Word">SIGN IN</div>
          <div className="TO_ACCESS_Word">TO ACCESS THE PORTAL</div>
          <button type="button" className="Login_btn-1" onClick={this.handleSubmit}>
            Login
          </button>
        </form>
        <div className="Auth_Error_Word">{authError}</div>
      </div>
    );
  }
}

LoginScreen.defaultProps = {
  authError: false
};

LoginScreen.propTypes = {
  signIn: PropTypes.func.isRequired,
  authError: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: newUser => dispatch(signIn(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

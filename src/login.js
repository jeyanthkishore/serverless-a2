//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
import "./login.css";
import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
} from "mdbreact";
import axios from "axios";
import validator from "validator";
import Swal from 'sweetalert2'

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }

  async handleClick() {
    if (!validator.isEmail(this.state.email)) {
      Swal.fire("Please Enter a Valid Email");
    } else if (this.state.password.length <= 8) {
      Swal.fire("Please Enter 8 Digit Passowrd");
    } else {
      const login = {
        password: this.state.password,
        email: this.state.email,
      };
      await axios
        .post("http://localhost:8080/login", login)
        .then((response) => {
          if (response.data.message === "user") {
            Swal.fire("Invalid Username or Password :-(");
          } else {
            console.log("Logged IN");
            localStorage.setItem("access_token", response.data.token);
            console.log(localStorage);
            this.props.history.push("/homepage");
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.message);
          Swal.fire("Login Failure, Try again after sometime");
        });
    }
  }
  handleChange(event) {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <div id="login">
        <MDBContainer className="login-container">
          <MDBRow className="justify-content-center">
            <MDBCard>
              <MDBCardHeader>
                <h3
                  className="h3 text-center font-weight-bold"
                >
                  Sign in
                </h3>
              </MDBCardHeader>
              <MDBCardBody>
                <form>
                  <div className="">
                    <MDBInput
                      label="Email"
                      icon="envelope"
                      group
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                    ></MDBInput>
                    <MDBInput
                      label="Password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                    ></MDBInput>
                    <div className="text-center new-button">
                      <MDBBtn onClick={this.handleClick}>Login</MDBBtn>
                    </div>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Login;

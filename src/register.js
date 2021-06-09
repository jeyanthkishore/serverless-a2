//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
import { React } from "react";
import { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
} from "mdbreact";
import validator from "validator";
import "./register.css";
import axios from "axios";
import Swal from 'sweetalert2'

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: "",
      password: "",
      name: "",
      topic:"",
    };
  }

  handleChange(event) {
    console.log(event.target.name)
    if (event.target.name === 'topic') {
      this.setState({
        [event.target.name]: event.target.options[event.target.selectedIndex].value,
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
    console.log(this.state)
  }

  async handleClick(event) {
    event.preventDefault();
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.name === "" 
    ) {
      Swal.fire("Please Fill All The Required Details");
      return;
    }

    if (this.state.password.length < 8) {
      Swal.fire("Password Should Be More Than 8 Digits");
      return;
    }

    if (this.state.password.length > 16) {
      Swal.fire("Password Should Be Less Than 16 Digits");
      return;
    }
    if (!validator.isEmail(this.state.email)) {
      Swal.fire("Please Enter a Valid Email ID");
      return;
    }

    const register = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
    };
    console.log("Check")
    await axios
      .post("http:localhost:5010/register", register)
      .then((response) => {
        Swal.fire("Registration Successfull");
        this.props.history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
        Swal.fire("Email Id already Exist! Please enter new email");
      });
  }
  render() {
    return (
      <div id="register">
        <MDBContainer className="register-container">
          <MDBRow className="justify-content-center">
            <MDBCol md="6">
              <MDBCard>
                <MDBCardHeader>
                  <p
                    className="h3 text-center font-weight-bold"
                  >
                    Registration Page
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <form>
                    <div>
                      <MDBInput
                        label="Full Name*"
                        group
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                      ></MDBInput>
                      <MDBInput
                        label="Email ID*"
                        group
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                      ></MDBInput>
                      <MDBInput
                        label="Password*"
                        group
                        type="password"
                        onChange={this.handleChange}
                        name="password"
                      ></MDBInput>
                      <label id="topic_label">Topic    : </label>
                      <select name="topic" id="topic" onChange={this.handleChange} style={{ position: 'absolute', left: '6rem' }}>
                          <option  defaultValue="serverless">ServerLess Computing</option>
                          <option value="cloud">Cloud Computing</option>
                          <option  value="privacy">Privacy and IT</option>
                        </select>
                      <div className="text-center new-button">
                        <MDBBtn onClick={this.handleClick}>Register</MDBBtn>
                      </div>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Register;

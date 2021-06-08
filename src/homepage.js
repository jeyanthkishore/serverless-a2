//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
import { React } from "react";
import { Component } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";
import "./homepage.css";

class Register extends Component {
  constructor(props) {
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      users: [],
      decode:decoded,
    };
    }
    
   async componentDidMount() {
        await axios
      .post("http://localhost:8081/online")
      .then((response) => {
          this.setState({
              users: response.data.list,
          })
        this.state.users.forEach(element => {
            if (element.email !== this.state.decode.decoded.email) {
                var display = document.getElementById("user");
                var user = document.createElement("div");
                user.innerHTML = element.email;
                display.appendChild(user);
            }
        });
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
        Swal.fire("Error in fetching online details");
      });
    }

  handleClick(event) {
      event.preventDefault();
      const data = {
      email: this.state.decode.decoded.email,
    };
     axios
      .post("http://localhost:8081/logout", data)
      .then((response) => {
          Swal.fire("Logout Successfull").then(response =>{
              localStorage.setItem('access_token', '');
              this.props.history.push("/login");
          });
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
        Swal.fire("Failure while logging out! Try later");
      });
  }
  render() {
    return (
    <div class="homepage">
      <div id="display_name"><h1>Welcome {this.state.decode.decoded.name}</h1></div>
      <h2 id="user" class="center">Other online users:</h2>
      <button id="logout"onClick={this.handleClick}>Logout</button>
    </div>
    
    );
  }
}

export default Register;

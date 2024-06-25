import React from "react";
import { Link } from "react-router-dom";
import { connexion } from "./authRequest";
// import { Navigate, useNavigate } from "react-router-dom";
// import {Redirection} from "../../router"

class ConnectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMsg: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.navigate = redirect();
  }

  displayErroMsg(errormsg) {
    this.setState({ errorMsg: errormsg });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    const response = await connexion(this.state);
    console.log(response);
    if (response.data.error !== undefined) {
      this.displayErroMsg(response.error);
    } else {
      // Redirection("/");
    }
  }

  handResponse() {}

  render() {
    return (
      <div className="Register">
        <section className="flex justify-center items-center h-screen bg-gray-100">
          <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
            <div className="mb-4">
              <p className="text-gray-600">Deja un compte ?</p>
              <h2 className="text-xl font-bold">Connecter vous</h2>
              {this.state.errorMsg && (
                <p className="error text-red-600">{this.state.errorMsg}</p>
              )}
            </div>
            <div>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                onClick={this.handleSubmit}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              >
                Connexion
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  for="comments"
                  className="ml-2 text-sm font-normal text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  to="/register"
                >
                  Pas encore inscrit ?
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ConnectionForm;

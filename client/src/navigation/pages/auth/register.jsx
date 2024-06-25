import React from "react";
import { Link } from "react-router-dom";
import validator from "./validatorInput";
import "./index.css";
import {registerRequest} from './authRequest'
import { Navigate } from "react-router-dom";





class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      nom: '',
      prenom: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMsg: '',
      shouldNavigate: false
    }

    
    this.setState({ shouldNavigate: true });

    
    this.validators = validator;
    this.displayValidationErrors = this.displayValidationErrors.bind(this);
    this.updateValidators = this.updateValidators.bind(this);
    this.resetValidators = this.resetValidators.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);

  }



  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
    this.updateValidators(e.target.name, e.target.value);
  }

  async handleSubmit(e) {
    // const response = await registerRequest(this.state);
    // if (response.error !== undefined) {
    //   this.displayErrorMsg(response.error)
    // } else {
      // const history  = useHistory();
      // console.log("history : ", history);
      // history.push("/connexion");
      this.handleNavigation(); 
    // }
  }

  handleNavigation() {
    // const navigate = this.props.navigate; // get navigate from props
    this.setState({ shouldNavigate: true });
  }

  displayErrorMsg(errorMsg) {
    this.setState({errorMsg: errorMsg});
  }

  updateValidators(fieldName, value) {
    return
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    if (fieldName === "confirmPassword") {
      this.updateValidators('password', this.state.password);
    }
    this.validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (value !== '') {
          if (!rule.test.test(value)) {
            this.validators[fieldName].errors.push(rule.message);
            this.validators[fieldName].valid = false;
          }
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        } 
      }
      
        // console.log(rule.confirm)
        if (rule.confirm !== undefined) {
          if (fieldName === 'password') {
          if (!rule.confirm(value, this.validators['confirmPassword'].state)) {
            this.validators[fieldName].errors.push(rule.message);
            this.validators[fieldName].valid = false;
          }
        }
      }
    });
  }


  resetValidators() {
    Object.keys(this.validators).forEach((fieldName) => {
      this.validators[fieldName].errors = [];
      this.validators[fieldName].state = '';
      this.validators[fieldName].valid = false;
    });
  }

  displayValidationErrors(fieldName, errorMsg = '') {
    return;
    // console.log(fieldName)
    const validator = this.validators[fieldName];
    const result = '';
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return <span className="error text-red-600" key={index}>* {info}<br></br></span>;
      });

      return (
        <div className="col s12 row">
          {errors}
        </div>
      );
    }
    return result;
  }

  isFormValid() {
    return true
    let status = true;
    Object.keys(this.validators).forEach((field) => {
      if (!this.validators[field].valid) {
        status = false;
      }
    });
    return status;
  }




  render() {
    return (
      <div className="Register">
        <section className="flex justify-center items-center h-screen bg-gray-100">
          <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
            <div className="mb-4">
              <p className="text-gray-600">Crée un compte</p>
              <h2 className="text-xl font-bold">Rejoigné notre communauté</h2>
              {this.state.errorMsg && <p className="error text-red-600" >{this.state.errorMsg}</p>}
            </div>
            <div>
              <input name="nom" value={this.state.nom} onChange={this.handleChange} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Nom" />
              { this.displayValidationErrors('nom') }
            </div>
            <div>
              <input name="prenom" value={this.state.prenom} onChange={this.handleChange} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Prenom" />
              { this.displayValidationErrors('prenom') }
            </div>
            <div>
              <input name="email" value={this.state.email} onChange={this.handleChange} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Email" />
              { this.displayValidationErrors('email') }
            </div>
            <div>
              <input name="password" value={this.state.password} onChange={this.handleChange} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password" />
              { this.displayValidationErrors('password') }
            </div>
            <div>
              <input name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password confirmation" />
              { this.displayValidationErrors('verifPassword') }
            </div>
            <div>
              <button  disabled={this.isFormValid() ? '' : 'disabled'} onClick={this.handleSubmit} className={`w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200 ${this.isFormValid() ? '' : 'disabled'}`}>s'inscrire</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Link className="text-sm text-blue-600 hover:underline" to="/connexion">Deja inscrit ??</Link>
              </div>
            </div>
          </div>
        </section>
        {this.state.shouldNavigate && <div><Navigate to="/connexion" replace={true} /></div>}
      </div>

    );
  }
}

export default RegisterForm;

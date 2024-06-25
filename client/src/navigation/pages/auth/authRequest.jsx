import axios from "axios";


const registerRequest = async (data) => {
	const register = {
		name: data.nom,
		secondeName: data.prenom,
		email: data.email,
		password: data.password,
		password_confirmation: data.confirmPassword
	}
	const sendRequest = JSON.stringify(register)
	try {
		const request = await axios.post(`http://localhost:8000/api/auth/register`,  sendRequest, {headers: {'Content-Type': 'application/json'}});
		const response = request;
		return response;
	} catch (error) {
		for (let elt in register) {
			for (let eltmsg in error.response.data.message) {
				if (elt === eltmsg) {
					return { error : error.response.data.message[eltmsg][0] }; 
				}
			}
		}
	}
} 
const connexion = async (data) => {
	const user = {
		   email: data.email,
		   password: data.password,
	   }
	   const sendRequest = JSON.stringify(user)
	   try {
		   const request = await axios.post(`http://localhost:8000/api/auth/login`,  sendRequest, {headers: {'Content-Type': 'application/json'}});
		   const response = request;
		   return response;
	   } catch (error) {
			return error.response;
		}
}

export {registerRequest, connexion};
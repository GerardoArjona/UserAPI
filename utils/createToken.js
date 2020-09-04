
const Login  =  require('jsonwebtoken');

Date.prototype.addDays = function(days){
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

const createToken = ({email,name,username, _id}) => {

	const exp = new Date().addDays(1).getTime(); 

	const payload = {
		_id,
		username,
		email,
		name,
		exp
	}

	console.log(payload)

	return Login.sign(payload,process.env.SECRET_KEY);
}

module.exports ={
	createToken
}
const User = require('../models/users');
const bcrypt = require('bcrypt');

const authenticate =  ({email,password}) => {
	return new Promise((resolve,reject) => {
		User.findOne({email}).then((user) =>{
			if(!user)reject(new Error("User does not exist"));
			bcrypt.compare(password,user.password,(err,isValid) =>{
					console.log(isValid);
					if(!isValid) reject(new Error("Password not match"))
					resolve(user)
			})
		}).catch((err) => {
			reject(err)
		})

	});

}

module.exports  = {
	authenticate
}


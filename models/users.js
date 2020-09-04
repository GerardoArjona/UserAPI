const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');

const Schema = mongoose.Schema

const  SALT_FACTOR =  10;

const UserSchema =  new Schema({

	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		unique:true,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	username:{
		type:String,
		required:true,
		unique:true
	}

},{timestamps:true,collection:"users"});



function encryptPassword(next){
	let user = this;

	//console.log(user.password)

	if(user._update !== undefined && !user._update.password){return next()}

	bcrypt.genSalt(SALT_FACTOR,function(err,salt){
		if(err) return next(err);

		if(user.password !== undefined){
			console.log("new hash password")
			bcrypt.hash(user.password,salt,function(err,hash){
				if(err) return next(err);
				user.password =  hash
				next();
			});
		}else{
			console.log("update hash password")
			bcrypt.hash(user._update.password,salt,function(err,hash){
			if(err) return next(err);
			user._update.password =  hash
			next();
		});
		}


	});

}



UserSchema.pre('save', encryptPassword);
UserSchema.pre('findOneAndUpdate', encryptPassword);


module.exports = mongoose.model('users',UserSchema);


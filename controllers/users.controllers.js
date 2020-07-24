const User = require('../models/users.js');
const { authenticate } = require('../utils/authenticate')
const { createToken } = require('../utils/createToken')

const signUp = async (req, res) => {
    console.log(req.body)
	const user = await User.create(req.body).catch(e => {
        console.log(e)
       res.status(400).json(e) 
    })
	if (!user) res.status(400).json(e)
	res.status(201).json(user)
}

const listUsers = async (req, res) => {
	const users = await User.find({}).select('-password')
	res.status(200).json(users)
}

const findOne = async (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Company not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
}

const signin = async (req, res) => {
	authenticate(req.body).then((user) => {
		if (!user) res.send(404).json({ message: "User not found" });
		const token = createToken(user);
		res.status(200).json({ token });
    }).catch(e => {
        console.log(e)
        res.status(400).json({e})
}); 	
}

const update = async (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.userId, (req.body), {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        console.log(err)
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating company with id " + req.params.userId
        });
    });
};

const deleteUser = async (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};


	

module.exports = {
	signUp,
    listUsers,
    findOne,
	signin, 
    update,
    deleteUser
}
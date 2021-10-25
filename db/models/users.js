const mongoose = require('mongoose');

const  CreateusersSchema = mongoose.Schema({

    name:{
        type:String
    },
    roomName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    cpassword:{
        type:String
    },
    roomid:{
        type:String
    }

});

const Createusers = mongoose.model('user',CreateusersSchema);

module.exports = Createusers;
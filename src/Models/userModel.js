
const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    deletedAt: {
        type: Date,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true },
)

module.exports=mongoose.model("user_data",userModel)
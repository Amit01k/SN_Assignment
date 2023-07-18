
const userModel = require('../Models/userModel')
const mongoose = require("mongoose")

const isrequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0
}

//isValidobjectId function, checking input id is valiad or not according to mongoDB id.
const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}
//isValid will check input field,input field undefined, null, string and input length=0 or not
const isValid = (value) => {
    if (typeof value === "undefined" || value === null)
        return false
    if (typeof value === "string" && value.trim().length === 0)
        return false
    else
        return true
}
//createUser function for create new user
const createUser = async (req, res) => {
    try {
        //validation for checking input body ,if body is empty it will send error.
        if (!isrequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Invalid parameters, please provide user details" })
        }
        //distructuring the input fields
        const {name,email, password } = req.body
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "please provide user_name" })

        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "please provide email" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "email is not valid" })
        }

        let isDuplicateEmail = await userModel.findOne({ email });
        if (isDuplicateEmail) {
            return res.status(404).send({ status: false, message: "Email is already in use" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "please provide password" })
        }
        if (!(password.length >= 8 && password.length <= 15)) return res.status(400).send({ status: false, message: "password is not valid enter password 8 to 15 character" })
        create = await userModel.create(req.body)
        return res.send({status:true, message: "data created successfully", data: create })
    }
    catch (err) {
        return res.send(err)

    }
}


//getuserbyId function for get user data by userId
const getuserbyId = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {

            return res.status(400).send({ status: false, message: "please enter userId to find the user" })
        }

        if (!isValidobjectId(userId)) {
            return res.status(400).send({ status: false, message: "please enter valid userId" })
        }
        data = await userModel.findOne({ _id: userId, isDeleted: false })
        if (!data) {
            return res.status(404).send({ status: false, message: "user not found please enter valid user id" })
        }
        return res.send({status:true,message:"user data",data})
    }
    catch (err) {
        return res.status(404).send({status:false,message:err.message})
    }
}

//getall function , by this function we can see all the users data
const getall = async (req, res) => {
    data = await userModel.find({ isDeleted: false });
    return res.status(200).send({status:true,message:"users list",data:data})

}

// updateUSer function, by this function we can update theuser data
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {

            return res.status(400).send({ status: false, message: "please enter userId to find the user" })
        }

        if (!isValidobjectId(userId)) {
            return res.status(400).send({ status: false, message: "please enter valid userId" })
        }
        const body = req.body
        const update = await userModel.findByIdAndUpdate({ _id: userId, isDelete: false }, body, { new: true })
        return res.status(200).send({ status:true,message: "user data updated successfully", data: update })
    }
    catch (err) {
        return res.status(404).send({status:false,message:err.message})
    }
}

//deletebyId function , by this function we can delete the user
const deletebyid = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).send({ status: false, message: "please enter userId to find the user" })
        }
        if (!isValidobjectId(userId)) {
            return res.status(400).send({ status: false, message: "please enter valid userId" })
        }
        data = await userModel.findOneAndUpdate({ _id: req.params.id, isDeleted: false },
             { isDeleted: true, deletedAt: Date.now() }, { new: true });
        if (!data) {
            return res.status(404).send({ status: false, message: "user not found please enter valid user id" })
        }
        return res.status(200).send({ status: true, message: "data deleted successfully" })
    } catch (err) {
        return res.status(404).send({status:false,message:err.message})
    }
}


module.exports.getall = getall;
module.exports.getuserbyId = getuserbyId
module.exports.createUser = createUser
module.exports.deletebyid = deletebyid
module.exports.updateUser = updateUser

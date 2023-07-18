const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
//create user api
router.post('/api/user',userController.createUser)
//get user by id
router.get('/api/user/:id',userController.getuserbyId)
//get all user data
router.get('/api/user',userController.getall)
//delete user data
router.delete("/api/user/:id",userController.deletebyid)
//update the user data
router.put('/api/user/:id',userController.updateUser)

module.exports=router
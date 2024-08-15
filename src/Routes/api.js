const express = require('express')
const router = express.Router()
const demoCon = require('../controller/demoCon.js')
const serviceController = require('../controller/admin/ServiceController.js')
const CareerController = require('../controller/admin/CareerController.js')
const UserController = require('../controller/client/UserController.js')

// Admin Api
// Service
router.post('/createService', serviceController.CreateService)
router.get('/getAllService', serviceController.getAllService)
router.delete('/deleteService/:serviceId', serviceController.deleteService)
router.get('/getServiceById/:serviceId', serviceController.getServiceById)
// Career
router.get('/getAllCareer', CareerController.getAllCareer)



// Client Api 

// all User Api start 
router.post('/CreateUser', UserController.addUsers)
router.get('/user/:email', UserController.getSingleUser)
router.get('/Allusers', UserController.getAllUsers)
router.put('/UpdateUser/:id', UserController.updateUser)
router.delete('/DeleteUser/:id', UserController.deleteUser)
// all User Api end

// User Api

module.exports = router
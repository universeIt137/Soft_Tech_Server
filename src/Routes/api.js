const express = require('express')
const router = express.Router()
const demoCon = require('../controller/demoCon.js')
const serviceController = require('../controller/admin/ServiceController.js')
const UserController = require('../controller/client/UserController.js')

// Admin Api
router.post('/createService', serviceController.CreateService)
router.get('/getAllService', serviceController.getAllService)
router.delete('/deleteService/:serviceId', serviceController.deleteService)
router.get('/getServiceById/:serviceId', serviceController.getServiceById)


// Client Api 

// all User Api start 
router.post('/users', UserController.addUsers)
router.get('/users/:email', UserController.getSingleUser)
router.get('/users', UserController.getAllUsers)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)
// all User Api end

// User Api

module.exports = router
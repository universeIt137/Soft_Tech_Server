const express = require('express')
const router = express.Router()
const serviceController = require('../controller/admin/ServiceController.js')
const CareerController = require('../controller/admin/CareerController.js')
const UserController = require('../controller/client/UserController.js')
const ApplicationController = require('../controller/client/ApplicationController.js')
const AdminController = require('../controller/admin/adminAuth.js')
const AuthMiddleware = require('../middleware/Authmiddilware.js')

// Admin Api
router.post('/CreateAdmin', AdminController.CreateAdmin)
router.post('/adminLogin', AdminController.Adminlogin)
router.get('/getAdminProfile', AuthMiddleware('admin'), AdminController.getAdminProfile)
//  service
router.get('/getAllService', serviceController.getAllService)
router.post('/createService', serviceController.CreateService)
router.post('/updateService/:serviceID', serviceController.updateService)
router.delete('/deleteService/:serviceId', serviceController.deleteService)
router.get('/getServiceById/:serviceId', serviceController.getServiceById)
// career
router.get('/getAllCareer', CareerController.getAllCareer)
router.post('/createCareer',AuthMiddleware('admin'), CareerController.CreateCareer)
router.post('/updateCareer/:careerID', AuthMiddleware('admin'), CareerController.updateCareer)
router.delete('/deleteCareer/:CareerID', AuthMiddleware('admin'), CareerController.deleteCareer)
router.get('/getSingleCareer/:CareerID', CareerController.getSingleCareer)

// user 
router.delete('/DeleteUser/:id', UserController.deleteUser)
router.get('/Allusers', AuthMiddleware('user') ,UserController.getAllUsers)
// application
router.get('/getApplication',AuthMiddleware('admin'), ApplicationController.getApplication)
router.get('/career/applications/:careerId' , AuthMiddleware('admin'), ApplicationController.getApplicationsByCareer);
router.delete('/deleteApplications/:id' , AuthMiddleware('admin'), ApplicationController.deleteApplication);






// ----client api

// user Authorization
router.post('/CreateUser', UserController.CreateUser)
router.post('/EmailVerify/:email/:otp', UserController.EmailVerify)
router.post('/login', UserController.login)
router.get('/getProfile', AuthMiddleware('user'), UserController.getProfile)
router.put('/UpdateUser/:id', UserController.updateUser)
router.delete('/DeleteUser/:id', UserController.deleteUser)
// apply job
router.post('/applyJob/:careerId',  ApplicationController.applyJob)
router.put('/updateApplication/:id',AuthMiddleware('user'), ApplicationController.updateApplication)
router.get('/getApplicationByUser' , AuthMiddleware('user'), ApplicationController.getApplicationByUser);








module.exports = router
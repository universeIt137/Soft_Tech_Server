const express = require('express')
const router= express.Router()
const demoCon = require('../controller/demoCon.js')
const serviceController = require('../controller/admin/ServiceController.js')


// Admin Api
router.post('/createService', serviceController.CreateService)
router.get('/getAllService', serviceController.getAllService)
router.delete('/deleteService/:serviceId', serviceController.deleteService)



// User Api

module.exports = router
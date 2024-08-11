const express = require('express')
const router= express.Router()
const demoCon = require('../controller/demoCon.js')

router.get('/', demoCon.demo)

module.exports = router
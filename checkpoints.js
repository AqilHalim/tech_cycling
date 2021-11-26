const express = require('express')
const router = express.Router()
const authenticate = require("./authenticate")

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.use(authenticate)

const cpControl = require('./controller/cpControl')

router.post('/cyclists/:id([A-Z0-9]+)/checkpoints', cpControl.postOne)    //menambahkan data baru
router.get('/cyclists/:id([A-Z0-9]+)/checkpoints', cpControl.getOne)      //menampilkan data sesuai id
router.get('/checkpoints', cpControl.getAll)                              //menampilkan data sesuai id
router.get('/winner', cpControl.getWinner)                                //menampilkan seluruh data

module.exports = router

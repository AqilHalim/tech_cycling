const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload');
const authenticate = require('./authenticate');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const cyControl = require('./controller/cyControl')
router.get('/:id([A-Z0-9]+)/image', cyControl.getImage)          //menampilkan berdasarkan id

router.get('/', authenticate, cyControl.getAll)                   //menampilkan semua data
router.get('/:id([A-Z0-9]+)', authenticate, cyControl.getOne)          //menampilkan berdasarkan id
router.get('/checkpoints', authenticate, cyControl.getWithCheckpoints)          //menampilkan berdasarkan id

router.put('/:id([A-Z0-9]+)/verify', authenticate, cyControl.putOne)   //mengubah status 


router.delete('/:id([A-Z0-9]+)', authenticate, cyControl.delOne)       //menghapus data berdasarkan id
    
router.use(fileUpload());
router.post('/', cyControl.postOne)                 //menambahkan data


module.exports = router

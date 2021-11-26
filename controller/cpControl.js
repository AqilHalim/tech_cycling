const sequelize = require('sequelize')
const connection = require('../connection')
const CP = require('../models/checkpoints')(connection)
const Cyclist = require('../models/cyclist')(connection)
const jwt = require("jsonwebtoken")

Cyclist.hasMany(CP, {
    foreignKey: 'reg_code'
})
CP.belongsTo(Cyclist, {
    foreignKey: 'reg_code'
})

const secret = process.env.JWT_SECRET;

//menambahkan data baru
exports.postOne = async function (req, res) {
    if (!req.body.checkpoint) {
        res.status(400).json({
            message: 'missing information',
            status: false,
        })
        return
    }

    try {
        var decodedCp = jwt.verify(req.body.checkpoint, secret)
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'invalid checkpoint'
        });
        return
    }

    try {
        const [cp, created] = await CP.findOrCreate({
            where: {
                reg_code: req.params.id,
                location: decodedCp.location
            },
            defaults: {
                points: 10,
                timestamp: req.body.timestamp
            }
        })

        if (!created) {
            res.status(200).json({
                message: 'duplicate checkpoint',
                status: false
            })
            return
        }

        res.status(200).json({
            message: 'success',
            status: true,
            location: cp.location,
            timestamp: cp.timestamp
        })

    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            debug: `cp: ${decodedCp}`,
            status: false
        });
    }
}

//menampilkan data sesuai id
exports.getOne = async function (req, res) {
    try {
        const cp = await CP.findAll({
            where: {
                reg_code: req.params.id
            },
            attributes: [
                'reg_code',
                'location',
                ['createdAt', 'waktu']
            ]
        })
        const total = cp.length
        res.status(200).json({
            reg_code: req.params.id,
            message: 'success',
            status: true,
            total: total,
            checkpoints: cp
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        });
    }
}

//menampilkan pemenang
// exports.getAll = async function (req, res) {
//     try {
//         const cp = await CP.count({
//             group: ['reg_code'],
//         })
//         res.status(200).json({
//             message: 'Akun Berhasil Ditampilkan',
//             status: 'success',
//             data: cp
//         })
//     } catch (err) {
//         res.status(500).json({
//             message: 'Terdapat Error: ' + err.message,
//             status: 'failed'
//         });
//     }
// }

exports.getAll = async function (req, res) {
    try {
        var cyclist = await Cyclist.count({
            include: CP,
            group: ['cyclist.reg_code', 'cyclist.email', 'checkpoints.reg_code'],
        })

        res.status(200).json({
            message: 'Akun Berhasil Ditampilkan',
            status: true,
            data: cyclist
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        });
    }
}

exports.getWinner = async function (req, res) {
    try {
        var cyclist = await CP.count({
            group: ['reg_code', 'cyclist.nama_lengkap'],
            include: Cyclist,
            having: {
                count: 5
            }
        })

        res.status(200).json({
            message: 'success',
            status: true,
            total: cyclist.length,
            data: cyclist
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        });
    }
}
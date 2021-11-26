const connection = require('../connection')
const RegCode = require('../models/regcodes')(connection)
const Cyclist = require('../models/cyclist')(connection);

//menampilkan semua data
const verifyCode = async function (req, res) {
    if (!req.body.reg_code) {
        res.status(400).json({
            message: 'empty code',
            status: false,
        })
        return;
    }

    var regCode = (req.body.reg_code.split("/").length > 1) ? req.body.reg_code.split("/").reverse()[0] : req.body.reg_code

    try {
        const verifiedCode = await RegCode.count({
            where: {
                reg_code: regCode
            }
        })

        if (!verifiedCode) {
            res.status(200).json({
                message: 'invalid ' + regCode,
                status: false
            })
            return
        }

        const usedCode = await Cyclist.count({
            where: {
                reg_code: regCode
            }
        })

        if (verifiedCode) {
            res.status(200).json({
                message: 'verified',
                status: true,
                code_used: usedCode,
                reg_code: regCode
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        });
    }
}

module.exports = verifyCode
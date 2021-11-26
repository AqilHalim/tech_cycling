const connection = require('../connection')
const { Op } = require("sequelize");
const Cyclist = require('../models/cyclist')(connection)
const CheckP = require('../models/checkpoints')(connection)
const RegCode = require('../models/regcodes')(connection)
const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET;

Cyclist.hasMany(CheckP, {
    foreignKey: 'reg_code'
})
CheckP.belongsTo(Cyclist, {
    foreignKey: 'reg_code'
})
Cyclist.hasOne(RegCode, {
    foreignKey: ''
})
RegCode.belongsTo(Cyclist, {
    foreignKey: ''
})

//menampilkan semua data
async function getAllCyclists(req, res, query) {
    const limit = 10;
    var queryCount = {
        where: {
            is_active: {
                [Op.gt]: 0
            }
        }
    };

    if (req.body.jwtRole !== "panitia") {
        res.status(403).json({
            status: false
        })
    }

    if (req.query.view === "all") {
        query.where.is_active = {
            [Op.gt]: -1
        }
        query.attributes.exclude = 'updatedAt'
        queryCount.where.is_active = {
            [Op.gt]: -1
        }
    }

    if (req.query.page) {
        query.limit = limit
        query.offset = (+req.query.page - 1) * limit
    }
    try {
        var cyclists = await Cyclist.findAll(query)
        var totalCount = await Cyclist.count(queryCount)

    } catch (err) {
        res.status(500).json({
            message: 'Error: ' + err.message,
            status: false
        });
        return;
    }

    var resData = {
        message: (cyclists.length) ? 'success' : 'no record',
        status: true,
        total_displayed: cyclists.length,
        cyclists: cyclists
    }

    if (req.query.page) resData.total_page = Math.ceil(totalCount / limit)
    res.status(200).json(resData)
}


exports.getAll = function (req, res) {

    let query = {
        attributes: { exclude: ['is_active', 'updatedAt'] },
        where: {
            is_active: {
                [Op.gt]: 0
            }
        }
    }

    getAllCyclists(req, res, query)

    // res.status(202).json({
    //     status: true
    // })
}

exports.getWithCheckpoints = function (req, res) {
    let query = {
        attributes: { exclude: ['is_active', 'updatedAt'] },
        include: CheckP,
        where: {
            is_active: {
                [Op.gt]: 0
            }
        }
    }

    getAllCyclists(req, res, query)

    // res.status(202).json({
    //     status: true
    // })
}


//menampilkan berdasarkan id
exports.getOne = async function (req, res) {
    try {
        const cyclist = await Cyclist.findOne({
            where: {
                reg_code: req.params.id
            },
            attributes: { exclude: ['is_active', 'updatedAt'] }
        })
        if (!cyclist) {
            res.status(200).json({
                message: 'no record',
                status: false,
            })
            return;
        }

        res.status(200).json({
            message: 'success',
            status: true,
            cyclist: cyclist
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        })
    }
}

exports.getImage = async function (req, res) {
    if (!req.query.token) {
        res.status(401).json({
            status: false,
        });
        return;
    }

    const token = req.query.token;
    try {
        var decoded = jwt.verify(token, secret)
        if (req.params.id !== decoded.RegCode) {
            res.status(403).end()
            return
        }
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error.message
        });
        return
    }
    try {
        const cyclist = await Cyclist.findOne({
            where: {
                reg_code: req.params.id
            },
            attributes: ['reg_code', 'is_picture']
        })
        if (!cyclist) {
            res.status(400).end();
            return
        }

        res.set('Content-Type', 'image/png')
        if (cyclist.is_picture) {
            return res.sendFile(cyclist.reg_code + ".jpg", { root: './images' })
        }

        return res.sendFile("default.png", { root: './images' })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        })
    }
}


//menambahkan data
exports.postOne = async function (req, res) {
    var imagePath;
    var image;
    var regCode;

    if (!req.body.reg_code) {
        res.status(400).json({
            message: 'missing information',
            status: false,
        })
        return
    }

    if (req.body.reg_code.split("/").length > 1)
        regCode = req.body.reg_code.split("/").reverse()[0];
    else
        regCode = req.body.reg_code

    try {
        const codeExist = await RegCode.count({
            where: {
                reg_code: regCode
            }
        })

        if (!codeExist) {
            res.status(200).json({
                message: 'invalid code',
                status: false
            });
            return;
        }

        const isCyclistExist = await Cyclist.count({
            where: {
                reg_code: regCode
            }
        })

        if (isCyclistExist) {
            res.status(200).json({
                message: 'duplicate code',
                status: false
            });
            return;
        }

        const newCyclist = await Cyclist.create({
            reg_code: regCode,
            nama_lengkap: req.body.nama_lengkap,
            email: req.body.email,
            hp: req.body.hp,
            perusahaan: req.body.perusahaan,
            jenis_sepeda: req.body.jenis_sepeda,
            is_active: 0,
            is_picture: 0
        });
        cyclist = newCyclist.toJSON()
        delete cyclist["is_active"]
        delete cyclist["is_picture"]
        delete cyclist["updatedAt"]

        if (req.files && Object.keys(req.files).length !== 0) {
            imagePath = __dirname + "/../images/" + regCode + ".jpg";
            image = req.files.image;
            let err = await image.mv(imagePath);
            if (err) return res.status(500).send(err);

            newCyclist.is_picture = 1;
            await newCyclist.save();
        }

        res.status(200).json({
            status: true,
            message: "success",
            cyclist: cyclist
        })

    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        })
    }
}

//mengubah status
exports.putOne = async function (req, res) {
    if (req.body.jwtRole !== "panitia") {
        res.status(403).json({
            status: false
        })
    }
    try {
        const cyclist = await Cyclist.findOne({
            where: {
                reg_code: req.params.id
            }
        })

        if (!cyclist) {
            res.status(200).json({
                message: 'no record',
                status: false
            })
            return
        }

        if (cyclist.is_active) {
            res.status(200).json({
                message: 'been verified',
                status: true,
            })
            return
        }

        cyclist.is_active = 1
        await cyclist.save()
        res.status(200).json({
            message: 'verified',
            status: true,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        })
    }
}

//menghapus data berdasarkan id
exports.delOne = async function (req, res) {
    if (req.body.jwtRole !== "panitia") {
        res.status(403).json({
            status: false
        })
    }
    try {
        const numDestroy = await Cyclist.destroy({
            where: {
                reg_code: req.params.id
            }
        })

        if (numDestroy)
            res.status(200).json({ message: 'deleted', status: true })
        else
            res.status(200).json({ message: 'not deleted', status: false })

    } catch (err) {
        res.status(500).json({
            message: 'Terdapat Error: ' + err.message,
            status: false
        })
    }
}
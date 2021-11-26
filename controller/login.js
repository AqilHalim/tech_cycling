const jwt = require("jsonwebtoken")
const connection = require('../connection')
const Cyclist = require('../models/cyclist')(connection)

const secret = process.env.JWT_SECRET;
const adminsecret = process.env.ADMINPASS;

const login = async function (req, res) {
    if (!(req.body.username && req.body.password)) {
        res.status(400).end();
        return
    }

    var regCode = null
    var role = "panitia"

    if (req.body.username.trim().toLowerCase() !== "panitia") {
        try {
            const cyclist = await Cyclist.findOne({
                where: {
                    nama_lengkap: req.body.username.trim().replace(/\s+/g, " "),
                    hp: req.body.password
                }
            })
            if (!cyclist) {
                res.status(401).json({
                    status: false
                });
                return
            }
            regCode = cyclist.reg_code;
            role = "cyclist"
        } catch (error) {
            res.status(500).json({
                message: 'Terdapat Error: ' + error.message,
                status: false
            });
        }
    }
    else if (req.body.password.trim() !== adminsecret) {
        res.status(401).json({
            status: false,
            adminsecret: adminsecret
        });
        return
    }

    let today = Math.floor(Date.now() / 1000);
    let exp = Math.floor(new Date("February 28, 2021 00:00:00").getTime() / 1000);

    let payload = {
        iss: 'Tech Cycling Event',
        iat: today,
        exp: exp,
        aud: '',
        RegCode: regCode,
        Role: role
    }

    const token = jwt.sign(payload, secret);
    res.status(200).json({
        status: true,
        token: token,
        reg_code: regCode,
        role: role
    });
}

module.exports = login
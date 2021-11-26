const { Sequelize } = require('sequelize')

const dbhost = process.env.DB_HOST || "127.0.0.1"
const dbdialect = process.env.DB_SYSTEM || "mysql"
const dbdatabase = process.env.DB_DATABASE || "techcycling"
const dbuser = process.env.DB_USER || ""
const dbpassword = process.env.DB_PASS || ""



const sequelize = new Sequelize(dbdatabase, dbuser, dbpassword, {
    host: dbhost,
    dialect: dbdialect,       /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    logging: false,
    dialectOptions: {
        useUTC: false
    },
    timezone: '+07:00'
});
// const sequelize = new Sequelize('dntgbj3oma3c6', 'ydtsncfzpemfwo', '969494d2ac5151ed2bcdf90990d46c23d2346ebaf38a5351b27ef934559331a9', {
//     host: 'ec2-54-205-248-255.compute-1.amazonaws.com',
//     port: 5432,
//     dialect: 'postgres',       /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
//     logging: false,
//     dialectOptions: {
//         useUTC: false
//     },
//     timezone: '+07:00'
// });

// const CP = require("./models/checkpoints")(sequelize)
// const Cyclist = require("./models/cyclist")(sequelize)
// const RegCode = require("./models/regcodes")(sequelize)

// try {
// sequelize.sync({ force: true })
// } catch (err) {
// console.log(err.message)
// }

module.exports = sequelize;
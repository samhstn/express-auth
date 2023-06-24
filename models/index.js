import Sequelize, { Model, DataTypes } from 'sequelize'
import config from '../config/config.js'

const env = process.env.NODE_ENV || 'development'
const db = {}

let sequelize
if (config[env].use_env_variable) {
  sequelize = new Sequelize(
    process.env[config[env].use_env_variable],
    config[env]
  )
} else {
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    config[env]
  )
}

class Session extends Model {}

Session.init({
  sid: {
    primaryKey: true,
    type: DataTypes.STRING(36)
  },
  expires: DataTypes.DATE,
  data: DataTypes.TEXT
}, { sequelize, modelName: 'Session' })

export {
  Session,
  sequelize,
  Sequelize
}

db.Session = Session
db.Sequelize = Sequelize
db.sequelize = sequelize

export default db

import { sequelize } from './index.js'

;(async () => {
  await sequelize.sync({ logging: false })

  await sequelize.close()
})()

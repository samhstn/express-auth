export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      sid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36)
      },
      expires: Sequelize.DATE,
      data: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions')
  }
}

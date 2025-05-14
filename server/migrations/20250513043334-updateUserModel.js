module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Users", // table name
        "email", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ]);
  },

  async down(queryInterface) {
    return Promise.all([queryInterface.removeColumn("Users", "email")]);
  },
};

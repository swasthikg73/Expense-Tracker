module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        "budgets", // table name
        "user_id", // new field name
        {
          type: Sequelize.INTEGER,
        }
      ),
    ]);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([queryInterface.removeColumn("budgets", "user_id")]);
  },
};

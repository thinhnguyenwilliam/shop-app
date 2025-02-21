'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banner_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
          type: Sequelize.INTEGER,
          //unique: true,         
          allowNull: false, 
          references: {
              model: 'products', // name table in DB(MYSQL workbench) not ClassName
              key: 'id',
          },
      },
      banner_id: {
          type: Sequelize.INTEGER,
          // unique: true,
          allowNull: false,
          references: {
              model: 'banners',
              key: 'id',
          },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,        
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,        
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('banner_details');
  }
};
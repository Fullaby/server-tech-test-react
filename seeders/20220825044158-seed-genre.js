'use strict';
const fs= require('fs');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data= JSON.parse(fs.readFileSync("./db.json",'utf-8')).Genres
     data.forEach((el)=>{
      el.updatedAt=el.createdAt= new Date()
      delete el.id
     })
     await queryInterface.bulkInsert('Genres',data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Genres',null)
  }
};

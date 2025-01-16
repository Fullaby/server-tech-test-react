'use strict';
const fs= require('fs');
const {hashPassword}= require('../helpers/bcryptHelper');
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
   let data= JSON.parse(fs.readFileSync("./db.json",'utf-8')).Users
   data.forEach((el)=>{
    el.updatedAt=el.createdAt= new Date()
    el.password= hashPassword(el.password)
    delete el.id
   })
   await queryInterface.bulkInsert('Users',data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users',null)
  }
};
